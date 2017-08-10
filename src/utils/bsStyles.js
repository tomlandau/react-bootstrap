import PropTypes from 'prop-types';
import curry from './curry';

/**
 * # Adds a bsStyle prop to the component.
 * Returns the component with a bsStyle prop that has a default value and a list of possible values.
 */

/**
 * @param {Array} styles
 * @param {string} defaultStyle
 * @param {object} Component
 * @returns {object}
 *
 */
export default curry((styles, defaultStyle, Component) => {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  let existing = Component.STYLES || [];
  let propTypes = Component.propTypes || {};

  styles.forEach(style => {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  let propType = PropTypes.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = propType._values = existing;

  Component.propTypes = {
    ...propTypes,
    bsStyle: propType
  };

  if (defaultStyle !== undefined) {
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});