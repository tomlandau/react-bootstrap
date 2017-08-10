import bsStyles from './bsStyles';

/**
 * Add a style variant to a Component. Mutates the propTypes of the component
 * in order to validate the new variant.
 * @bit
 */
export function addStyle(Component, ...styleVariant) {
  bsStyles(styleVariant, Component);
}