import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Media from './Media';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

const propTypes = {
  /**
   * @property {'top'|'middle'|'bottom'} align - Align the media to the top, middle, or bottom of the media object.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

/**
 * # A right-aligned image alongside textual context.
 * @example
 * <Media>
 *   <Media.Right>
 *     <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *   </Media.Right>
 *   <Media.Body>
 *     <Media.Heading>Media Heading</Media.Heading>
 *     <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *   </Media.Body>
 * </Media>
 */
class MediaRight extends React.Component {
  render() {
    const { align, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-right-top`.
      classes[prefix(Media.defaultProps, align)] = true;
    }

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

MediaRight.propTypes = propTypes;

export default bsClass('media-right', MediaRight);
