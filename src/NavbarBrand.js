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
 * Displays the brand inside a `<Navbar>` header.
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
class NavbarBrand extends React.Component {
  render() {
    const { className, children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'brand');

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(
          children.props.className, className, bsClassName
        )
      });
    }

    return (
      <span {...props} className={classNames(className, bsClassName)}>
        {children}
      </span>
    );
  }
}

NavbarBrand.contextTypes = contextTypes;

export default NavbarBrand;
