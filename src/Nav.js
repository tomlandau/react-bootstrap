import classNames from 'classnames';
import keycode from 'keycode';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import all from 'prop-types-extra/lib/all';
import warning from 'warning';

import bsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';
import createChainedFunction from './utils/createChainedFunction';
import map from '../components/element-children/map';
import toArray from '../components/element-children/to-array';
import find from '../components/element-children/find';

// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?

// TODO: This `bsStyle` is very unlike the others. Should we rename it?

// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.

const propTypes = {
  /**
   * @property {*} activeKey - Marks the NavItem with a matching `eventKey` as active. Has a 
   * higher precedence over `activeHref`.
   */
  activeKey: PropTypes.any,

  /**
   * @property {string} activeHref - Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: PropTypes.string,

  /**
   * @property {bool} stacked - NavItems are be positioned vertically.
   */
  stacked: PropTypes.bool,

  /**
   * @property {bool} - NavItems take the full width of their parent.
   */
  justified: all(
    PropTypes.bool,
    ({ justified, navbar }) => (
      justified && navbar ?
        Error('justified navbar `Nav`s are not supported') : null
    )
  ),

  /**
   * @property {func} onSelect - A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * @property {string} role - ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: PropTypes.string,

  /**
   * @property {bool} navbar - Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: PropTypes.bool,

  /**
   * @property {bool} pullRight - Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: PropTypes.bool,

  /**
   * @property {bool} pullLeft - Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: PropTypes.bool,
};

const defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false,
};

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    onSelect: PropTypes.func,
  }),

  $bs_tabContainer: PropTypes.shape({
    activeKey: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
    getTabId: PropTypes.func.isRequired,
    getPaneId: PropTypes.func.isRequired,
  }),
};

/**
 * # A react component that contains navigation items.
 * Navs come in two styles, `pills` and `tabs`. Disable a tab by adding `disabled`.
 * 
 * &nbsp;
 * ## Example
 * ```js
 * function handleSelect(selectedKey) {
 *  alert('selected ' + selectedKey);
 * }
 * 
 * const navInstance = (
 *  <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
 *    <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
 *    <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
 *    <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
 *  </Nav>
 * );
 * 
 * ReactDOM.render(navInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Stacked
 * They can also be `stacked` vertically.
 * ```js
 * function handleSelect(selectedKey) {
 *  alert('selected ' + selectedKey);
 * }
 * 
 * const navInstance = (
 *  <Nav bsStyle="pills" stacked activeKey={1} onSelect={handleSelect}>
 *    <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
 *    <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
 *    <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
 *  </Nav>
 * );
 * 
 * ReactDOM.render(navInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Justified
 * ```js
 * They can be `justified` to take the full width of their parent.
 * const NavJustified = React.createClass({
 *  handleSelect(selectedKey) {
 *    alert('selected ' + selectedKey);
 *  },
 * 
 * render() {
 *    return (
 *      <div>
 *        <Nav bsStyle="tabs" justified activeKey={1} onSelect={this.handleSelect}>
 *          <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
 *          <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
 *          <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
 *        </Nav>
 *        <br />
 *        <Nav bsStyle="pills" justified activeKey={1} onSelect={this.handleSelect}>
 *          <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
 *          <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
 *          <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
 *        </Nav>
 *      </div>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<NavJustified />, mountNode);
 * ```
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `nav`.
 * @property {'tabs'|'pills'} bsStyle - Component visual or contextual style variants.
 */
class Nav extends React.Component {
  componentDidUpdate() {
    if (!this._needsRefocus) {
      return;
    }

    this._needsRefocus = false;

    const { children } = this.props;
    const { activeKey, activeHref } = this.getActiveProps();

    const activeChild = find(children, child => (
      this.isActive(child, activeKey, activeHref)
    ));

    const childrenArray = toArray(children);
    const activeChildIndex = childrenArray.indexOf(activeChild);

    const childNodes = ReactDOM.findDOMNode(this).children;
    const activeNode = childNodes && childNodes[activeChildIndex];

    if (!activeNode || !activeNode.firstChild) {
      return;
    }

    activeNode.firstChild.focus();
  }

  handleTabKeyDown(onSelect, event) {
    let nextActiveChild;

    switch (event.keyCode) {
      case keycode.codes.left:
      case keycode.codes.up:
        nextActiveChild = this.getNextActiveChild(-1);
        break;
      case keycode.codes.right:
      case keycode.codes.down:
        nextActiveChild = this.getNextActiveChild(1);
        break;
      default:
        // It was a different key; don't handle this keypress.
        return;
    }

    event.preventDefault();

    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey != null) {
      onSelect(nextActiveChild.props.eventKey);
    }

    this._needsRefocus = true;
  }

  getNextActiveChild(offset) {
    const { children } = this.props;
    const validChildren = children.filter(child => (
      child.props.eventKey != null && !child.props.disabled
    ));
    const { activeKey, activeHref } = this.getActiveProps();

    const activeChild = find(children, child => (
      this.isActive(child, activeKey, activeHref)
    ));

    // This assumes the active child is not disabled.
    const activeChildIndex = validChildren.indexOf(activeChild);
    if (activeChildIndex === -1) {
      // Something has gone wrong. Select the first valid child we can find.
      return validChildren[0];
    }

    let nextIndex = activeChildIndex + offset;
    const numValidChildren = validChildren.length;

    if (nextIndex >= numValidChildren) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = numValidChildren - 1;
    }

    return validChildren[nextIndex];
  }

  getActiveProps() {
    const tabContainer = this.context.$bs_tabContainer;

    if (tabContainer) {
      warning(this.props.activeKey == null && !this.props.activeHref,
        'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' +
        'a `<TabContainer>` is not supported. Instead use `<TabContainer ' +
        `activeKey={${this.props.activeKey}} />\`.`
      );

      return tabContainer;
    }

    return this.props;
  }

  isActive({ props }, activeKey, activeHref) {
    if (
      props.active ||
      activeKey != null && props.eventKey === activeKey ||
      activeHref && props.href === activeHref
    ) {
      return true;
    }

    return props.active;
  }

  getTabProps(child, tabContainer, navRole, active, onSelect) {
    if (!tabContainer && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    let {
      id,
      'aria-controls': controls,
      eventKey,
      role,
      onKeyDown,
      tabIndex,
    } = child.props;

    if (tabContainer) {
      warning(!id && !controls,
        'In the context of a `<TabContainer>`, `<NavItem>`s are given ' +
        'generated `id` and `aria-controls` attributes for the sake of ' +
        'proper component accessibility. Any provided ones will be ignored. ' +
        'To control these attributes directly, provide a `generateChildId` ' +
        'prop to the parent `<TabContainer>`.'
      );

      id = tabContainer.getTabId(eventKey);
      controls = tabContainer.getPaneId(eventKey);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = createChainedFunction(
        event => this.handleTabKeyDown(onSelect, event), onKeyDown
      );
      tabIndex = active ? tabIndex : -1;
    }

    return {
      id,
      role,
      onKeyDown,
      'aria-controls': controls,
      tabIndex,
    };
  }

  render() {
    const {
      stacked,
      justified,
      onSelect,
      role: propsRole,
      navbar: propsNavbar,
      pullRight,
      pullLeft,
      className,
      children,
      ...props
    } = this.props;

    const tabContainer = this.context.$bs_tabContainer;
    const role = propsRole || (tabContainer ? 'tablist' : null);

    const { activeKey, activeHref } = this.getActiveProps();
    delete props.activeKey; // Accessed via this.getActiveProps().
    delete props.activeHref; // Accessed via this.getActiveProps().

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'stacked')]: stacked,
      [prefix(bsProps, 'justified')]: justified,
    };

    const navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
    let pullLeftClassName;
    let pullRightClassName;

    if (navbar) {
      const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

      classes[prefix(navbarProps, 'nav')] = true;

      pullRightClassName = prefix(navbarProps, 'right');
      pullLeftClassName = prefix(navbarProps, 'left');
    } else {
      pullRightClassName = 'pull-right';
      pullLeftClassName = 'pull-left';
    }

    classes[pullRightClassName] = pullRight;
    classes[pullLeftClassName] = pullLeft;

    return (
      <ul
        {...elementProps}
        role={role}
        className={classNames(className, classes)}
      >
        {map(children, child => {
          const active = this.isActive(child, activeKey, activeHref);
          const childOnSelect = createChainedFunction(
            child.props.onSelect,
            onSelect,
            navbar && navbar.onSelect,
            tabContainer && tabContainer.onSelect
          );

          return cloneElement(child, {
            ...this.getTabProps(
              child, tabContainer, role, active, childOnSelect
            ),
            active,
            activeKey,
            activeHref,
            onSelect: childOnSelect,
          });
        })}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

export default bsClass('nav',
  bsStyles(['tabs', 'pills'], Nav)
);
