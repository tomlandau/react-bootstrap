import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';
import { State } from './utils/StyleConfig';
import CloseButton from './CloseButton';

const propTypes = {
  onDismiss: PropTypes.func,
  closeLabel: PropTypes.string,
};

const defaultProps = {
  closeLabel: 'Close alert',
};

/**
 * # A React element that displays an alert.
 * The alert has a dismiss button, and can contain any React elements passed as children elements.
 * 
 * &nbsp;
 * ## Basic example
 * ```js
 * const alertInstance = (
 *  <Alert bsStyle="warning">
 *    <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
 *  </Alert>
 * );
 * 
 * ReactDOM.render(alertInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Closeable alerts
 * Just pass in a onDismiss function.
 * ```js
 * const AlertDismissable = React.createClass({
 *  getInitialState() {
 *    return {
 *      alertVisible: true
 *    };
 *  },
 * 
 *  render() {
 *    if (this.state.alertVisible) {
 *      return (
 *        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
 *          <h4>Oh snap! You got an error!</h4>
 *          <p>Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
 *          <p>
 *            <Button bsStyle="danger">Take this action</Button>
 *            <span> or </span>
 *            <Button onClick={this.handleAlertDismiss}>Hide Alert</Button>
 *          </p>
 *        </Alert>
 *      );
 *    }
 * 
 *    return (
 *      <Button onClick={this.handleAlertShow}>Show Alert</Button>
 *    );
 *  },
 * 
 *  handleAlertDismiss() {
 *    this.setState({alertVisible: false});
 *  },
 * 
 *  handleAlertShow() {
 *    this.setState({alertVisible: true});
 *  }
 * });
 * 
 * ReactDOM.render(<AlertDismissable />, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `alert`.
 * @property {'success'|'warning'|'danger'|'info'} bsStyle - Component visual or contextual style variants. Default is `info`.
 * @property {func} onDismiss - invoked when the dismiss button is clicked
 * @property {string} closeLabel - text for dismiss button. Default is `Close alert`.
 * @property {string} className - additional class name
 * @property children - inner React Elements to be rendered inside Alert
 * @bit 
 */
class Alert extends React.Component {
  render() {
    const { onDismiss, closeLabel, className, children, ...props } =
      this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const dismissable = !!onDismiss;
    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'dismissable')]: dismissable,
    };

    return (
      <div
        {...elementProps}
        role="alert"
        className={classNames(className, classes)}
      >
        {dismissable && (
          <CloseButton
            onClick={onDismiss}
            label={closeLabel}
          />
        )}
        {children}
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default bsStyles(Object.values(State), State.INFO,
  bsClass('alert', Alert)
);
