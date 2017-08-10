import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsPropsAndOmit} from './utils/splitBsProps';
import createChainedFunction from './utils/createChainedFunction';
import map from '../components/element-children/map';

const propTypes = {
  accordion: PropTypes.bool,
  activeKey: PropTypes.any,
  defaultActiveKey: PropTypes.any,
  onSelect: PropTypes.func,
  role: PropTypes.string,
};

const defaultProps = {
  accordion: false,
};

// TODO: Use uncontrollable.

/**
 * # Groups a number of `<Panel>`s together.
 * For more info about `<Panel>`, see [here](https://bitsrc.io/react-bootstrap/components/panels/panel).
 * 
 * &nbsp;
 * ## Controlled PanelGroups
 * `PanelGroup`s can be controlled by a parent component. The `activeKey` prop dictates which panel is open.
 * ```js
 * const ControlledPanelGroup = React.createClass({
 *  getInitialState() {
 *    return {
 *      activeKey: '1'
 *    };
 *  },
 * 
 *  handleSelect(activeKey) {
 *    this.setState({ activeKey });
 *  },
 * 
 *  render() {
 *    return (
 *      <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
 *        <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
 *        <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
 *      </PanelGroup>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<ControlledPanelGroup />, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Uncontrolled PanelGroups
 * `PanelGroup`s can also be uncontrolled where they manage their own state. The `defaultActiveKey` prop dictates which panel is open on initial state.
 * ```js
 * const panelGroupInstance = (
 *  <PanelGroup defaultActiveKey="2" accordion>
 *    <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
 *    <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
 *  </PanelGroup>
 * );
 * 
 * ReactDOM.render(panelGroupInstance, mountNode);
 * ```
 * 
 * @property {bool} accordion - means only one panel in the group can be open at the same time.
 * @property {*} activeKey - dictates which panel is open.
 * @property {*} defaultActiveKey - prop dictates which panel is open on initial state.
 * @property {func} onSelect
 * @property {string} role
 */
class PanelGroup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: props.defaultActiveKey,
    };
  }

  handleSelect(key, e) {
    e.preventDefault();

    if (this.props.onSelect) {
      this.props.onSelect(key, e);
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({ activeKey: key });
  }

  render() {
    const {
      accordion,
      activeKey: propsActiveKey,
      className,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'defaultActiveKey', 'onSelect',
    ]);

    let activeKey;
    if (accordion) {
      activeKey = propsActiveKey != null ?
        propsActiveKey : this.state.activeKey;
      elementProps.role = elementProps.role || 'tablist';
    }

    const classes = getClassSet(bsProps);

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      >
        {map(children, child => {
          const childProps = {
            bsStyle: child.props.bsStyle || bsProps.bsStyle,
          };

          if (accordion) {
            Object.assign(childProps, {
              headerRole: 'tab',
              panelRole: 'tabpanel',
              collapsible: true,
              expanded: child.props.eventKey === activeKey,
              onSelect: createChainedFunction(
                this.handleSelect, child.props.onSelect
              )
            });
          }

          return cloneElement(child, childProps);
        })}
      </div>
    );
  }
}

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;

export default bsClass('panel-group', PanelGroup);
