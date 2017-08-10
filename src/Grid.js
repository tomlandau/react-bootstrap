import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import bsClass from './utils/bsClass';
import prefix from './utils/prefix';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  fluid: PropTypes.bool,
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
  fluid: false,
};

/**
 * # `<Grid>` is a grid layout React component.
 * @example
 * ```js
 * const gridInstance = (
 *  <Grid>
 *    <Row className="show-grid">
 *      <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
 *      <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
 *    </Row>
​ * 
 *    <Row className="show-grid">
 *      <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
 *      <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
 *      <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
 *    </Row>
​ * 
 *    <Row className="show-grid">
 *      <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
 *    </Row>
​ * 
 *    <Row className="show-grid">
 *      <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
 *      <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
 *    </Row>
 *  </Grid>
 * );
​ * 
 * ReactDOM.render(gridInstance, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `container`.
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `div`.
 * @property {bool} fluid - Turn any fixed-width grid layout into a full-width layout by this property. Adds `container-fluid` class. Default is `false`.
 * @bit
 */
class Grid extends React.Component {
  render() {
    const { fluid, componentClass: Component, className, ...props } =
      this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = prefix(bsProps, fluid && 'fluid');

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default bsClass('container', Grid);
