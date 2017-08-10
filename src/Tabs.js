import React from 'react';
import PropTypes from 'prop-types';
import requiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';

import Nav from './Nav';
import NavItem from './NavItem';
import UncontrolledTabContainer from './TabContainer';
import TabContent from './TabContent';
import setBsClass from './utils/bsClass';
import forEach from '../components/element-children/for-each';
import map from '../components/element-children/map/';

const TabContainer = UncontrolledTabContainer.ControlledComponent;

const propTypes = {
  /**
   * @property {8} activeKey - Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: PropTypes.any,

  /**
   * @property {'tabs'|'pills'} bsStyle - Navigation style
   */
  bsStyle: PropTypes.oneOf(['tabs', 'pills']),

  /**
   * @property {bool} animation
   */
  animation: PropTypes.bool,

  /**
   * @property {string|number} id
   */
  id: requiredForA11y(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ])),

  /**
   * @property {func} onSelect - Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: PropTypes.func,

  /**
   * @property {bool} mountOnEnter - Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * @property {bool} unmountOnExit - Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: PropTypes.bool,
};

const defaultProps = {
  bsStyle: 'tabs',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false,
};

function getDefaultActiveKey(children) {
  let defaultActiveKey;
  forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

/**
 * Togglable tabs - quick, dynamic tab functionality to transition through panes of local content.
 * 
 * &nbsp;
 * ## Uncontrolled
 * Allow the component to control its own state.
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
 * &nbsp;
 * ## Controlled
 * Pass down the active state on render via props.
 * ```js
 * const ControlledTabs = React.createClass({
 *  getInitialState() {
 *    return {
 *      key: 1
 *    };
 *  },
 * 
 *  handleSelect(key) {
 *    alert('selected ' + key);
 *    this.setState({key});
 *  },
 * 
 *  render() {
 *    return (
 *      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
 *        <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
 *        <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
 *        <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
 *      </Tabs>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<ControlledTabs />, mountNode);
 * ```
 * 
 * &nbsp;
 * ## No animation
 * Set the `animation` prop to `false`
 * ```js
 * const tabsInstance = (
 *  <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
 *    <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
 *    <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
 *    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
 *  </Tabs>
 * );
 * 
 * ReactDOM.render(tabsInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Tabs with Dropdown
 * ```js
 * const tabsInstance = (
 *  <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
 *    <Row className="clearfix">
 *      <Col sm={12}>
 *        <Nav bsStyle="tabs">
 *          <NavItem eventKey="first">
 *            Tab 1
 *          </NavItem>
 *          <NavItem eventKey="second">
 *            Tab 2
 *          </NavItem>
 *          <NavDropdown eventKey="3" title="Dropdown" id="nav-dropdown-within-tab">
 *            <MenuItem eventKey="3.1">Action</MenuItem>
 *            <MenuItem eventKey="3.2">Another action</MenuItem>
 *            <MenuItem eventKey="3.3">Something else here</MenuItem>
 *            <MenuItem divider />
 *            <MenuItem eventKey="3.4">Separated link</MenuItem>
 *          </NavDropdown>
 *        </Nav>
 *      </Col>
 *      <Col sm={12}>
 *        <Tab.Content animation>
 *          <Tab.Pane eventKey="first">
 *            Tab 1 content
 *          </Tab.Pane>
 *          <Tab.Pane eventKey="second">
 *            Tab 2 content
 *          </Tab.Pane>
 *          <Tab.Pane eventKey="3.1">
 *            Tab 3.1 content
 *          </Tab.Pane>
 *          <Tab.Pane eventKey="3.2">
 *            Tab 3.2 content
 *          </Tab.Pane>
 *          <Tab.Pane eventKey="3.3">
 *            Tab 3.3 content
 *          </Tab.Pane>
 *          <Tab.Pane eventKey="3.4">
 *            Tab 3.4 content
 *          </Tab.Pane>
 *        </Tab.Content>
 *      </Col>
 *    </Row>
 *  </Tab.Container>
 * );
 * 
 * ReactDOM.render(tabsInstance, mountNode);
 * ```
 * 
 * ## Custom Tab Layout
 * For more complex layouts the flexible `TabContainer`, `TabContent`, and `TabPane` components along with any style of `Nav` allow you to quickly piece together your own Tabs component with additional markup needed.
 * For more details, see the [`TabContainer` component page](https://bitsrc.io/react-bootstrap/components/tabs/tab-container).
 */
class Tabs extends React.Component {
  renderTab(child) {
    const { title, eventKey, disabled, tabClassName } = child.props;
    if (title == null) {
      return null;
    }

    return (
      <NavItem
        eventKey={eventKey}
        disabled={disabled}
        className={tabClassName}
      >
        {title}
      </NavItem>
    );
  }

  render() {
    const {
      id,
      onSelect,
      animation,
      mountOnEnter,
      unmountOnExit,
      bsClass,
      className,
      style,
      children,
      activeKey = getDefaultActiveKey(children),
      ...props
    } = this.props;

    return (
      <TabContainer
        id={id}
        activeKey={activeKey}
        onSelect={onSelect}
        className={className}
        style={style}
      >
        <div>
          <Nav
            {...props}
            role="tablist"
          >
            {map(children, this.renderTab)}
          </Nav>

          <TabContent
            bsClass={bsClass}
            animation={animation}
            mountOnEnter={mountOnEnter}
            unmountOnExit={unmountOnExit}
          >
            {children}
          </TabContent>
        </div>
      </TabContainer>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

setBsClass('tab', Tabs);

export default uncontrollable(Tabs, { activeKey: 'onSelect' });
