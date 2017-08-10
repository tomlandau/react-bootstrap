/**
 * # Seperates between the component's bsProps and other props.
 * bsProps are: bsClass, bsSize, bsStyle, bsRole.
 *  @bit
 */

function getBsProps(props) {
  return {
    bsClass: props.bsClass,
    bsSize: props.bsSize,
    bsStyle: props.bsStyle,
    bsRole: props.bsRole,
  };
}

function isBsProp(propName) {
  return (
    propName === 'bsClass' ||
    propName === 'bsSize' ||
    propName === 'bsStyle' ||
    propName === 'bsRole'
  );
}

/**
 * @name splitBsProps
 * @description Splits props into two arrays, contained in a container array. 
 * First array is the bsProps, and the second is all the other props.
 * @param {object} props
 * @returns {Array}
 * @bit 
 */
export function splitBsProps(props) {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isBsProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}

/**
 * @name splitBsPropsAndOmit
 * @description Splits props into two arrays, contained in a container array. 
 * First array is the bsProps, and the second is all the other props, minus those that should be ommitted.
 * @param {object} props 
 * @param {Array} omittedPropNames
 * @returns {Array}
 * @bit 
 */
export function splitBsPropsAndOmit(props, omittedPropNames) {
  const isOmittedProp = {};
  omittedPropNames.forEach(propName => { isOmittedProp[propName] = true; });

  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isBsProp(propName) && !isOmittedProp[propName]) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}
