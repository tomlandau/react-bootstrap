import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';
import { State } from './utils/StyleConfig';

const propTypes = {
  active: PropTypes.any,
  disabled: PropTypes.any,
  header: PropTypes.node,
  listItem: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  listItem: false,
};

/**
 * ## List groups are a flexible and powerful component for displaying not only simple lists of elements, but complex ones with custom content.
 * 
 * ## Default:
 * ```js
 * const listgroupInstance = (
 *  <ListGroup>
 *    <ListGroupItem>Item 1</ListGroupItem>
 *    <ListGroupItem>Item 2</ListGroupItem>
 *    <ListGroupItem>...</ListGroupItem>
 *  </ListGroup>
 * );
 *
 * ReactDOM.render(listgroupInstance, mountNode);
 * ```
 * 
 * ## Linked:
 * Set the `href` or `onClick` prop on `ListGroupItem`, to create a linked or clickable element.
 * ```js
 * function alertClicked() {
 *  alert('You clicked the third ListGroupItem');
 * }
 *
 * const listgroupInstance = (
 *  <ListGroup>
 *    <ListGroupItem href="#link1">Link 1</ListGroupItem>
 *    <ListGroupItem href="#link2">Link 2</ListGroupItem>
 *    <ListGroupItem onClick={alertClicked}>
 *      Trigger an alert
 *    </ListGroupItem>
 *  </ListGroup>
 * );
 *
 * ReactDOM.render(listgroupInstance, mountNode);
 * ```
 * 
 * ## Styling by state:
 * Set the `active` or `disabled` prop to `true` to mark or disable the item.
 * ```js
 * const listgroupInstance = (
 *  <ListGroup>
 *    <ListGroupItem href="#" active>Link 1</ListGroupItem>
 *    <ListGroupItem href="#">Link 2</ListGroupItem>
 *    <ListGroupItem href="#" disabled>Link 3</ListGroupItem>
 *  </ListGroup>
 * );
 *
 * ReactDOM.render(listgroupInstance, mountNode);
 * ```
 * 
 * ## Styling by color:
 * Set the `bsStyle` prop to style the item
 * ```js
 * const listgroupInstance = (
 *  <ListGroup>
 *    <ListGroupItem bsStyle="success">Success</ListGroupItem>
 *    <ListGroupItem bsStyle="info">Info</ListGroupItem>
 *    <ListGroupItem bsStyle="warning">Warning</ListGroupItem>
 *    <ListGroupItem bsStyle="danger">Danger</ListGroupItem>
 *  </ListGroup>
 * );
 *
 * ReactDOM.render(listgroupInstance, mountNode);
 * ```
 * 
 * ## With header:
 * Set the `header` prop to create a structured item, with a heading and a body area.
 * ```js
 * const listgroupInstance = (
 *  <ListGroup>
 *    <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
 *    <ListGroupItem header="Heading 2" href="#">Linked item</ListGroupItem>
 *    <ListGroupItem header="Heading 3" bsStyle="danger">Danger styling</ListGroupItem>
 *  </ListGroup>
 * );
 *
 * ReactDOM.render(listgroupInstance, mountNode);
 * ```
 * 
 * ## With custom component children:
 * When using ListGroupItems directly, ListGroup looks at whether the items have href or onClick props to determine which DOM elements to emit. However, with custom item components as children to ListGroup, set thecomponentClass prop to specify which element ListGroup should output.
 * ```js
 * const CustomComponent = React.createClass({
 *  render() {
 *   return (
 *     <li
 *       className="list-group-item"
 *       onClick={() => {}}>
 *       {this.props.children}
 *     </li>
 *   );
 *  }
 * });
 *
 * const listgroupInstance = (
 *  <ListGroup componentClass="ul">
 *    <CustomComponent>Custom Child 1 </CustomComponent>
 *    <CustomComponent>Custom Child 2 </CustomComponent>
 *    <CustomComponent>Custom Child 3</CustomComponent>
 *  </ListGroup>
 * );
 *
 * ReactDOM.render(listgroupInstance, mountNode);
 * ```
 * @bit
 */

/** 
 * @property {string} bsClass - Default: 'list-group-item'. Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component.
 * @property {"success" | "warning" | "danger" | "info"} bsStyle - Component visual or contextual style variants.
 */
class ListGroupItem extends React.Component {
  renderHeader(header, headingClassName) {
    if (React.isValidElement(header)) {
      return cloneElement(header, {
        className: classNames(header.props.className, headingClassName),
      });
    }

    return (
      <h4 className={headingClassName}>
        {header}
      </h4>
    );
  }

  render() {
    const {
      active,
      disabled,
      className,
      header,
      listItem,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      disabled,
    };

    let Component;

    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }

    elementProps.className = classNames(className, classes);

    // TODO: Deprecate `header` prop.
    if (header) {
      return (
        <Component {...elementProps}>
          {this.renderHeader(header, prefix(bsProps, 'heading'))}

          <p className={prefix(bsProps, 'text')}>
            {children}
          </p>
        </Component>
      );
    }

    return (
      <Component {...elementProps}>
        {children}
      </Component>
    );
  }
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default bsClass('list-group-item',
  bsStyles(Object.values(State), ListGroupItem)
);
