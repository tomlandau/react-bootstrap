import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import prefix from './utils/prefix';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  /**
   * @property {func} onClick
   */
  onClick: PropTypes.func,
  /**
   * @property {node} children - The toggle content, if left empty it will render the default toggle (seen above).
   */
  children: PropTypes.node,
};

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  }),
};

/**
 * To have a mobile friendly Navbar, Add a `Navbar.Toggle` to your Header and wrap your Navs in a `Navbar.Collapse` component. The `Navbar` will automatically wire the toggle and collapse together!
 * Set the `defaultExpanded` prop to make the Navbar start expanded. Set `collapseOnSelect` to make the Navbar collapse automatically when the user selects an item. You can also finely control the collapsing behavior by using the `expanded` and `onToggle` props.
 * @example
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
 */
class NavbarToggle extends React.Component {
  render() {
    const { onClick, className, children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const buttonProps = {
      type: 'button',
      ...props,
      onClick: createChainedFunction(onClick, navbarProps.onToggle),
      className: classNames(
        className,
        prefix(navbarProps, 'toggle'),
        !navbarProps.expanded && 'collapsed'
      )
    };

    if (children) {
      return (
        <button {...buttonProps}>
          {children}
        </button>
      );
    }

    return (
      <button {...buttonProps}>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    );
  }
}

NavbarToggle.propTypes = propTypes;
NavbarToggle.contextTypes = contextTypes;

export default NavbarToggle;
