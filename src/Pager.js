import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import PagerItem from './PagerItem';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import createChainedFunction from './utils/createChainedFunction';
import map from '../components/element-children/map/';

const propTypes = {
    /**
     * @property {func} onSelect
     */
  onSelect: PropTypes.func,
};

/**
 * Quick previous and next links.
 * 
 * &nbsp;
 * ## Centers by default
 * ```js
 * const pagerInstance = (
 *  <Pager>
 *    <Pager.Item href="#">Previous</Pager.Item>
 *    {' '}
 *    <Pager.Item href="#">Next</Pager.Item>
 *  </Pager>
 * );
 * 
 * ReactDOM.render(pagerInstance, mountNode);
 * ```
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `pager`.
 */
class Pager extends React.Component {
  render() {
    const { onSelect, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <ul
        {...elementProps}
        className={classNames(className, classes)}
      >
        {map(children, child => (
          cloneElement(child, {
            onSelect: createChainedFunction(child.props.onSelect, onSelect),
          })
        ))}
      </ul>
    );
  }
}

Pager.propTypes = propTypes;

Pager.Item = PagerItem;

export default bsClass('pager', Pager);
