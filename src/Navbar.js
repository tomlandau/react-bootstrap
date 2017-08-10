// TODO: Remove this pragma once we upgrade eslint-config-airbnb.
/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import uncontrollable from 'uncontrollable';

import Grid from './Grid';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarHeader from './NavbarHeader';
import NavbarToggle from './NavbarToggle';
import setBsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsPropsAndOmit} from './utils/splitBsProps';
import prefix from './utils/prefix';
import { Style } from './utils/StyleConfig';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  /**
   * @property {bool} fixedTop - Create a fixed navbar along the top of the screen, that scrolls with the
   * page
   */
  fixedTop: PropTypes.bool,
  /**
   * @property {bool} fixedBottom - Create a fixed navbar along the bottom of the screen, that scrolls with
   * the page
   */
  fixedBottom: PropTypes.bool,
  /**
   * @property {bool} staticTop - Create a full-width navbar that scrolls away with the page
   */
  staticTop: PropTypes.bool,
  /**
   * @property {bool} inverse - An alternative dark visual style for the Navbar
   */
  inverse: PropTypes.bool,
  /**
   * @property {bool} fluid - Allow the Navbar to fluidly adjust to the page or container width, instead
   * of at the predefined screen breakpoints
   */
  fluid: PropTypes.bool,

  /**
   * @property {elementType} componentClass - Set a custom element for this component.
   */
  componentClass: elementType,
  /**
   * @property {func} onToggle - A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `navExpanded`
   * boolean value.
   *
   * @controllable navExpanded
   */
  onToggle: PropTypes.func,
  /**
   * @property {func} onSelect - A callback fired when a descendant of a child `<Nav>` is selected. Should
   * be used to execute complex closing or other miscellaneous actions desired
   * after selecting a descendant of `<Nav>`. Does nothing if no `<Nav>` or `<Nav>`
   * descendants exist. The callback is called with an eventKey, which is a
   * prop from the selected `<Nav>` descendant, and an event.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   *
   * For basic closing behavior after all `<Nav>` descendant onSelect events in
   * mobile viewports, try using collapseOnSelect.
   *
   * Note: If you are manually closing the navbar using this `OnSelect` prop,
   * ensure that you are setting `expanded` to false and not *toggling* between
   * true and false.
   */
  onSelect: PropTypes.func,
  /**
   * @property {bool} collapseOnSelect - Sets `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>`. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * The onSelect callback should be used instead for more complex operations
   * that need to be executed after the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect: PropTypes.bool,
  /**
   * @property {bool} expanded - Explicitly set the visiblity of the navbar body
   *
   * @controllable onToggle
   */
  expanded: PropTypes.bool,

  /**
   * @property {string} role
   */
  role: PropTypes.string,
};

const defaultProps = {
  componentClass: 'nav',
  fixedTop: false,
  fixedBottom: false,
  staticTop: false,
  inverse: false,
  fluid: false,
  collapseOnSelect: false,
};

const childContextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  })
};

/**
 * Navbars are responsive meta components that serve as navigation headers for your application or site.
 * They also support all the different Bootstrap classes as properties. Just camelCase the css class and remove navbar from it.
 * For example `navbar-fixed-top` becomes the property `fixedTop`. The different properties are `fixedTop`, `fixedBottom`, `staticTop`, `inverse`, and `fluid`.
 * You can also align elements to the right by specifying the `pullRight` prop on the `Nav`, and other sub-components.
 * 
 * &nbsp;
 * ## Navbar Basic Example
* ```js
 * const navbarInstance = (
 *  <Navbar>
 *    <Navbar.Header>
 *      <Navbar.Brand>
 *        <a href="#">React-Bootstrap</a>
 *      </Navbar.Brand>
 *    </Navbar.Header>
 *    <Nav>
 *      <NavItem eventKey={1} href="#">Link</NavItem>
 *      <NavItem eventKey={2} href="#">Link</NavItem>
 *      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
 *        <MenuItem eventKey={3.1}>Action</MenuItem>
 *        <MenuItem eventKey={3.2}>Another action</MenuItem>
 *        <MenuItem eventKey={3.3}>Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey={3.4}>Separated link</MenuItem>
 *      </NavDropdown>
 *    </Nav>
 *  </Navbar>
 * );
 * 
 * ReactDOM.render(navbarInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Responsive Navbars
 * To have a mobile friendly Navbar, Add a `Navbar.Toggle` to your Header and wrap your Navs in a `Navbar.Collapse` component. The `Navbar` will automatically wire the toggle and collapse together!
 * Set the `defaultExpanded` prop to make the Navbar start expanded. Set `collapseOnSelect` to make the Navbar collapse automatically when the user selects an item. You can also finely control the collapsing behavior by using the `expanded` and `onToggle` props.
 * ```js
 * const navbarInstance = (
 *  <Navbar inverse collapseOnSelect>
 *    <Navbar.Header>
 *      <Navbar.Brand>
 *        <a href="#">React-Bootstrap</a>
 *      </Navbar.Brand>
 *      <Navbar.Toggle />
 *    </Navbar.Header>
 *    <Navbar.Collapse>
 *      <Nav>
 *        <NavItem eventKey={1} href="#">Link</NavItem>
 *        <NavItem eventKey={2} href="#">Link</NavItem>
 *        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
 *          <MenuItem eventKey={3.1}>Action</MenuItem>
 *          <MenuItem eventKey={3.2}>Another action</MenuItem>
 *          <MenuItem eventKey={3.3}>Something else here</MenuItem>
 *          <MenuItem divider />
 *          <MenuItem eventKey={3.3}>Separated link</MenuItem>
 *        </NavDropdown>
 *      </Nav>
 *      <Nav pullRight>
 *        <NavItem eventKey={1} href="#">Link Right</NavItem>
 *        <NavItem eventKey={2} href="#">Link Right</NavItem>
 *      </Nav>
 *    </Navbar.Collapse>
 *  </Navbar>
 * );
 * 
 * ReactDOM.render(navbarInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Forms
 * Use the `Navbar.Form` convenience component to apply proper margins and alignment to form components.
 * ```js
 * const navbarInstance = (
 *  <Navbar>
 *    <Navbar.Header>
 *      <Navbar.Brand>
 *        <a href="#">Brand</a>
 *      </Navbar.Brand>
 *      <Navbar.Toggle />
 *    </Navbar.Header>
 *    <Navbar.Collapse>
 *      <Navbar.Form pullLeft>
 *        <FormGroup>
 *          <FormControl type="text" placeholder="Search" />
 *        </FormGroup>
 *        {' '}
 *        <Button type="submit">Submit</Button>
 *      </Navbar.Form>
 *    </Navbar.Collapse>
 *  </Navbar>
 * );
 * 
 * ReactDOM.render(navbarInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Text and Non-nav links
 * Loose text and links can be wraped in the convenience components: `Navbar.Link` and `Navbar.Text`
 * ```js
 * const navbarInstance = (
 *  <Navbar>
 *    <Navbar.Header>
 *      <Navbar.Brand>
 *        <a href="#">Brand</a>
 *      </Navbar.Brand>
 *      <Navbar.Toggle />
 *    </Navbar.Header>
 *    <Navbar.Collapse>
 *      <Navbar.Text>
 *        Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
 *      </Navbar.Text>
 *      <Navbar.Text pullRight>
 *        Have a great day!
 *      </Navbar.Text>
 *    </Navbar.Collapse>
 *  </Navbar>
 * );
 * 
 * ReactDOM.render(navbarInstance, mountNode);
 * ```
 */
class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  getChildContext() {
    const { bsClass, expanded, onSelect, collapseOnSelect } = this.props;

    return {
      $bs_navbar: {
        bsClass,
        expanded,
        onToggle: this.handleToggle,
        onSelect: createChainedFunction(
          onSelect, collapseOnSelect ? this.handleCollapse : null,
        ),
      },
    };
  }

  handleCollapse() {
    const { onToggle, expanded } = this.props;

    if (expanded) {
      onToggle(false);
    }
  }

  handleToggle() {
    const { onToggle, expanded } = this.props;

    onToggle(!expanded);
  }

  render() {
    const {
      componentClass: Component,
      fixedTop,
      fixedBottom,
      staticTop,
      inverse,
      fluid,
      className,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'expanded', 'onToggle', 'onSelect', 'collapseOnSelect',
    ]);

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (elementProps.role === undefined && Component !== 'nav') {
      elementProps.role = 'navigation';
    }

    if (inverse) {
      bsProps.bsStyle = Style.INVERSE;
    }

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'fixed-top')]: fixedTop,
      [prefix(bsProps, 'fixed-bottom')]: fixedBottom,
      [prefix(bsProps, 'static-top')]: staticTop,
    };

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      >
        <Grid fluid={fluid}>
          {children}
        </Grid>
      </Component>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
Navbar.childContextTypes = childContextTypes;

setBsClass('navbar', Navbar);

const UncontrollableNavbar = uncontrollable(Navbar, { expanded: 'onToggle' });

function createSimpleWrapper(tag, suffix, displayName) {
  const Wrapper = (
    { componentClass: Component, className, pullRight, pullLeft, ...props },
    { $bs_navbar: navbarProps = { bsClass: 'navbar' } }
  ) => (
    <Component
      {...props}
      className={classNames(
        className,
        prefix(navbarProps, suffix),
        pullRight && prefix(navbarProps, 'right'),
        pullLeft && prefix(navbarProps, 'left'),
      )}
    />
  );

  Wrapper.displayName = displayName;

  Wrapper.propTypes = {
    componentClass: elementType,
    pullRight: PropTypes.bool,
    pullLeft: PropTypes.bool,
  };

  Wrapper.defaultProps = {
    componentClass: tag,
    pullRight: false,
    pullLeft: false,
  };

  Wrapper.contextTypes = {
    $bs_navbar: PropTypes.shape({
      bsClass: PropTypes.string,
    }),
  };

  return Wrapper;
}

UncontrollableNavbar.Brand = NavbarBrand;
UncontrollableNavbar.Header = NavbarHeader;
UncontrollableNavbar.Toggle = NavbarToggle;
UncontrollableNavbar.Collapse = NavbarCollapse;

UncontrollableNavbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
UncontrollableNavbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
UncontrollableNavbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink');

// Set bsStyles here so they can be overridden.
export default bsStyles([Style.DEFAULT, Style.INVERSE], Style.DEFAULT,
  UncontrollableNavbar
);
