import {SIZE_MAP} from './StyleConfig';
import curry from './curry';
import PropTypes from 'prop-types';

/**
 * # Adds a bsSize prop to the component.
 * Returns the component with a bsSize prop that has a default value and a list of possible values.
 * @bit
 */

/**
 * @name bsSizes
 * @param {Array} sizes
 * @param {string} defaultSize
 * @param {object} Component
 * @returns {function}
 * @bit
 */
export default curry((sizes, defaultSize, Component) => {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  let existing = Component.SIZES || [];
  let propTypes = Component.propTypes || {};

  sizes.forEach(size => {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });

  const values = [];
  existing.forEach(size => {
    const mappedSize = SIZE_MAP[size];
    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  const propType = PropTypes.oneOf(values);
  propType._values = values;

  // expose the values on the propType function for documentation
  Component.SIZES = existing;

  Component.propTypes = {
    ...propTypes,
    bsSize: propType
  };

  if (defaultSize !== undefined) {
    if (!Component.defaultProps) {
      Component.defaultProps = {};
    }
    Component.defaultProps.bsSize = defaultSize;
  }

  return Component;
});