import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import splitComponentProps from './utils/splitComponentProps';
import some from '../components/element-children/some';
import map from '../components/element-children/map';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  title: PropTypes.node.isRequired,
  noCaret: PropTypes.bool,
  active: PropTypes.bool,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: PropTypes.node,
};

/**
 * Add dropdowns to a `<Nav>` the `NavDropdown` component.
 * @example
 * const NavDropdownExample = React.createClass({
 *  handleSelect(eventKey) {
 *    event.preventDefault();
 *    alert(`selected ${eventKey}`);
 *  },
 * 
 *  render() {
 *    return (
 *      <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
 *        <NavItem eventKey="1" href="/home">NavItem 1 content</NavItem>
 *        <NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>
 *        <NavItem eventKey="3" disabled>NavItem 3 content</NavItem>
 *        <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
 *          <MenuItem eventKey="4.1">Action</MenuItem>
 *          <MenuItem eventKey="4.2">Another action</MenuItem>
 *          <MenuItem eventKey="4.3">Something else here</MenuItem>
 *          <MenuItem divider />
 *          <MenuItem eventKey="4.4">Separated link</MenuItem>
 *        </NavDropdown>
 *      </Nav>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<NavDropdownExample />, mountNode);
 */
class NavDropdown extends React.Component {
  isActive({ props }, activeKey, activeHref) {
    if (
      props.active ||
      activeKey != null && props.eventKey === activeKey ||
      activeHref && props.href === activeHref
    ) {
      return true;
    }

    if (some(props.children, (child) => (
      this.isActive(child, activeKey, activeHref)
    ))) {
      return true;
    }

    return props.active;
  }

  render() {
    const {
      title,
      activeKey,
      activeHref,
      className,
      style,
      children,
      ...props
    } = this.props;

    const active = this.isActive(this, activeKey, activeHref);
    delete props.active; // Accessed via this.isActive().
    delete props.eventKey; // Accessed via this.isActive().

    const [dropdownProps, toggleProps] =
      splitComponentProps(props, Dropdown.ControlledComponent);

    // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
    // rather than the `<Dropdown.Toggle>`.

    return (
      <Dropdown
        {...dropdownProps}
        componentClass="li"
        className={classNames(className, { active })}
        style={style}
      >
        <Dropdown.Toggle {...toggleProps} useAnchor>
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {map(children, child => (
            React.cloneElement(child, {
              active: this.isActive(child, activeKey, activeHref),
            })
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NavDropdown.propTypes = propTypes;

export default NavDropdown;
