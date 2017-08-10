import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsPropsAndOmit} from './utils/splitBsProps';
import bsSizes from './utils/bsSizes';
import { Size } from './utils/StyleConfig';
import some from '../components/element-children/some';

const propTypes = {
  controlId: PropTypes.string,
  validationState: PropTypes.oneOf([
    'success', 'warning', 'error', null,
  ]),
};

const childContextTypes = {
  $bs_formGroup: PropTypes.object.isRequired,
};

/**
 * # The `<FormGroup>` component wraps a form control with proper spacing, along with support for a label, help text, and validation state.
 * To ensure accessibility, set `controlId` on `<FormGroup>`, and use [`<ControlLabel>`](https://bitsrc.io/react-bootstrap/components/forms/control-label) for the label.
 * 
 * &nbsp;
 * ## Example
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
 * &nbsp;
 * If your application contains a large number of form groups, we recommend building a higher-level component encapsulating a complete field group that renders the label, the control, and any other necessary components. We don't provide this out-of-the-box, because the composition of those field groups is too specific to an individual application to admit a good one-size-fits-all solution.
 * 
 * &nbsp;
 * ## Input sizes
 * Use bsSize on `<FormGroup>` to change the size of inputs. It also works with add-ons and most other options.
 * ```js
 * const formInstance = (
 *  <form>
 *    <FormGroup bsSize="large">
 *      <FormControl type="text" placeholder="Large text" />
 *    </FormGroup>
 *    <FormGroup>
 *      <FormControl type="text" placeholder="Normal text" />
 *    </FormGroup>
 *    <FormGroup bsSize="small">
 *      <FormControl type="text" placeholder="Small text" />
 *    </FormGroup>
 *  </form>
 * );
 * 
 * ReactDOM.render(formInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Validation states
 * Set `validationState` to one of `'success'`, `'warning'` or `'error'` to show validation state. Set `validationState` to `null` (or `undefined`) to hide validation state.
 * Add [`<FormControl.Feedback>`](https://bitsrc.io/react-bootstrap/components/forms/form-control-feedback) for a feedback icon when validation state is set.
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
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component.
 * @property {'lg'|'large'|'sm'|'small'} bsSize - Component size variations.
 * @property {string} controlId - Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
 * @property {'success'|'warning'|'error'|null} validationState
 */
class FormGroup extends React.Component {
  getChildContext() {
    const { controlId, validationState } = this.props;

    return {
      $bs_formGroup: {
        controlId,
        validationState
      },
    };
  }

  hasFeedback(children) {
    return some(children, child => (
      child.props.bsRole === 'feedback' ||
      child.props.children && this.hasFeedback(child.props.children)
    ));
  }

  render() {
    const { validationState, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['controlId']);

    const classes = {
      ...getClassSet(bsProps),
      'has-feedback': this.hasFeedback(children),
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      >
        {children}
      </div>
    );
  }
}

FormGroup.propTypes = propTypes;
FormGroup.childContextTypes = childContextTypes;

export default bsClass('form-group',
  bsSizes([Size.LARGE, Size.SMALL], FormGroup)
);
