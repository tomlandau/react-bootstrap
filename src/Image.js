import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import prefix from './utils/prefix';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  /**
   * @property {bool} responsive - Sets image as responsive image
   */
  responsive: PropTypes.bool,

  /**
   * @property {bool} rounded - Sets image shape as rounded
   */
  rounded: PropTypes.bool,

  /**
   * @property {bool} circle - Sets image shape as circle
   */
  circle: PropTypes.bool,

  /**
   * @property {bool} thumbnail - Sets image shape as thumbnail
   */
  thumbnail: PropTypes.bool,
};

const defaultProps = {
  responsive: false,
  rounded: false,
  circle: false,
  thumbnail: false,
};

/**
 * # An image React component.
 * 
 * &nbsp;
 * ## Shape
 * Use the `rounded`, `circle` and `thumbnail` props to customise the image.
 * ```js
 * const imageShapeInstance = (
 *  <Grid>
 *    <Row>
 *      <Col xs={6} md={4}>
 *        <Image src="/assets/thumbnail.png" rounded />
 *      </Col>
 *      <Col xs={6} md={4}>
 *        <Image src="/assets/thumbnail.png" circle />
 *      </Col>
 *      <Col xs={6} md={4}>
 *        <Image src="/assets/thumbnail.png" thumbnail />
 *      </Col>
 *    </Row>
 *  </Grid>
 * );
 * 
 * ReactDOM.render(imageShapeInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Responsive
 * Use the `responsive` to scale image nicely to the parent element.
 * ```js
 * const imageResponsiveInstance = (
 *  <Image src="/assets/thumbnail.png" responsive />
 * );
 *
 * ReactDOM.render(imageResponsiveInstance, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `img`.
 */
class Image extends React.Component {
  render() {
    const { responsive, rounded, circle, thumbnail, className, ...props } =
      this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      [prefix(bsProps, 'responsive')]: responsive,
      [prefix(bsProps, 'rounded')]: rounded,
      [prefix(bsProps, 'circle')]: circle,
      [prefix(bsProps, 'thumbnail')]: thumbnail,
    };

    return (
      <img
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default bsClass('img', Image);
