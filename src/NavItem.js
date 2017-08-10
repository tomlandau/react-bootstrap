import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  eventKey: PropTypes.any,
};

const defaultProps = {
  active: false,
  disabled: false
};

/**
 * # An item inside a `<Nav>`.
 * For more info, see [`<Nav>` component page](https://bitsrc.io/react-bootstrap/components/navs/nav-item).
 * 
 * &nbsp;
 * ## Example
 * ```js
 * <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
 *   <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
 *   <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
 *   <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
 * </Nav>
 * ```
 * @property {bool} active - default is `false`.
 * @property {bool} disabled - default is `false`.
 * @property {bool} disabled - default is `false`.
 * @property {string} href
 * @property {func} onClick
 * @property {func} onSelect
 * @property {string} role
 */
class NavItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }

  render() {
    const { active, disabled, onClick, className, style, ...props } =
      this.props;

    delete props.onSelect;
    delete props.eventKey;

    // These are injected down by `<Nav>` for building `<SubNav>`s.
    delete props.activeKey;
    delete props.activeHref;

    if (!props.role) {
      if (props.href === '#') {
        props.role = 'button';
      }
    } else if (props.role === 'tab') {
      props['aria-selected'] = active;
    }

    return (
      <li
        role="presentation"
        className={classNames(className, { active, disabled })}
        style={style}
      >
        <SafeAnchor
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
