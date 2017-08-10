import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from './Glyphicon';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

const defaultProps = {
  bsRole: 'feedback',
};

const contextTypes = {
  $bs_formGroup: PropTypes.object,
};

/**
 * # <FormControl.Feedback> allows you to display a feedback icon when validation state is set on a `<FormGroup>`.
 * @example
 * ```js
 * <Form componentClass="fieldset" horizontal>
 *      <FormGroup controlId="formValidationError3" validationState="error">
 *        <Col componentClass={ControlLabel} xs={3}>
 *          Input with error
 *        </Col>
 *        <Col xs={9}>
 *          <FormControl type="text" />
 *          <FormControl.Feedback />
 *        </Col>
 *      </FormGroup>
 * 
 *      <FormGroup controlId="formValidationSuccess4" validationState="success">
 *        <Col componentClass={ControlLabel} xs={3}>
 *          Input group with success
 *        </Col>
 *        <Col xs={9}>
 *          <InputGroup>
 *            <InputGroup.Addon>@</InputGroup.Addon>
 *            <FormControl type="text" />
 *          </InputGroup>
 *          <FormControl.Feedback />
 *        </Col>
 *      </FormGroup>
 *    </Form>
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `orm-control-feedback`.
 */
class FormControlFeedback extends React.Component {
  getGlyph(validationState) {
    switch (validationState) {
      case 'success': return 'ok';
      case 'warning': return 'warning-sign';
      case 'error': return 'remove';
      default: return null;
    }
  }

  renderDefaultFeedback(formGroup, className, classes, elementProps) {
    const glyph = this.getGlyph(formGroup && formGroup.validationState);
    if (!glyph) {
      return null;
    }

    return (
      <Glyphicon
        {...elementProps}
        glyph={glyph}
        className={classNames(className, classes)}
      />
    );
  }

  render() {
    const { className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    if (!children) {
      return this.renderDefaultFeedback(
        this.context.$bs_formGroup, className, classes, elementProps
      );
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ...elementProps,
      className: classNames(child.props.className, className, classes),
    });
  }
}

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

export default bsClass('form-control-feedback', FormControlFeedback);
