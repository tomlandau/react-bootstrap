import classNames from 'classnames';
import React from 'react';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

/**
 * A button that can accompany a `<FormControl>`, to be used when wrapped by `<InputGroup>`.
 * @example
 *   <FormGroup>
 *     <InputGroup>
 *       <InputGroup.Button>
 *         <Button>Before</Button>
 *       </InputGroup.Button>
 *       <FormControl type="text" />
 *     </InputGroup>
 *   </FormGroup>
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `input-group-button`.
 */
class InputGroupButton extends React.Component {
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

export default bsClass('input-group-btn', InputGroupButton);
