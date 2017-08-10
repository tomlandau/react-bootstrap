import createChainableTypeChecker
  from 'prop-types-extra/lib/utils/createChainableTypeChecker';

import filter from '../../components/element-children/filter';

/**
 * Used to ensure that a component has no more than a single child for each of the exclusive bsRoles.
 * @param {Array} roles 
 */
export default function exclusiveRoles(...roles) {
  return createChainableTypeChecker((props, propName, component) => {
    let duplicate;

    roles.every(role => {
      const childrenWithRole = filter(
        props.children, child => child.props.bsRole === role
      );

      if (childrenWithRole.length > 1) {
        duplicate = role;
        return false;
      }

      return true;
    });

    if (duplicate) {
      return new Error(
        `(children) ${component} - Duplicate children detected of bsRole: ` +
        `${duplicate}. Only one child each allowed with the following ` +
        `bsRoles: ${roles.join(', ')}`
      );
    }

    return null;
  });
}
