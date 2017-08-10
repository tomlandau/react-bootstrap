import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import setBsClass from './utils/bsClass';
import prefix from './utils/prefix';
import {splitBsPropsAndOmit} from './utils/splitBsProps';

const propTypes = {
  /**
   * @property {elementType} componentClass - You can use a custom element type for this component. Default is `div`.
   */
  componentClass: elementType,

  /**
   * @property {bool|elementType} animation - Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or any
   * `<Transition>` component.
   */
  animation: PropTypes.oneOfType([
    PropTypes.bool, elementType,
  ]),

  /**
   * @property {bool} mountOnEnter - Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * @property {bool} UnmountOnExit - Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: PropTypes.bool,
};


const defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false,
};

const contextTypes = {
  $bs_tabContainer: PropTypes.shape({
    activeKey: PropTypes.any,
  }),
};

const childContextTypes = {
  $bs_tabContent: PropTypes.shape({
    bsClass: PropTypes.string,
    animation: PropTypes.oneOfType([
      PropTypes.bool, elementType,
    ]),
    activeKey: PropTypes.any,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    onPaneEnter: PropTypes.func.isRequired,
    onPaneExited: PropTypes.func.isRequired,
    exiting: PropTypes.bool.isRequired,
  }),
};

/**
 * Represents a container for tabs' contents.
 * @example
 * const tabsInstance = (
 *  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
 *    <Row className="clearfix">
 *      <Col sm={4}>
 *        <Nav bsStyle="pills" stacked>
 *          <NavItem eventKey="first">
 *            Tab 1
 *          </NavItem>
 *          <NavItem eventKey="second">
 *            Tab 2
 *          </NavItem>
 *        </Nav>
 *      </Col>
 *      <Col sm={8}>
 *        <Tab.Content animation>
 *          <Tab.Pane eventKey="first">
 *            Tab 1 content
 *          </Tab.Pane>
 *          <Tab.Pane eventKey="second">
 *            Tab 2 content
 *          </Tab.Pane>
 *        </Tab.Content>
 *      </Col>
 *    </Row>
 *  </Tab.Container>
 * );
 * 
 * ReactDOM.render(tabsInstance, mountNode);
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `tab`.
 */
class TabContent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handlePaneEnter = this.handlePaneEnter.bind(this);
    this.handlePaneExited = this.handlePaneExited.bind(this);

    // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.
    this.state = {
      activeKey: null,
      activeChild: null,
    };
  }

  getChildContext() {
    const { bsClass, animation, mountOnEnter, unmountOnExit } = this.props;

    const stateActiveKey = this.state.activeKey;
    const containerActiveKey = this.getContainerActiveKey();

    const activeKey =
      stateActiveKey != null ? stateActiveKey : containerActiveKey;
    const exiting =
      stateActiveKey != null && stateActiveKey !== containerActiveKey;

    return {
      $bs_tabContent: {
        bsClass,
        animation,
        activeKey,
        mountOnEnter,
        unmountOnExit,
        onPaneEnter: this.handlePaneEnter,
        onPaneExited: this.handlePaneExited,
        exiting,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.animation && this.state.activeChild) {
      this.setState({ activeKey: null, activeChild: null });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    }

    // It's possible that this child should be transitioning out.
    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child,
    });

    return true;
  }

  handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(({ activeChild }) => {
      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null,
      };
    });
  }

  getContainerActiveKey() {
    const tabContainer = this.context.$bs_tabContainer;
    return tabContainer && tabContainer.activeKey;
  }

  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'animation', 'mountOnEnter', 'unmountOnExit',
    ]);

    return (
      <Component
        {...elementProps}
        className={classNames(className, prefix(bsProps, 'content'))}
      />
    );
  }
}

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;
TabContent.contextTypes = contextTypes;
TabContent.childContextTypes = childContextTypes;

export default setBsClass('tab', TabContent);
