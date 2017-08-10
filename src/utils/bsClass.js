import curry from './curry';
import PropTypes from 'prop-types';

/**
 * # Adds a default class to a component.
 * @name bsClass
 * @param {string} defaultClass
 * @param {object} Component
 * @returns {function}
 *
 */
export default bsClass = curry((defaultClass, Component) => {
  let propTypes = Component.propTypes || (Component.propTypes = {});
  let defaultProps = Component.defaultProps || (Component.defaultProps = {});

  propTypes.bsClass = PropTypes.string;
  defaultProps.bsClass = defaultClass;

  return Component;
});