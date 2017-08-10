import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import warning from 'warning';

import FormControlFeedback from './FormControlFeedback';
import FormControlStatic from './FormControlStatic';
import { SIZE_MAP, Size } from './utils/StyleConfig';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';
import bsSizes from './utils/bsSizes';

const propTypes = {
  componentClass: elementType,
  type: PropTypes.string,
  id: PropTypes.string,
  inputRef: PropTypes.func,
};

const defaultProps = {
  componentClass: 'input',
};

const contextTypes = {
  $bs_formGroup: PropTypes.object,
};

/**
 * # The `<FormControl>` component renders a form control with Bootstrap styling.
 * 
 * &nbsp;
 * The `<FormControl>` component directly renders the `<input>` or other specified component. If you need to access the value of an uncontrolled `<FormControl>`, attach a `ref` to it as you would with an uncontrolled input, then call `ReactDOM.findDOMNode(ref)` to get the DOM node. You can then interact with that node as you would with any other uncontrolled input.
 * @example
 * ```js
 * const FormExample = React.createClass({
 *  getInitialState() {
 *    return {
 *      value: ''
 *    };
 *  },
 * 
 *  getValidationState() {
 *    const length = this.state.value.length;
 *    if (length > 10) return 'success';
 *    else if (length > 5) return 'warning';
 *    else if (length > 0) return 'error';
 *  },
 * 
 *  handleChange(e) {
 *    this.setState({ value: e.target.value });
 *  },
 * 
 *  render() {
 *    return (
 *      <form>
 *        <FormGroup
 *          controlId="formBasicText"
 *          validationState={this.getValidationState()}
 *        >
 *          <ControlLabel>Working example with validation</ControlLabel>
 *          <FormControl
 *            type="text"
 *            value={this.state.value}
 *            placeholder="Enter text"
 *            onChange={this.handleChange}
 *          />
 *          <FormControl.Feedback />
 *          <HelpBlock>Validation is based on string length.</HelpBlock>
 *        </FormGroup>
 *      </form>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<FormExample />, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `form-control`.
 * @property {'lg'|'large'|'sm'|'small'} bsSize - Component size variations.
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `input`.
 * @property {string} id - Uses `controlId` from `<FormGroup>` if not explicitly specified.
 * @property {func} inputRef - Attaches a ref to the `<input>` element. Only functions can be used here.
 * @property {string} type - Only relevant if `componentClass` is `'input'`.
 */
class FormControl extends React.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const {
      componentClass: Component,
      type,
      id = controlId,
      inputRef,
      className,
      bsSize,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || id === controlId,
      '`controlId` is ignored on `<FormControl>` when `id` is specified.'
    );

    // input[type="file"] should not have .form-control.
    let classes;
    if (type !== 'file') {
      classes = getClassSet(bsProps);
    }

    // If user provides a size, make sure to append it to classes as input-
    // e.g. if bsSize is small, it will append input-sm
    if (bsSize) {
      const size = SIZE_MAP[bsSize] || bsSize;
      classes[prefix({ bsClass: 'input' }, size)] = true;
    }

    return (
      <Component
        {...elementProps}
        type={type}
        id={id}
        ref={inputRef}
        className={classNames(className, classes)}
      />
    );
  }
}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

FormControl.Feedback = FormControlFeedback;
FormControl.Static = FormControlStatic;

export default bsClass('form-control',
  bsSizes([Size.SMALL, Size.LARGE], FormControl)
);
