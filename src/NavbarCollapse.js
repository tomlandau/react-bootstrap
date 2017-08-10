import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import prefix from './utils/prefix';

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
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
class NavbarCollapse extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'collapse');

    return (
      <Collapse in={navbarProps.expanded} {...props}>
        <div className={bsClassName}>
          {children}
        </div>
      </Collapse>
    );
  }
}

NavbarCollapse.contextTypes = contextTypes;

export default NavbarCollapse;
