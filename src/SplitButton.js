import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Dropdown from './Dropdown';
import SplitToggle from './SplitToggle';
import splitComponentProps from './utils/splitComponentProps';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  /**
   * The content of the split button.
   */
  title: PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: PropTypes.string,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: PropTypes.node,
};

/**
 * Represents a split button dropdown.
 * Create split button dropdowns with the <SplitButton /> component:
 * ```js
 * const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
 * 
 * function renderSplitButton(title, i) {
 *  return (
 *    <SplitButton bsStyle={title.toLowerCase()} title={title} key={i} id={`split-button-basic-${i}`}>
 *      <MenuItem eventKey="1">Action</MenuItem>
 *      <MenuItem eventKey="2">Another action</MenuItem>
 *      <MenuItem eventKey="3">Something else here</MenuItem>
 *      <MenuItem divider />
 *      <MenuItem eventKey="4">Separated link</MenuItem>
 *    </SplitButton>
 *  );
 * }
 * 
 * const buttonsInstance = (
 *  <ButtonToolbar>{BUTTONS.map(renderSplitButton)}</ButtonToolbar>
 * );
 * 
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Sizing
 * Dropdowns work with buttons of all sizes:
 * ```js
 * const buttonsInstance = (
 *  <div>
 *    <ButtonToolbar>
 *      <SplitButton bsSize="large" title="Large button" id="dropdown-size-large">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3">Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </SplitButton>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <SplitButton title="Default button" id="dropdown-size-medium">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3">Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </SplitButton>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <SplitButton bsSize="small" title="Small button" id="dropdown-size-small">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3">Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </SplitButton>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <SplitButton bsSize="xsmall" title="Extra small button" id="dropdown-size-extra-small">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3">Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </SplitButton>
 *    </ButtonToolbar>
 *  </div>
 * );
 * 
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## No caret variation
 * Remove the caret using the `noCaret` prop:
 * ```js
 * const buttonInstance = (
 *  <ButtonToolbar>
 *    <SplitButton bsStyle="default" title="No caret" noCaret id="dropdown-no-caret">
 *      <MenuItem eventKey="1">Action</MenuItem>
 *      <MenuItem eventKey="2">Another action</MenuItem>
 *      <MenuItem eventKey="3">Something else here</MenuItem>
 *      <MenuItem divider />
 *      <MenuItem eventKey="4">Separated link</MenuItem>
 *    </SplitButton>
 *  </ButtonToolbar>
 * );
 * 
 * ReactDOM.render(buttonInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Dropup variation
 * Trigger dropdown menus that site above the button by adding the `dropup` prop.
 * ```js
 *   <div>
 *    <ButtonToolbar>
 *      <SplitButton title="Dropup" dropup id="split-button-dropup">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3">Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </SplitButton>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <SplitButton bsStyle="primary" title="Right dropup" dropup pullRight id="split-button-dropup-pull-right">
 *        <MenuItem eventKey="1">Action</MenuItem>
 *        <MenuItem eventKey="2">Another action</MenuItem>
 *        <MenuItem eventKey="3">Something else here</MenuItem>
 *        <MenuItem divider />
 *        <MenuItem eventKey="4">Separated link</MenuItem>
 *      </SplitButton>
 *    </ButtonToolbar>
 *  </div>
 * );
 * 
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Dropdown right variation
 * Trigger dropdown menus that align to the right of the button using the `pullRight` prop.
 * ```js
 * const buttonsInstance = (
 *  <SplitButton title="Dropdown right" pullRight id="split-button-pull-right">
 *    <MenuItem eventKey="1">Action</MenuItem>
 *    <MenuItem eventKey="2">Another action</MenuItem>
 *    <MenuItem eventKey="3">Something else here</MenuItem>
 *    <MenuItem divider />
 *    <MenuItem eventKey="4">Separated link</MenuItem>
 *  </SplitButton>
 * );
 * 
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * @property {string} bsSize - Component size variations.
 * @property {string} bsStyle - Component visual or contextual style variants.
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `ButtonGroup`.
 * @property {bool} defaultOpen
 * @property {bool} disabled - Whether or not component is disabled.
 * @property {string} href
 * @property {bool} dropup - The menu will open above the dropdown button, instead of below it.
 * @property {string|number} id - An html id attribute, necessary for assistive technologies, such as screen readers. Required.
 * @property {func} onClick
 * @property {func} onSelect - A callback fired when a menu item is selected.
 * ```js
 * (eventKey: any, event: Object) => any
 * ```
 * @property {func} onToggle - A callback fired when the Dropdown wishes to change visibility. Called with the requested `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
 * Controls `open`.
 * ```js
 * function(Boolean isOpen, Object event, { String source }) {}
 * ```
 * @property {bool} open - Whether or not the Dropdown is visible. Controlled by `onToggle`. Initial prop is `defaultOpen`.
 * @property {bool} pullRight - Align the menu to the right side of the Dropdown toggle.
 * @property {string} role - If `'menuitem'`, causes the dropdown to behave like a menu item rather than a menu button.
 * @property {'click'|'mousedown'} rootCloseEvent - Which event when fired outside the component will cause it to be closed
 * @property {node} title - Required.
 * @property {node} toggleLabel - Accessible label for the toggle; the value of `title` if not specified.
 */
class SplitButton extends React.Component {
  render() {
    const {
      bsSize, bsStyle, title, toggleLabel, children, ...props
    } = this.props;

    const [dropdownProps, buttonProps] =
      splitComponentProps(props, Dropdown.ControlledComponent);

    return (
      <Dropdown
        {...dropdownProps}
        bsSize={bsSize}
        bsStyle={bsStyle}
      >
        <Button
          {...buttonProps}
          disabled={props.disabled}
          bsSize={bsSize}
          bsStyle={bsStyle}
        >
          {title}
        </Button>
        <SplitToggle
          aria-label={toggleLabel || title}
          bsSize={bsSize}
          bsStyle={bsStyle}
        />

        <Dropdown.Menu>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SplitButton.propTypes = propTypes;

SplitButton.Toggle = SplitToggle;

export default SplitButton;
