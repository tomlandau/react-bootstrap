import classNames from 'classnames';
import React from 'react';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import bsSizes from './utils/bsSizes';
import { Size } from './utils/StyleConfig';

/**
 * ## Use the well as a simple effect on an element to give it an inset effect.
 * 
 * ## Example:
 * ```js
 * const wellInstance = (
 *  <Well>Look I'm in a well!</Well>
 * );
 *
 * ReactDOM.render(wellInstance, mountNode);
 * ```
 * 
 * ## Optional classes:
 * Control padding and rounded corners with two optional modifier classes.
 * ```js
 * const wellInstance = (
 *  <div>
 *    <Well bsSize="large">Look I'm in a large well!</Well>
 *    <Well bsSize="small">Look I'm in a small well!</Well>
 *  </div>
 * );
 *
 * ReactDOM.render(wellInstance, mountNode);
 * ```
 * @bit
 */

 /**
  * @property {string} bsClass - Default: 'well'. Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component.
  * @property {"lg" | "large" | "sm" | "small"} bsSize - Component size variations.
  */
class Well extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('well',
  bsSizes([Size.LARGE, Size.SMALL], Well)
);
