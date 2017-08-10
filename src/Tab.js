import React from 'react';
import PropTypes from 'prop-types';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

const propTypes = {
  ...TabPane.propTypes,
  /**
   * @property {bool} disabled
   */
  disabled: PropTypes.bool,
  /**
   * @property {node} title
   */
  title: PropTypes.node,

  /**
   * @property {string} tabClassName - tabClassName is used as className for the associated NavItem
   */
  tabClassName: PropTypes.string
  /**
   * @property {*} eventKey - Uniquely identify the `<TabPane>` among its siblings.
   * @property {bool|elementType} animation - Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
   * `true` to enable the default `<Fade>` animation or any `<Transition>`
   * component.
   * @property {string} bsClass - If not explicitly specified and rendered in the context of a
   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
   * If otherwise not explicitly specified, `tab-pane`.
   * @property {func} onEnter - Transition onEnter callback when animation is not `false`.
   * @property {func} onEntering - Transition onEntering callback when animation is not `false`.
   * @property {func} onEntered - Transition onEntered callback when animation is not `false`.
   * @property {func} onExit - Transition onExit callback when animation is not `false`.
   * @property {func} onExiting - Transition onExiting callback when animation is not `false`.
   * @property {func} onExited - Transition onExited callback when animation is not `false`.
   * @property {bool} mountOnEnter - Wait until the first "enter" transition to mount the tab (add it to the DOM).
   * @property {bool} unmountOnExit - Unmount the tab (remove it from the DOM) when it is no longer visible.
   */
};

/**
 * Represents a single tab.
 * @example
 * ```js
 * const tabsInstance = (
 *  <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
 *    <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
 *    <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
 *    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
 *  </Tabs>
 * );
 * 
 * ReactDOM.render(tabsInstance, mountNode);
 * ```
 * 
 */
class Tab extends React.Component {
  render() {
    const props = { ...this.props };

    // These props are for the parent `<Tabs>` rather than the `<TabPane>`.
    delete props.title;
    delete props.disabled;
    delete props.tabClassName;

    return <TabPane {...props} />;
  }
}

Tab.propTypes = propTypes;

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
