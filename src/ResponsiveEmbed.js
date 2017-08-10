import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

// TODO: This should probably take a single `aspectRatio` prop.

const propTypes = {
  /**
   * @property {element} children - This component requires a single child element
   */
  children: PropTypes.element.isRequired,
  /**
   * @property {bool} a16by9 - 16by9 aspect ratio. Default is `false`.
   */
  a16by9: PropTypes.bool,
  /**
   * @property {bool} a4by3 - 4by3 aspect ratio. Default is `false`.
   */
  a4by3: PropTypes.bool,
};

const defaultProps = {
  a16by9: false,
  a4by3: false,
};

/**
 * Allows browsers to determine video or slideshow dimensions based on the width of their containing block by creating an intrinsic ratio that will properly scale on any device.
 * You don't need to include `frameborder="0"` in your `iframe`s.
 * Either **16by9** or **4by3** aspect ratio via `a16by9` or `a4by3` attribute must be set.
 * @example
 * ```js
 * const responsiveEmbedInstance = (
 *  <div style={{width: 660, height: 'auto'}}>
 *    <ResponsiveEmbed a16by9>
 *      <embed type="image/svg+xml" src="/assets/TheresaKnott_castle.svg" />
 *    </ResponsiveEmbed>
 *  </div>
 * );
 * 
 * ReactDOM.render(responsiveEmbedInstance, mountNode);
 * ```
 */
class ResponsiveEmbed extends React.Component {
  render() {
    const { a16by9, a4by3, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      a16by9 || a4by3,
      'Either `a16by9` or `a4by3` must be set.'
    );
    warning(
      !(a16by9 && a4by3),
      'Only one of `a16by9` or `a4by3` can be set.'
    );

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, '16by9')]: a16by9,
      [prefix(bsProps, '4by3')]: a4by3,
    };

    return (
      <div className={classNames(classes)}>
        {cloneElement(children, {
          ...elementProps,
          className: classNames(className, prefix(bsProps, 'item')),
        })}
      </div>
    );
  }
}

ResponsiveEmbed.propTypes = propTypes;
ResponsiveEmbed.defaultProps = defaultProps;

export default bsClass('embed-responsive', ResponsiveEmbed);
