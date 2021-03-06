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
  componentClass: 'h4',
};

/**
 * # Represents the heading of a `<Media>` component.
 * Contained inside a `<Media.Body>` component.
 * @example
 * <Media>
 *   <Media.Left>
 *     <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *   </Media.Left>
 *   <Media.Body>
 *     <Media.Heading>Media Heading</Media.Heading>
 *     <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *   </Media.Body>
 * </Media>
 */
class MediaHeading extends React.Component {
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

MediaHeading.propTypes = propTypes;
MediaHeading.defaultProps = defaultProps;

export default bsClass('media-heading', MediaHeading);
