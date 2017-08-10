import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

const propTypes = {
  glyph: PropTypes.string.isRequired,
};

/**
 * A glyph icon - use in buttons, button groups for a toolbar, navigation, or prepended form inputs.
 * @example
 * ```js
 * const glyphInstance = (
 * <div>
 *   <ButtonToolbar>
 *     <ButtonGroup>
 *       <Button><Glyphicon glyph="align-left" /></Button>
 *       <Button><Glyphicon glyph="align-center" /></Button>
 *       <Button><Glyphicon glyph="align-right" /></Button>
 *       <Button><Glyphicon glyph="align-justify" /></Button>
 *     </ButtonGroup>
 *   </ButtonToolbar>
 *   <ButtonToolbar>
 *     <ButtonGroup>
 *       <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button>
 *       <Button><Glyphicon glyph="star" /> Star</Button>
 *       <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button>
 *       <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button>
 *     </ButtonGroup>
 *   </ButtonToolbar>
 * </div>
 * );
 *
 * ReactDOM.render(glyphInstance, mountNode);
 * ```
 * @property {string:required} glyph - An icon name without "glyphicon-" prefix. See e.g. http://getbootstrap.com/components/#glyphicons. Required.
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `glyphicon`.
 */
class Glyphicon extends React.Component {
  render() {
    const { glyph, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, glyph)]: true,
    };

    return (
      <span
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Glyphicon.propTypes = propTypes;

export default bsClass('glyphicon', Glyphicon);
