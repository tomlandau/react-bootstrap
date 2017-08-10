import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import SafeAnchor from './SafeAnchor';

import setBsClass from './utils/bsClass';

const propTypes = {
  noCaret: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  useAnchor: PropTypes.bool,
};

const defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle',
};

/**
 * # Represents the toggle component of a React dropdown button.
 * To be used as a child component of [`<Dropdown>`](https://bitsrc.io/react-bootstrap/components/dropdowns/dropdown).
 * 
 * &nbsp;
 * ## Custom use
 * Instead of using `<DropdownButton>`, you can use the more basic `<DropDown>` component, and then explicitly specify the `<DropdownToggle>` component.
 * ```js
 *   <Dropdown id="dropdown-custom-1">
 *     <Dropdown.Toggle>
 *       <Glyphicon glyph="star" />
 *       Pow! Zoom!
 *     </Dropdown.Toggle>
 *     <Dropdown.Menu className="super-colors">
 *       <MenuItem eventKey="1">Action</MenuItem>
 *       <MenuItem eventKey="2">Another action</MenuItem>
 *       <MenuItem eventKey="3" active>Active Item</MenuItem>
 *       <MenuItem divider />
 *       <MenuItem eventKey="4">Separated link</MenuItem>
 *     </Dropdown.Menu>
 *   </Dropdown>
 * ```
 * 
 * &nbsp;
 * ## props:
 * @property {bool} noCaret
 * @property {bool} open
 * @property {string} title
 * @property {bool} useAnchor
 */
class DropdownToggle extends React.Component {
  render() {
    const {
      noCaret,
      open,
      useAnchor,
      bsClass,
      className,
      children,
      ...props
    } = this.props;

    delete props.bsRole;

    const Component = useAnchor ? SafeAnchor : Button;
    const useCaret = !noCaret;

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.

    // FIXME: Should this really fall back to `title` as children?

    return (
      <Component
        {...props}
        role="button"
        className={classNames(className, bsClass)}
        aria-haspopup
        aria-expanded={open}
      >
        {children || props.title}
        {useCaret && ' '}
        {useCaret && <span className="caret" />}
      </Component>
    );
  }
}

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;

export default setBsClass('dropdown-toggle', DropdownToggle);
