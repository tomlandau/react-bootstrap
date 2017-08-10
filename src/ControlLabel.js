import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  htmlFor: PropTypes.string,
  srOnly: PropTypes.bool,
};

const defaultProps = {
  srOnly: false,
};

const contextTypes = {
  $bs_formGroup: PropTypes.object,
};

/**
 * # Using a `<ControlLabel>` as a label for a `<FormControl>` ensure accessibility.
 * For more info about `<FormControl>`, see [here](https://bitsrc.io/react-bootstrap/components/forms/forms-control).
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `control-label`.
 * @property {string} htmlFor - Uses `controlId` from `<FormGroup>` if not explicitly specified.
 * @property {bool} srOnly
 * @bit
 */
class ControlLabel extends React.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const { htmlFor = controlId, srOnly, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || htmlFor === controlId,
      '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.'
    );

    const classes = {
      ...getClassSet(bsProps),
      'sr-only': srOnly,
    };

    return (
      <label
        {...elementProps}
        htmlFor={htmlFor}
        className={classNames(className, classes)}
      />
    );
  }
}

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextTypes = contextTypes;

export default bsClass('control-label', ControlLabel);
