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
  componentClass: 'div',
};

/**
 * # A caption for a `<Carousel>` component.
 * For more info about `<Carousel>`, see [here](https://bitsrc.io/react-bootstrap/react-bootstrap/carousels/carousel).
 * @bit
 */
class CarouselCaption extends React.Component {
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

CarouselCaption.propTypes = propTypes;
CarouselCaption.defaultProps = defaultProps;

export default bsClass('carousel-caption', CarouselCaption);
