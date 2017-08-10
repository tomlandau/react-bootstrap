import classNames from 'classnames';
import React from 'react';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

/**
 * ## A simple shell for an `h1` to appropriately space out and segment sections of content on a page. It can utilize the `h1`’s default `small` element, as well as most other components (with additional styles).
 * 
 * @example
 * const pageHeaderInstance = (
 *   <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
 * );
 *
 * ReactDOM.render(pageHeaderInstance, mountNode);
 * @bit
 */

/**
 * @property {string} bsClass - Default: 'page-header'. Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component.
 */
class PageHeader extends React.Component {
  render() {
    const { className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      >
        <h1>
          {children}
        </h1>
      </div>
    );
  }
}

export default bsClass('page-header', PageHeader);
