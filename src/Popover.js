import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

const propTypes = {
  /**
   * @property {string} id - (Required) An html id attribute, necessary for accessibility
   */
  id: isRequiredForA11y(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ])),

  /**
   * @property {'top'|'right'|'bottom'|'left'} placement - Default: 'right'.Sets the direction the Popover is positioned towards.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * @property {number | string} positionTop - The "top" position value for the Popover.
   */
  positionTop: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
  /**
   * @property {number | string} positionLeft - The "left" position value for the Popover.
   */
  positionLeft: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),

  /**
   * @property {number | string} arrowOffsetTop - The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
  /**
   * @property {number | string} arrowOffsetLeft - The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),

  /*
   * @property {node} title - Title content
   */
  title: PropTypes.node,
};

const defaultProps = {
  placement: 'right',
};

/**
 * ## The Popover, offers a more robust alternative to the Tooltip for displaying overlays of content.
 * 
 * ## Basic example:
 * Attach and position tooltips with OverlayTrigger.
 * ```js
 * ReactDOM.render((
 *  <div style={{ height: 120 }}>
 *   <Popover
 *     id="popover-basic"
 *     placement="right"
 *     positionLeft={200}
 *     positionTop={50}
 *     title="Popover right"
 *   >
 *     And here's some <strong>amazing</strong> content. It's very engaging. right?
 *   </Popover>
 *  </div>
 * ), mountNode);
 * ```
 * 
 * ## With OverlayTrigger
 * The Popover component, like the Tooltip can be used with an OverlayTrigger Component, and positioned around it.
 * ```js
 * const popoverLeft = (
 *  <Popover id="popover-positioned-left" title="Popover left">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverTop = (
 *  <Popover id="popover-positioned-top" title="Popover top">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverBottom = (
 *  <Popover id="popover-positioned-bottom" title="Popover bottom">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverRight = (
 *  <Popover id="popover-positioned-right" title="Popover right">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * ReactDOM.render((
 *  <ButtonToolbar>
 *   <OverlayTrigger trigger="click" placement="left" overlay={popoverLeft}>
 *     <Button>Holy guacamole!</Button>
 *   </OverlayTrigger>
 *   <OverlayTrigger trigger="click" placement="top" overlay={popoverTop}>
 *     <Button>Holy guacamole!</Button>
 *   </OverlayTrigger>
 *   <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
 *     <Button>Holy guacamole!</Button>
 *   </OverlayTrigger>
 *   <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
 *     <Button>Holy guacamole!</Button>
 *   </OverlayTrigger>
 *  </ButtonToolbar>
 * ), mountNode);
 * ```
 * 
 * ## Trigger behaviors:
 * It's inadvisable to use `"hover"` or `"focus"` triggers for popovers, because they have poor accessibility from keyboard and on mobile devices.
 * ```js
 * const popoverClick = (
 *  <Popover id="popover-trigger-click" title="Popover bottom">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverHoverFocus = (
 *  <Popover id="popover-trigger-hover-focus" title="Popover bottom">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverFocus = (
 *  <Popover id="popover-trigger-focus" title="Popover bottom">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverClickRootClose = (
 *  <Popover id="popover-trigger-click-root-close" title="Popover bottom">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * ReactDOM.render((
 *  <ButtonToolbar>
 *   <OverlayTrigger trigger="click" placement="bottom" overlay={popoverClick}>
 *     <Button>Click</Button>
 *   </OverlayTrigger>
 *   <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
 *     <Button>Hover + Focus</Button>
 *   </OverlayTrigger>
 *   <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
 *     <Button>Focus</Button>
 *   </OverlayTrigger>
 *   <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
 *     <Button>Click w/rootClose</Button>
 *   </OverlayTrigger>
 *  </ButtonToolbar>
 * ), mountNode);
 * ```
 * 
 * ## Popover component in container:
 * Specify `container` to control the DOM element to which to append the overlay. This element must be a positioned element to allow correctly positioning the overlay.
 * ```js
 * class Example extends React.Component {
 * constructor(props, context) {
 *   super(props, context);
 *
 *   this.handleClick = e => {
 *     this.setState({ target: e.target, show: !this.state.show });
 *   };
 *
 *   this.state = { show: false };
 * }
 *
 * render() {
 *   return (
 *     <ButtonToolbar>
 *       <Button onClick={this.handleClick}>
 *         Holy guacamole!
 *       </Button>
 *
 *       <Overlay
 *         show={this.state.show}
 *         target={this.state.target}
 *         placement="bottom"
 *         container={this}
 *         containerPadding={20}
 *       >
 *         <Popover id="popover-contained" title="Popover bottom">
 *           <strong>Holy guacamole!</strong> Check this info.
 *         </Popover>
 *       </Overlay>
 *     </ButtonToolbar>
 *   );
 *  }
 * }
 *
 * ReactDOM.render(<Example />, mountNode);
 * ```
 * 
 * ## Positioned popover components in scrolling container:
 * ```js
 * const popoverLeft = (
 *  <Popover id="popover-positioned-scrolling-left" title="Popover left">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverTop = (
 *  <Popover id="popover-positioned-scrolling-top" title="Popover top">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverBottom = (
 *  <Popover id="popover-positioned-scrolling-bottom" title="Popover bottom">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * const popoverRight = (
 *  <Popover id="popover-positioned-scrolling-right" title="Popover right">
 *   <strong>Holy guacamole!</strong> Check this info.
 *  </Popover>
 * );
 *
 * class Positioner extends React.Component {
 * render() {
 *   return (
 *     <ButtonToolbar style={{ padding: '100px 0' }}>
 *       <OverlayTrigger container={this} trigger="click" placement="left" overlay={popoverLeft}>
 *         <Button>Holy guacamole!</Button>
 *       </OverlayTrigger>
 *       <OverlayTrigger container={this} trigger="click" placement="top" overlay={popoverTop}>
 *         <Button>Holy guacamole!</Button>
 *       </OverlayTrigger>
 *       <OverlayTrigger container={this} trigger="click" placement="bottom" overlay={popoverBottom}>
 *         <Button>Holy guacamole!</Button>
 *       </OverlayTrigger>
 *       <OverlayTrigger container={this} trigger="click" placement="right" overlay={popoverRight}>
 *         <Button>Holy guacamole!</Button>
 *       </OverlayTrigger>
 *     </ButtonToolbar>
 *   );
 *  }
 * }
 *
 * ReactDOM.render(<Positioner />, mountNode);
 * ```
 * @bit
 */

 /**
  * @property {string} bsClass - Default: 'popover'. Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component.
  */
class Popover extends React.Component {
  render() {
    const {
      placement,
      positionTop,
      positionLeft,
      arrowOffsetTop,
      arrowOffsetLeft,
      title,
      className,
      style,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [placement]: true,
    };

    const outerStyle = {
      display: 'block',
      top: positionTop,
      left: positionLeft,
      ...style,
    };

    const arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft,
    };

    return (
      <div
        {...elementProps}
        role="tooltip"
        className={classNames(className, classes)}
        style={outerStyle}
      >
        <div className="arrow" style={arrowStyle} />

        {title && (
          <h3 className={prefix(bsProps, 'title')}>
            {title}
          </h3>
        )}

        <div className={prefix(bsProps, 'content')}>
          {children}
        </div>
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default bsClass('popover', Popover);
