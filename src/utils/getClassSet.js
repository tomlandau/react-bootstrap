import {SIZE_MAP} from './StyleConfig';
import prefix from './prefix';

/**
 * # Gets a class set according to the props.
 * @bit 
 */

/**
 * @bit
 * @name getClassSet
 * @param {object} props
 * @returns {object}
 * @example
 * ```js
 * { bsClass: 'btn', bsStyle: 'primary' } => { btn: true, 'btn-primary': true }
 * getClassSet({ bsClass: 'btn', bsSize: 'large' }) => { btn: true, 'btn-lg': true }
 * getClassSet({ bsClass: 'btn', bsSize: 'lg', bsStyle: 'primary' } => { btn: true, 'btn-lg': true, 'btn-primary': true }
 * ```
 */
export default (props) => {
  const classes = {
    [prefix(props)]: true,
  };

  if (props.bsSize) {
    const bsSize = SIZE_MAP[props.bsSize] || props.bsSize;
    classes[prefix(props, bsSize)] = true;
  }

  if (props.bsStyle) {
    classes[prefix(props, props.bsStyle)] = true;
  }

  return classes;
}