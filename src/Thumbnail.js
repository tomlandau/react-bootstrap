import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  /**
   * @property {string} src - src property that is passed down to the image inside this component
   */
  src: PropTypes.string,
  /**
   * @property {string} alt - alt property that is passed down to the image inside this component
   */
  alt: PropTypes.string,
  /**
   * @property {string} href - href property that is passed down to the image inside this component
   */
  href: PropTypes.string,
  /**
   * @property {func} onError - onError callback that is passed down to the image inside this component
   */
  onError: PropTypes.func,
  /**
   * @property {func} onLoad - onLoad callback that is passed down to the image inside this component
   */
  onLoad: PropTypes.func
};

/**
 * # Thumbnails are designed to showcase linked images with minimal required markup. 
 * You can extend the grid component with thumbnails.
 * 
 * &nbsp;
 * ## Anchor Thumbnail
 * Creates an anchor wrapping an image.
 * ```js
 * const thumbnailInstance = (
 *  <Grid>
 *    <Row>
 *      <Col xs={6} md={3}>
 *        <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
 *      </Col>
 *      <Col xs={6} md={3}>
 *        <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
 *      </Col>
 *      <Col xs={6} md={3}>
 *        <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
 *      </Col>
 *    </Row>
 *  </Grid>
 * );
 * 
 * ReactDOM.render(thumbnailInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Divider Thumbnail
 * Creates a divider wrapping an image and other children elements.
 * ```js
 * const thumbnailInstance = (
 *  <Grid>
 *    <Row>
 *    <Col xs={6} md={4}>
 *      <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
 *        <h3>Thumbnail label</h3>
 *        <p>Description</p>
 *        <p>
 *          <Button bsStyle="primary">Button</Button>&nbsp;
 *          <Button bsStyle="default">Button</Button>
 *        </p>
 *      </Thumbnail>
 *    </Col>
 *    <Col xs={6} md={4}>
 *      <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
 *        <h3>Thumbnail label</h3>
 *        <p>Description</p>
 *        <p>
 *          <Button bsStyle="primary">Button</Button>&nbsp;
 *          <Button bsStyle="default">Button</Button>
 *        </p>
 *      </Thumbnail>
 *    </Col>
 *    <Col xs={6} md={4}>
 *      <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
 *        <h3>Thumbnail label</h3>
 *        <p>Description</p>
 *        <p>
 *          <Button bsStyle="primary">Button</Button>&nbsp;
 *          <Button bsStyle="default">Button</Button>
 *        </p>
 *      </Thumbnail>
 *    </Col>
 *    </Row>
 *  </Grid>
 * );
 * 
 * ReactDOM.render(thumbnailInstance, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `thumbnail`.
 */
class Thumbnail extends React.Component {
  render() {
    const { src, alt, onError, onLoad, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const Component = elementProps.href ? SafeAnchor : 'div';
    const classes = getClassSet(bsProps);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      >
        <img {...{src, alt, onError, onLoad}} />

        {children && (
          <div className="caption">
            {children}
          </div>
        )}
      </Component>
    );
  }
}

Thumbnail.propTypes = propTypes;

export default bsClass('thumbnail', Thumbnail);
