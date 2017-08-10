import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';
import bsSizes from './utils/bsSizes';
import { Size } from './utils/StyleConfig';

const propTypes = {
  /**
   * @property {string} dialogClassName - A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: PropTypes.string,
};

/**
 * Represents the dialog part of a modal dialog. For more details, see [here](https://bitsrc.io/react-bootstrap/react-bootstrap/modals/modal).
 */
class ModalDialog extends React.Component {
  render() {
    const { dialogClassName, className, style, children, ...props } =
      this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const bsClassName = prefix(bsProps);

    const modalStyle = { display: 'block', ...style };

    const dialogClasses = {
      ...getClassSet(bsProps),
      [bsClassName]: false,
      [prefix(bsProps, 'dialog')]: true,
    };

    return (
      <div
        {...elementProps}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(className, bsClassName)}
      >
        <div className={classNames(dialogClassName, dialogClasses)}>
          <div className={prefix(bsProps, 'content')} role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = propTypes;

export default bsClass('modal',
  bsSizes([Size.LARGE, Size.SMALL], ModalDialog)
);
