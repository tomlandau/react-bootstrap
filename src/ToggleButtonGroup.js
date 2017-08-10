import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import uncontrollable from 'uncontrollable';

import chainFunction from './utils/createChainedFunction';
import map from '../components/element-children/map';
import ButtonGroup from './ButtonGroup';
import ToggleButton from './ToggleButton';

const propTypes = {
  /**
   * @property {string} name - An HTML `<input>` name for each child button. Required if `type` is set to `'radio'`
   */
  name: PropTypes.string,

  /**
   * @property {any} value - The value, or array of values, of the active (pressed) buttons
   */
  value: PropTypes.any,

  /**
   * @property {function} onChange - Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   */
  onChange: PropTypes.func,

  /**
   * @property {'checkbox' | 'radio'} type - The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
};

const defaultProps = {
  type: 'radio',
};

/**
 * ## For checkboxes or radio buttons styled as Buttons, you can can use the `ToggleButtonGroup` and `ToggleButton` components.
 * 
 * ## Checkbox example:
 * ```js
 * const toggleButtonGroup = (
 * <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
 *   <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
 *   <ToggleButton value={2}>Checkbox 3</ToggleButton>
 *
 *   <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
 * </ToggleButtonGroup>
 * );
 *
 * ReactDOM.render(toggleButtonGroup, mountNode);
 * ```
 * 
 * ## Radio example:
 * ```js
 * const buttonGroupInstance = (
 * <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
 *   <ToggleButton value={1}>
 *     Radio 1 (pre-checked)
 *   </ToggleButton>
 *   <ToggleButton value={2}>Radio 3</ToggleButton>
 *
 *   <ToggleButton value={3}>Radio 3</ToggleButton>
 * </ToggleButtonGroup>
 * );
 *
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * @bit
 */

class ToggleButtonGroup extends React.Component {
  getValues() {
    const { value } = this.props;
    return value == null ? [] : [].concat(value);
  }

  handleToggle(value) {
    const { type, onChange } = this.props;
    const values = this.getValues();
    const isActive = values.indexOf(value) !== -1;

    if (type === 'radio') {
      if (!isActive) {
        onChange(value);
      }
      return;
    }

    if (isActive) {
      onChange(values.filter(n => n !== value));
    } else {
      onChange([...values, value]);
    }
  }

  render() {
    const { children, type, name, ...props } = this.props;

    const values = this.getValues();

    invariant(type !== 'radio' || !!name,
      'A `name` is required to group the toggle buttons when the `type` ' +
      'is set to "radio"'
    );

    delete props.onChange;
    delete props.value;

    // the data attribute is required b/c twbs css uses it in the selector
    return (
      <ButtonGroup {...props} data-toggle="buttons">
        {map(children, child => {
          const { value, onChange } = child.props;
          const handler = () => this.handleToggle(value);

          return React.cloneElement(child, {
            type,
            name: child.name || name,
            checked: values.indexOf(value) !== -1,
            onChange: chainFunction(onChange, handler),
          });
        })}
      </ButtonGroup>
    );
  }
}

ToggleButtonGroup.propTypes = propTypes;
ToggleButtonGroup.defaultProps = defaultProps;

const UncontrolledToggleButtonGroup = uncontrollable(ToggleButtonGroup, {
  value: 'onChange',
});

UncontrolledToggleButtonGroup.Button = ToggleButton;

export default UncontrolledToggleButtonGroup;
