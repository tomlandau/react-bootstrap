import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import BaseOverlay from 'react-overlays/lib/Overlay';
import elementType from 'prop-types-extra/lib/elementType';

import Fade from './Fade';

const propTypes = {
  ...BaseOverlay.propTypes,

  /**
   * @property {boolean} show - Default: 'false' - Set the visibility of the Overlay
   */
  show: PropTypes.bool,
  /**
   * @property {boolean} rootClose - Default: false - Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: PropTypes.bool,
  /**
   * @property {function} onHide - A callback invoked by the overlay when it wishes to be hidden. Required if `rootClose` is specified.
   */
  onHide: PropTypes.func,

  /**
   * @property {boolean | elementType} animation - Default: fade - Use animation
   */
  animation: PropTypes.oneOfType([
    PropTypes.bool, elementType,
  ]),

  /**
   * @property {function} onEnter - Callback fired before the Overlay transitions in
   */
  onEnter: PropTypes.func,

  /**
   * @property {function} onEntering - Callback fired as the Overlay begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * @property {function} onEntered - Callback fired after the Overlay finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * @property {function} onExit - Callback fired right before the Overlay transitions out
   */
  onExit: PropTypes.func,

  /**
   * @property {function} onExiting - Callback fired as the Overlay begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * @property {function} onExited - Callback fired after the Overlay finishes transitioning out
   */
  onExited: PropTypes.func,

  /**
   * @property {'top' | 'right' | 'bottom' | 'left'} placement - Default: 'right'. Sets the direction of the Overlay.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

const defaultProps = {
  animation: Fade,
  rootClose: false,
  show: false,
  placement: 'right',
};

/**
 * ## The `OverlayTrigger` component is great for most use cases, but as a higher level abstraction it can lack the flexibility needed to build more nuanced or custom behaviors into your `Overlay` components. For these cases it can be helpful to forgo the trigger and use the `Overlay` component directly.
 * 
 * ## Basic example:
 * ```js
 * const Example = React.createClass({
 *  getInitialState() {
 *   return { show: true };
 * },
 *
 * toggle() {
 *   this.setState({ show: !this.state.show });
 * },
 *
 * render() {
 *   const sharedProps = {
 *     show: this.state.show,
 *     container: this,
 *     target: () => ReactDOM.findDOMNode(this.refs.target)
 *   };
 *
 *   return (
 *     <div style={{ height: 100, paddingLeft: 150, position: 'relative' }}>
 *       <Button ref="target" onClick={this.toggle}>
 *         Click me!
 *       </Button>
 *
 *       <Overlay {...sharedProps} placement="left">
 *         <Tooltip id="overload-left">Tooltip overload!</Tooltip>
 *       </Overlay>
 *       <Overlay {...sharedProps} placement="top">
 *         <Tooltip id="overload-top">Tooltip overload!</Tooltip>
 *       </Overlay>
 *       <Overlay {...sharedProps} placement="right">
 *         <Tooltip id="overload-right">Tooltip overload!</Tooltip>
 *       </Overlay>
 *       <Overlay {...sharedProps} placement="bottom">
 *         <Tooltip id="overload-bottom">Tooltip overload!</Tooltip>
 *       </Overlay>
 *     </div>
 *   );
 *  }
 * });
 *
 * ReactDOM.render(<Example/>, mountNode);
 * ```
 * 
 * ## Use Overlay instead of Tooltip and Popover:
 * You don't need to use the provided `Tooltip` or `Popover` components. Creating custom overlays is as easy as wrapping some markup in an `Overlay` component.
 * ```js
 * const CustomPopover = React.createClass({
 * render() {
 *   return (
 *     <div
 *       style={{
 *         ...this.props.style,
 *         position: 'absolute',
 *         backgroundColor: '#EEE',
 *         boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
 *         border: '1px solid #CCC',
 *         borderRadius: 3,
 *         marginLeft: -5,
 *         marginTop: 5,
 *         padding: 10,
 *       }}
 *     >
 *       <strong>Holy guacamole!</strong> Check this info.
 *     </div>
 *   );
 * },
 * });
 *
 * const Example = React.createClass({
 *  getInitialState() {
 *   return { show: true };
 * },
 *
 * toggle() {
 *   this.setState({ show: !this.state.show });
 * },
 *
 * render() {
 *   return (
 *     <div style={{ height: 100, position: 'relative' }}>
 *       <Button ref="target" onClick={this.toggle}>
 *         I am an Overlay target
 *       </Button>
 *
 *       <Overlay
 *         show={this.state.show}
 *         onHide={() => this.setState({ show: false })}
 *         placement="right"
 *         container={this}
 *         target={() => ReactDOM.findDOMNode(this.refs.target)}
 *       >
 *         <CustomPopover />
 *       </Overlay>
 *     </div>
 *   );
 *  },
 * });
 *
 * ReactDOM.render(<Example />, mountNode);
 * ```
 * 
 * 
 * @bit
 */
class Overlay extends React.Component {
  render() {
    const { animation, children, ...props } = this.props;

    const transition = animation === true ? Fade : animation || null;

    let child;

    if (!transition) {
      child = cloneElement(children, {
        className: classNames(children.props.className, 'in'),
      });
    } else {
      child = children;
    }

    return (
      <BaseOverlay
        {...props}
        transition={transition}
      >
        {child}
      </BaseOverlay>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
