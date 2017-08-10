import createChainableTypeChecker from 'prop-types-extra/lib/utils/createChainableTypeChecker';
import some from '../../components/element-children/some';

/**
 * Used to ensure that a component has at least one child for each of the required bsRoles.
 * @param {Array} roles 
 */
export default function requiredRoles(...roles) {
  return createChainableTypeChecker((props, propName, component) => {
    let missing;

    roles.every(role => {
      if (!some(
        props.children, child => child.props.bsRole === role
      )) {
        missing = role;
        return false;
      }

      return true;
    });

    if (missing) {
      return new Error(
        `(children) ${component} - Missing a required child with bsRole: ` +
        `${missing}. ${component} must have at least one child of each of ` +
        `the following bsRoles: ${roles.join(', ')}`
      );
    }

    return null;
  });
}