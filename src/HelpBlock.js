import classNames from 'classnames';
import React from 'react';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

/**
 * # Displays help text if needed.
 * 
 * &nbsp;
 * ## Example
 * ```js
 *  <FormGroup controlId={id}>
 *     <ControlLabel>{label}</ControlLabel>
 *     <FormControl {...props} />
 *     {help && <HelpBlock>{help}</HelpBlock>}
 *   </FormGroup>
 * 
 * &nbsp;
 * ## props:
 * * `{string} bsClass` - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `help-block`.
 * ```
 */
class HelpBlock extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <span
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('help-block', HelpBlock);
