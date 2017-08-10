import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';


const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'p',
};

/**
 * # `<FormControl.Static>` renders static text.
 * @example
 * ```js
 *  <FormGroup>
 *    <ControlLabel>Static text</ControlLabel>
 *    <FormControl.Static>
 *      email@example.com
 *    </FormControl.Static>
 *  </FormGroup>
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `form-control-static`.
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `p`.
 */
class FormControlStatic extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

FormControlStatic.propTypes = propTypes;
FormControlStatic.defaultProps = defaultProps;

export default bsClass('form-control-static', FormControlStatic);
