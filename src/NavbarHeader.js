import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import prefix from './utils/prefix';

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
  }),
};

/**
 * A header component for the `<Navbar>` component.
 * @example
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
 */
class NavbarHeader extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'header');

    return (
      <div {...props} className={classNames(className, bsClassName)} />
    );
  }
}

NavbarHeader.contextTypes = contextTypes;

export default NavbarHeader;
