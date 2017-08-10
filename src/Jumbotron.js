import React from 'react';
import classNames from 'classnames';
import elementType from 'prop-types-extra/lib/elementType';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  /**
   * @property {elementType} componentClass - Default: 'div'. You can use a custom element type for this component.
   */
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
};

/**
 * ## A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.
 * 
 * @example
 * const jumbotronInstance = (
 *  <Jumbotron>
 *    <h1>Hello, world!</h1>
 *    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
 *    <p><Button bsStyle="primary">Learn more</Button></p>
 *  </Jumbotron>
 * );
 *
 * ReactDOM.render(jumbotronInstance, mountNode);
 * @bit
 */
class Jumbotron extends React.Component {
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

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default bsClass('jumbotron', Jumbotron);
