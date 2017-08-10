import invariant from 'invariant';

/**
 * # Prefixes a variant with the bsClass.
 * If there's no variant, returns the bsClass.
 * @bit
 */

/**
 * @bit
 * @name prefix
 * @param {object} props
 * @param {string} variant
 * @returns {string}
 */
export default function prefix(props, variant) {
  invariant(
    props.bsClass != null,
    'A `bsClass` prop is required for this component'
  );
  return props.bsClass + (variant ? `-${variant}` : '');
}