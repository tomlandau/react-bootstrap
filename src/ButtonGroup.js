import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import all from 'prop-types-extra/lib/all';

import Button from './Button';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

const propTypes = {
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  block: all(
    PropTypes.bool,
    ({ block, vertical }) => (
      block && !vertical ?
        new Error('`block` requires `vertical` to be set to have any effect') :
        null
    ),
  ),
};

const defaultProps = {
  block: false,
  justified: false,
  vertical: false,
};

/**
 * # A React component that groups a series of `<button>`s together on a single line.
 * For more info about `<button>` component, see [here](https://bitsrc.io/react-bootstrap/react-bootstrap/buttons/button).
 * 
 * &nbsp;
 * ## Basic example
 * Wrap a series of `<Button />`s in a `<ButtonGroup />`.
 * ```js
 * const buttonGroupInstance = (
 *  <ButtonGroup>
 *    <Button>Left</Button>
 *    <Button>Middle</Button>
 *    <Button>Right</Button>
 *  </ButtonGroup>
 * );
 * 
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Sizing
 * ```js
 * const buttonGroupInstance = (
 *  <div>
 *    <ButtonToolbar>
 *      <ButtonGroup bsSize="large">
 *        <Button>Left</Button>
 *        <Button>Middle</Button>
 *        <Button>Right</Button>
 *      </ButtonGroup>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <ButtonGroup>
 *        <Button>Left</Button>
 *        <Button>Middle</Button>
 *        <Button>Right</Button>
 *      </ButtonGroup>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <ButtonGroup bsSize="small">
 *        <Button>Left</Button>
 *        <Button>Middle</Button>
 *        <Button>Right</Button>
 *      </ButtonGroup>
 *    </ButtonToolbar>
 * 
 *    <ButtonToolbar>
 *      <ButtonGroup bsSize="xsmall">
 *        <Button>Left</Button>
 *        <Button>Middle</Button>
 *        <Button>Right</Button>
 *      </ButtonGroup>
 *    </ButtonToolbar>
 *  </div>
 * );
 * 
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Nesting
 * You can place other button types within the `<ButtonGroup />` like `<DropdownButton />`s.
 * ```js
 * const buttonGroupInstance = (
 *  <ButtonGroup>
 *    <Button>1</Button>
 *    <Button>2</Button>
 *    <DropdownButton title="Dropdown" id="bg-nested-dropdown">
 *      <MenuItem eventKey="1">Dropdown link</MenuItem>
 *      <MenuItem eventKey="2">Dropdown link</MenuItem>
 *    </DropdownButton>
 *  </ButtonGroup>
 * );
 * 
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Vertical variation
 * Make a set of buttons appear vertically stacked rather than horizontally. **Split button dropdowns are not supported here**.
 * Just add `vertical` to the `<ButtonGroup />`.
 * ```js
 * const buttonGroupInstance = (
 *  <ButtonGroup vertical>
 *    <Button>Button</Button>
 *    <Button>Button</Button>
 *    <DropdownButton title="Dropdown" id="bg-vertical-dropdown-1">
 *      <MenuItem eventKey="1">Dropdown link</MenuItem>
 *      <MenuItem eventKey="2">Dropdown link</MenuItem>
 *    </DropdownButton>
 *    <Button>Button</Button>
 *    <Button>Button</Button>
 *    <DropdownButton title="Dropdown" id="bg-vertical-dropdown-2">
 *      <MenuItem eventKey="1">Dropdown link</MenuItem>
 *      <MenuItem eventKey="2">Dropdown link</MenuItem>
 *    </DropdownButton>
 *    <DropdownButton title="Dropdown" id="bg-vertical-dropdown-3">
 *      <MenuItem eventKey="1">Dropdown link</MenuItem>
 *      <MenuItem eventKey="2">Dropdown link</MenuItem>
 *    </DropdownButton>
 *  </ButtonGroup>
 * );
​ * 
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * Moreover, you can have buttons be block level elements so they take the full width of their container, just add `block` to the `<ButtonGroup />`, in addition to the `vertical` you just added.
 * ```js
 * const buttonGroupInstance = (
 *   <ButtonGroup vertical block>
 *    <Button>Full width button</Button>
 *    <Button>Full width button</Button>
 *  </ButtonGroup>
 * );
 * 
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Justified button groups
 * Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.
 * 
 * &nbsp;
 * ### Style issues
 * 
 * > There are some issues and workarounds required when using this property, please see [bootstrap’s button group docs](http://getbootstrap.com/components/#btn-groups-justified) for more specifics.
 * 
 * &nbsp;
 * Just add justified to the `<ButtonGroup />`.
 * ```js
 * const buttonGroupInstance = (
 *  <ButtonGroup justified>
 *    <Button href="#">Left</Button>
 *    <Button href="#">Middle</Button>
 *    <DropdownButton title="Dropdown" id="bg-justified-dropdown">
 *      <MenuItem eventKey="1">Dropdown link</MenuItem>
 *      <MenuItem eventKey="2">Dropdown link</MenuItem>
 *    </DropdownButton>
 *  </ButtonGroup>
 * );
 * ​
 * ReactDOM.render(buttonGroupInstance, mountNode);
 * ```
 * 
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `btn-group`.
 * @property {bool} vertical - Default is `false`.
 * @property {bool} justified - Default is `false`.
 * @property {bool} block - Display block buttons; only useful when used with the `vertical` prop. Default is `false`.
 * @bit
 */
class ButtonGroup extends React.Component {
  render() {
    const { block, justified, vertical, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps)]: !vertical,
      [prefix(bsProps, 'vertical')]: vertical,
      [prefix(bsProps, 'justified')]: justified,

      // this is annoying, since the class is `btn-block` not `btn-group-block`
      [prefix(Button.defaultProps, 'block')]: block,
    };

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default bsClass('btn-group', ButtonGroup);
