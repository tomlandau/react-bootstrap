import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import setBsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

import { State } from './utils/StyleConfig';
import map from '../components/element-children/map';

const ROUND_PRECISION = 1000;

/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */
function onlyProgressBar(props, propName, componentName) {
  const children = props[propName];
  if (!children) {
    return null;
  }

  let error = null;

  React.Children.forEach(children, child => {
    if (error) {
      return;
    }

    if (child.type === ProgressBar) { // eslint-disable-line no-use-before-define
      return;
    }

    const childIdentifier = React.isValidElement(child) ?
      child.type.displayName || child.type.name || child.type :
      child;
    error = new Error(
      `Children of ${componentName} can contain only ProgressBar ` +
      `components. Found ${childIdentifier}.`
    );
  });

  return error;
}

const propTypes = {

  /**
   * @property {number} min - Default: 0
   */
  min: PropTypes.number,

  /**
   * @property {number} now
   */
  now: PropTypes.number,

  /**
   * @property {number} max - Default: 100
   */
  max: PropTypes.number,

  /**
   * @property {node} label
   */
  label: PropTypes.node,

  /**
   * @property {boolean} srOnly - Default: false
   */
  srOnly: PropTypes.bool,

  /**
   * @property {boolean} striped - Default: false
   */
  striped: PropTypes.bool,

  /**
   * @property {boolean} active - Default: false
   */
  active: PropTypes.bool,

  /**
   * @property {onlyProgressBar} children
   */
  children: onlyProgressBar,

  /*
   * @private
   */
  isChild: PropTypes.bool,
};

const defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}


/**
 * ## Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.
 * 
 * ## Basic example:
 * Default progress bar.
 * ```js
 * const progressInstance = (
 *   <ProgressBar now={60} />
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * ## With label:
 * Add a `label` prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label's text is fully visible.
 * ```js
 * const now = 60;
 *
 * const progressInstance = (
 *   <ProgressBar now={now} label={`${now}%`} />
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * ## Screenreader only label:
 * Add a `srOnly` prop to hide the label visually.
 * ```js
 * const now = 60;
 *
 * const progressInstance = (
 *   <ProgressBar now={now} label={`${now}%`} srOnly />
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * ## Contextual alternatives:
 * Progress bars use some of the same button and alert classes for consistent styles.
 * ```js
 * const progressInstance = (
 *  <div>
 *    <ProgressBar bsStyle="success" now={40} />
 *    <ProgressBar bsStyle="info" now={20} />
 *    <ProgressBar bsStyle="warning" now={60} />
 *    <ProgressBar bsStyle="danger" now={80} />
 *  </div>
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * ## Striped:
 * Uses a gradient to create a striped effect. Not available in IE8.
 * ```js
 * const progressInstance = (
 *  <div>
 *    <ProgressBar striped bsStyle="success" now={40} />
 *    <ProgressBar striped bsStyle="info" now={20} />
 *    <ProgressBar striped bsStyle="warning" now={60} />
 *    <ProgressBar striped bsStyle="danger" now={80} />
 *  </div>
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * ## Animated:
 * Add `active` prop to animate the stripes right to left. Not available in IE9 and below.
 * ```js
 * const progressInstance = (
 *   <ProgressBar active now={45} />
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * ## Stacked
 * Nest `<ProgressBar />`s to stack them.
 * ```js
 * const progressInstance = (
 *  <ProgressBar>
 *    <ProgressBar striped bsStyle="success" now={35} key={1} />
 *    <ProgressBar bsStyle="warning" now={20} key={2} />
 *    <ProgressBar active bsStyle="danger" now={10} key={3} />
 *  </ProgressBar>
 * );
 *
 * ReactDOM.render(progressInstance, mountNode);
 * ```
 * 
 * @bit
 */

 /**
  * @property {string} bsClass - Default: 'progress-bar'. Base CSS class and prefix for the component. Generally one should only change bsClass to provide new, non-Bootstrap, CSS styles for a component.
  * @property {"success" | "warning" | "danger" | "info"} bsStyle - Component visual or contextual style variants.
  */
class ProgressBar extends React.Component {
  renderProgressBar({
    min, now, max, label, srOnly, striped, active, className, style, ...props
  }) {
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      [prefix(bsProps, 'striped')]: active || striped,
    };

    return (
      <div
        {...elementProps}
        role="progressbar"
        className={classNames(className, classes)}
        style={{ width: `${getPercentage(now, min, max)}%`, ...style }}
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {srOnly ? <span className="sr-only">{label}</span> : label}
      </div>
    );
  }

  render() {
    const { isChild, ...props } = this.props;

    if (isChild) {
      return this.renderProgressBar(props);
    }

    const {
      min,
      now,
      max,
      label,
      srOnly,
      striped,
      active,
      bsClass,
      bsStyle,
      className,
      children,
      ...wrapperProps
    } = props;

    return (
      <div
        {...wrapperProps}
        className={classNames(className, 'progress')}
      >
        {children ?
          map(children, child => (
            cloneElement(child, { isChild: true }
          ))) :
          this.renderProgressBar({
            min, now, max, label, srOnly, striped, active, bsClass, bsStyle,
          })
        }
      </div>
    );
  }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default setBsClass('progress-bar',
  bsStyles(Object.values(State), ProgressBar)
);
