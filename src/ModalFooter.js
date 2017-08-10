import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
};

/**
 * Represents the footer of a modal dialog. For more details, see [here](https://bitsrc.io/react-bootstrap/react-bootstrap/modals/modal).
 * 
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `div`.
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `modal-footer`.
 */
class ModalFooter extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

ModalFooter.propTypes = propTypes;
ModalFooter.defaultProps = defaultProps;

export default bsClass('modal-footer', ModalFooter);
