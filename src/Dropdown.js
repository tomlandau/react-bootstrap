import classNames from 'classnames';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import keycode from 'keycode';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import all from 'prop-types-extra/lib/all';
import elementType from 'prop-types-extra/lib/elementType';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';
import warning from 'warning';

import ButtonGroup from './ButtonGroup';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
import setBsClass from './utils/bsClass'
import prefix from './utils/prefix';
import createChainedFunction from './utils/createChainedFunction';
import requiredRoles from './utils/requiredRoles';
import exclusiveRoles from './utils/exclusiveRoles';
import map from '../components/element-children/map';

const TOGGLE_ROLE = DropdownToggle.defaultProps.bsRole;
const MENU_ROLE = DropdownMenu.defaultProps.bsRole;

const propTypes = {
  /**
   * @property {bool} dropup -
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: PropTypes.bool,

  /**
   * @property {string|number} id -
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ])),
  /**
   * @property {elementType} componentClass
   */
  componentClass: elementType,

  /**
   * @property {node} children -
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: all(
    requiredRoles(TOGGLE_ROLE, MENU_ROLE),
    exclusiveRoles(MENU_ROLE)
  ),

  /**
   * @property {bool} disabled
   * Whether or not component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * @property {bool} pullRight -
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: PropTypes.bool,

  /**
   * @property {bool} open -
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: PropTypes.bool,
  /**
   * @property {bool} defaultOpen
   */
  defaultOpen: PropTypes.bool,

  /**
   * @property {func} onToggle -
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(Boolean isOpen, Object event, { String source }) {}
   * ```
   * @controllable open
   */
  onToggle: PropTypes.func,

  /**
   * @property {func} onSelect - 
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * @property {string} role -
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: PropTypes.string,

  /**
   * @property {'click'|'mousedown'} rootCloseEvent -
   * Which event when fired outside the component will cause it to be closed
   */
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  /**
   * @private
   */
  onMouseEnter: PropTypes.func,
  /**
   * @private
   */
  onMouseLeave: PropTypes.func,
};

const defaultProps = {
  componentClass: ButtonGroup,
};

/**
 * If the default handling of the dropdown menu and toggle components aren't to your liking, you can customize them, by using the more basic `Dropdown` Component to explicitly specify the Toggle and Menu components.
 * 
 * &nbsp;
 * ```js
 * const dropdownInstance = (
 *  <ButtonToolbar>
 *    <Dropdown id="dropdown-custom-1">
 *      <Dropdown.Toggle>
 *        <Glyphicon glyph="star" />
 *        Pow! Zoom!
 *      </Dropdown.Toggle>
 *      <Dropdown.Menu className="super-colors">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3" active>Active Item</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </Dropdown.Menu>
 *    </Dropdown>
 * 
 *    <Dropdown id="dropdown-custom-2">
 *      <Button bsStyle="info">
 *        mix it up style-wise
 *      </Button>
 *      <Dropdown.Toggle bsStyle="success"/>
 *      <Dropdown.Menu className="super-colors">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3" active>Active Item</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </Dropdown.Menu>
 *    </Dropdown>
 * 
 *  </ButtonToolbar>
 * );
 * 
 * ReactDOM.render(dropdownInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Custom Dropdown Components
 * For those that want to customize everything, you can forgo the included Toggle and Menu components, and create your own. In order to tell the Dropdown component what role your custom components play, add a special prop `bsRole` to your menu or toggle components. The Dropdown expects at least one component with `bsRole="toggle"` and exactly one with `bsRole="menu"`. Custom toggle and menu components must be able to accept refs.
 * ```js
 * class CustomToggle extends React.Component {
 *  constructor(props, context) {
 *    super(props, context);
 * 
 *    this.handleClick = this.handleClick.bind(this);
 *  }
 * 
 *  handleClick(e) {
 *    e.preventDefault();
 * 
 *    this.props.onClick(e);
 *  }
 * 
 *  render() {
 *    return (
 *      <a href="" onClick={this.handleClick}>
 *        {this.props.children}
 *      </a>
 *    );
 *  }
 * }
 * 
 * class CustomMenu extends React.Component {
 *  constructor(props, context) {
 *    super(props, context);
 * 
 *    this.onChange = e => this.setState({ value: e.target.value });
 * 
 *    this.state = { value: '' };
 *  }
 * 
 *  focusNext() {
 *    const input = ReactDOM.findDOMNode(this.input);
 * 
 *    if (input) {
 *      input.focus();
 *    }
 *  }
 * 
 *  render() {
 *    const { children } = this.props;
 *    const { value } = this.state;
 * 
 *    return (
 *      <div className="dropdown-menu" style={{ padding: '' }}>
 *        <FormControl
 *          ref={c => { this.input = c; }}
 *          type="text"
 *          placeholder="Type to filter..."
 *          onChange={this.onChange}
 *          value={this.state.value}
 *        />
 *        <ul className="list-unstyled">
 *          {React.Children.toArray(children).filter(child => (
 *            !value.trim() || child.props.children.indexOf(value) !== -1
 *          ))}
 *        </ul>
 *      </div>
 *    );
 *  }
 * }
 * 
 * ReactDOM.render((
 *  <Dropdown id="dropdown-custom-menu">
 *    <CustomToggle bsRole="toggle">
 *      Custom toggle
 *    </CustomToggle>
 * 
 *    <CustomMenu bsRole="menu">
 *      <MenuItem eventKey="1">Red</MenuItem>
 *      <MenuItem eventKey="2">Blue</MenuItem>
 *      <MenuItem eventKey="3" active>Orange</MenuItem>
 *      <MenuItem eventKey="1">Red-Orange</MenuItem>
 *    </CustomMenu>
 *  </Dropdown>
 * ), mountNode);
 * ```
 */
class Dropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this._focusInDropdown = false;
    this.lastOpenEventType = null;
  }

  componentDidMount() {
    this.focusNextOnOpen();
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = contains(
        ReactDOM.findDOMNode(this.menu), activeElement(document)
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    const prevOpen = prevProps.open;

    if (open && !prevOpen) {
      this.focusNextOnOpen();
    }

    if (!open && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  }

  handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen(event, { source: 'click' });
  }

  handleKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case keycode.codes.down:
        if (!this.props.open) {
          this.toggleOpen(event, { source: 'keydown' });
        } else if (this.menu.focusNext) {
          this.menu.focusNext();
        }
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        this.handleClose(event, { source: 'keydown' });
        break;
      default:
    }
  }

  toggleOpen(event, eventDetails) {
    let open = !this.props.open;

    if (open) {
      this.lastOpenEventType = eventDetails.source;
    }

    if (this.props.onToggle) {
      this.props.onToggle(open, event, eventDetails);
    }
  }

  handleClose(event, eventDetails) {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen(event, eventDetails);
  }

  focusNextOnOpen() {
    const menu = this.menu;

    if (!menu.focusNext) {
      return;
    }

    if (
      this.lastOpenEventType === 'keydown' ||
      this.props.role === 'menuitem'
    ) {
      menu.focusNext();
    }
  }

  focus() {
    const toggle = ReactDOM.findDOMNode(this.toggle);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  }

  renderToggle(child, props) {
    let ref = c => { this.toggle = c; };

    if (typeof child.ref === 'string') {
      warning(false,
        'String refs are not supported on `<Dropdown.Toggle>` components. ' +
        'To apply a ref to the component use the callback signature:\n\n ' +
        'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
      );
    } else {
      ref = createChainedFunction(child.ref, ref);
    }

    return cloneElement(child, {
      ...props,
      ref,
      bsClass: prefix(props, 'toggle'),
      onClick: createChainedFunction(
        child.props.onClick, this.handleClick
      ),
      onKeyDown: createChainedFunction(
        child.props.onKeyDown, this.handleKeyDown
      ),
    });
  }

  renderMenu(child, { id, onSelect, rootCloseEvent, ...props }) {
    let ref = c => { this.menu = c; };

    if (typeof child.ref === 'string') {
      warning(false,
        'String refs are not supported on `<Dropdown.Menu>` components. ' +
        'To apply a ref to the component use the callback signature:\n\n ' +
        'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
      );
    } else {
      ref = createChainedFunction(child.ref, ref);
    }

    return cloneElement(child, {
      ...props,
      ref,
      labelledBy: id,
      bsClass: prefix(props, 'menu'),
      onClose: createChainedFunction(
        child.props.onClose, this.handleClose,
      ),
      onSelect: createChainedFunction(
        child.props.onSelect,
        onSelect,
        (key, event) => this.handleClose(event, { source: 'select' }),
      ),
      rootCloseEvent
    });
  }

  render() {
    const {
      componentClass: Component,
      id,
      dropup,
      disabled,
      pullRight,
      open,
      onSelect,
      role,
      bsClass,
      className,
      rootCloseEvent,
      children,
      ...props
    } = this.props;

    delete props.onToggle;

    const classes = {
      [bsClass]: true,
      open,
      disabled,
    };

    if (dropup) {
      classes[bsClass] = false;
      classes.dropup = true;
    }

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.

    return (
      <Component
        {...props}
        className={classNames(className, classes)}
      >
        {map(children, child => {
          switch (child.props.bsRole) {
            case TOGGLE_ROLE:
              return this.renderToggle(child, {
                id, disabled, open, role, bsClass,
              });
            case MENU_ROLE:
              return this.renderMenu(child, {
                id, open, pullRight, bsClass, onSelect, rootCloseEvent,
              });
            default:
              return child;
          }
        })}
      </Component>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

setBsClass('dropdown', Dropdown);

const UncontrolledDropdown = uncontrollable(Dropdown, { open: 'onToggle' });

UncontrolledDropdown.Toggle = DropdownToggle;
UncontrolledDropdown.Menu = DropdownMenu;

export default UncontrolledDropdown;
