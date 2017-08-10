import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  /**
   * @property {bool} active - If set to true, renders `span` instead of `a`.
   */
  active: PropTypes.bool,
  /**
   * @property {string} href - `href` attribute for the inner `a` element.
   */
  href: PropTypes.string,
  /**
   * @property {string} title - `title` attribute for the inner `a` element.
   */
  title: PropTypes.node,
  /**
   * @property {string} target - `target` attribute for the inner `a` element.
   */
  target: PropTypes.string,
};

const defaultProps = {
  active: false,
};

/**
 * # A react component that represents a single breadcrumb item, part of a breadcrumbs navigation.
 * Breadcrumbs are used to indicate the current page's location. Add `active` attribute to active `Breadcrumb.Item`.
 * Do not set both `active` and `href` attributes. `active` overrides `href` and `span` element is rendered instead of `a`.
 * 
 * @example
 * ```js
 * const breadcrumbInstance = (
 *  <Breadcrumb>
 *    <Breadcrumb.Item href="#">
 *      Home
 *    </Breadcrumb.Item>
 *    <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
 *      Library
 *    </Breadcrumb.Item>
 *    <Breadcrumb.Item active>
 *      Data
 *    </Breadcrumb.Item>
 *  </Breadcrumb>
 * );
 *
 * ReactDOM.render(breadcrumbInstance, mountNode);
 * ```
 */
class BreadcrumbItem extends React.Component {
  render() {
    const { active, href, title, target, className, ...props } = this.props;

    // Don't try to render these props on non-active <span>.
    const linkProps = { href, title, target };

    return (
      <li className={classNames(className, { active })}>
        {active ?
          <span {...props} /> :
          <SafeAnchor {...props} {...linkProps} />
        }
      </li>
    );
  }
}

BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
