import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import capitalize from './utils/capitalize';
import { DEVICE_SIZES } from './utils/StyleConfig';

const propTypes = {
  componentClass: elementType,
  visibleXsBlock: PropTypes.bool,
  visibleSmBlock: PropTypes.bool,
  visibleMdBlock: PropTypes.bool,
  visibleLgBlock: PropTypes.bool,
};

const defaultProps = {
  componentClass: 'div',
};

/**
 * When a `<Grid>`'s columns won't clear correctly, introduce `Clearfix`.
 * Set the `Clearfix` to visible for the viewports with issue, so that columns clear correctly.
 * For more info about `<Grid>`, see [here](https://bitsrc.io/react-bootstrap/components/grid/grid).
 * 
 * @example
 * ```js
 * const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];
 *
 * const gridInstance = (
 *  <Grid>
 *    <Row className="show-grid">
 *      <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}</Col>
 *      <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 4).join(' ')}</Col>
 *      <Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
 *      <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}</Col>
 *      <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 2).join(' ')}</Col>
 *    </Row>
 *  </Grid>
 * );
 * 
 * ReactDOM.render(gridInstance, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `clearfix`.
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `div`.
 * @property {bool} visibleLgBlock - Apply clearfix on Large devices Desktops. Adds class `visible-lg-block`.
 * @property {bool} visibleMdBlock - Apply clearfix on Medium devices Desktops. Adds class `visible-md-block`.
 * @property {bool} visibleSmBlock - Apply clearfix on Small devices Desktops. Adds class `visible-sm-block`.
 * @property {bool} visibleXsBlock - Apply clearfix on Extra small devices Desktops. Adds class `visible-xs-block`.
 */
class Clearfix extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    DEVICE_SIZES.forEach(size => {
      const propName = `visible${capitalize(size)}Block`;
      if (elementProps[propName]) {
        classes[`visible-${size}-block`] = true;
      }

      delete elementProps[propName];
    });

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Clearfix.propTypes = propTypes;
Clearfix.defaultProps = defaultProps;

export default bsClass('clearfix', Clearfix);
