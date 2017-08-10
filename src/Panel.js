import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import bsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsPropsAndOmit} from './utils/splitBsProps';
import prefix from './utils/prefix';
import { State, Style } from './utils/StyleConfig';

// TODO: Use uncontrollable.

const propTypes = {
  collapsible: PropTypes.bool,
  onSelect: PropTypes.func,
  header: PropTypes.node,
  id: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  footer: PropTypes.node,
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  eventKey: PropTypes.any,
  headerRole: PropTypes.string,
  panelRole: PropTypes.string,

  // From Collapse.
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
};

const defaultProps = {
  defaultExpanded: false,
};

/**
 * # A panel React component.
 * 
 * &nbsp;
 * ## Basic example
 * By default, all the `<Panel />` does is apply some basic border and padding to contain some content.
 * You can pass on any additional properties you need, e.g. a custom `onClick` handler, as it is shown in the example code. They all will apply to the wrapper `div` element.
 * ```js
 * function handleClick() {
 *  alert('You have clicked on me');
 * }
 * 
 * const panelInstance = (
 *  <Panel onClick={ handleClick }>
 *    Basic panel example
 *  </Panel>
 * );
 * 
 * ReactDOM.render(panelInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Collapsible Panel
 * ```js
 * class Example extends React.Component {
 *  constructor(...args) {
 *    super(...args);
 *    this.state = {
 *      open: true
 *    };
 *  }
 * 
 *  render() {
 *    return (
 *      <div>
 *        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
 *          click
 *        </Button>
 *        <Panel collapsible expanded={this.state.open}>
 *          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
 *          Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
 *        </Panel>
 *      </div>
 *    );
 *  }
 * }
 * 
 * ReactDOM.render(<Example/>, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Panel with heading
 * Easily add a heading container to your panel with the `header` prop.
 * ```js
 * const title = (
 *  <h3>Panel title</h3>
 * );
 * 
 * const panelsInstance = (
 *  <div>
 *    <Panel header="Panel heading without title">
 *      Panel content
 *    </Panel>
 *    <Panel header={title}>
 *      Panel content
 *    </Panel>
 *  </div>
 * );
 * 
 * ReactDOM.render(panelsInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Panel with footer
 * Pass buttons or secondary text in the `footer` prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.
 * ```js
 * const panelInstance = (
 *  <Panel footer="Panel footer">
 *    Panel content
 *  </Panel>
 * );
 *
 * ReactDOM.render(panelInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Contextual alternatives
 * Like other components, easily make a panel more meaningful to a particular context by adding a `bsStyle` prop.
 * ```js
 * const title = (
 *  <h3>Panel title</h3>
 * );
 * 
 * const panelsInstance = (
 *  <div>
 *    <Panel header={title}>
 *      Panel content
 *    </Panel>
 * 
 *    <Panel header={title} bsStyle="primary">
 *      Panel content
 *    </Panel>
 * 
 *    <Panel header={title} bsStyle="success">
 *      Panel content
 *    </Panel>
 * 
 *    <Panel header={title} bsStyle="info">
 *      Panel content
 *    </Panel>
 * 
 *    <Panel header={title} bsStyle="warning">
 *      Panel content
 *    </Panel>
 * 
 *    <Panel header={title} bsStyle="danger">
 *      Panel content
 *    </Panel>
 *  </div>
 * );
 * 
 * ReactDOM.render(panelsInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## With tables and list groups
 * Add the `fill` prop to `<Table />` or `<ListGroup />` elements to make them fill the panel.
 * ```js
 * const panelInstance = (
 *  <Panel collapsible defaultExpanded header="Panel heading">
 *    Some default panel content here.
 *    <ListGroup fill>
 *      <ListGroupItem>Item 1</ListGroupItem>
 *      <ListGroupItem>Item 2</ListGroupItem>
 *      <ListGroupItem>&hellip;</ListGroupItem>
 *    </ListGroup>
 *    Some more panel content here.
 *  </Panel>
 * );
 * 
 * ReactDOM.render(panelInstance, mountNode);
 * ```
 *
 * @property {'success'|'warning'|'danger'|'info'|'default'|'primary'} bsStyle - Component visual or contextual style variants.
 * @property {bool} collapsible
 * @property {func} onSelect
 * @property {node} header
 * @property {string|number} id
 * @property {node} footer
 * @property {bool} defaultExpanded
 * @property {bool} expanded
 * @property {*} eventKey
 * @property {string} headerRole
 * @property {string} panelRole
 * @property {func} onEnter - Callback fired before the component expands.
 * @property {func} onEntering - Callback fired after the component starts to expand.
 * @property {func} onEntered - Callback fired after the component has expanded.
 * @property {func} onExit - Callback fired before the component collapses.
 * @property {func} onExiting - Callback fired after the component starts to collapse.
 * @property {func} onExited - Callback fired after the component has collapsed.
 * @bit
 */
class Panel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClickTitle = this.handleClickTitle.bind(this);

    this.state = {
      expanded: this.props.defaultExpanded,
    };
  }

  handleClickTitle(e) {
    // FIXME: What the heck? This API is horrible. This needs to go away!
    e.persist();
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  renderHeader(collapsible, header, id, role, expanded, bsProps) {
    const titleClassName = prefix(bsProps, 'title');

    if (!collapsible) {
      if (!React.isValidElement(header)) {
        return header;
      }

      return cloneElement(header, {
        className: classNames(header.props.className, titleClassName),
      });
    }

    if (!React.isValidElement(header)) {
      return (
        <h4 role="presentation" className={titleClassName}>
          {this.renderAnchor(header, id, role, expanded)}
        </h4>
      );
    }

    return cloneElement(header, {
      className: classNames(header.props.className, titleClassName),
      children: this.renderAnchor(header.props.children, id, role, expanded),
    });
  }

  renderAnchor(header, id, role, expanded) {
    return (
      <a
        role={role}
        href={id && `#${id}`}
        onClick={this.handleClickTitle}
        aria-controls={id}
        aria-expanded={expanded}
        aria-selected={expanded}
        className={expanded ? null : 'collapsed' }
      >
        {header}
      </a>
    );
  }

  renderCollapsibleBody(
    id, expanded, role, children, bsProps, animationHooks
  ) {
    return (
      <Collapse in={expanded} {...animationHooks}>
        <div
          id={id}
          role={role}
          className={prefix(bsProps, 'collapse')}
          aria-hidden={!expanded}
        >
          {this.renderBody(children, bsProps)}
        </div>
      </Collapse>
    );
  }

  renderBody(rawChildren, bsProps) {
    const children = [];
    let bodyChildren = [];

    const bodyClassName = prefix(bsProps, 'body');

    function maybeAddBody() {
      if (!bodyChildren.length) {
        return;
      }

      // Derive the key from the index here, since we need to make one up.
      children.push(
        <div key={children.length} className={bodyClassName}>
          {bodyChildren}
        </div>
      );

      bodyChildren = [];
    }

    // Convert to array so we can re-use keys.
    React.Children.toArray(rawChildren).forEach(child => {
      if (React.isValidElement(child) && child.props.fill) {
        maybeAddBody();

        // Remove the child's unknown `fill` prop.
        children.push(cloneElement(child, { fill: undefined }));

        return;
      }

      bodyChildren.push(child);
    });

    maybeAddBody();

    return children;
  }

  render() {
    const {
      collapsible,
      header,
      id,
      footer,
      expanded: propsExpanded,
      headerRole,
      panelRole,
      className,
      children,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'defaultExpanded', 'eventKey', 'onSelect',
    ]);

    const expanded = propsExpanded != null ?
      propsExpanded : this.state.expanded;

    const classes = getClassSet(bsProps);

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
        id={collapsible ? null : id}
      >
        {header && (
          <div className={prefix(bsProps, 'heading')}>
            {this.renderHeader(
              collapsible, header, id, headerRole, expanded, bsProps
            )}
          </div>
        )}

        {collapsible ?
          this.renderCollapsibleBody(
            id, expanded, panelRole, children, bsProps,
            { onEnter, onEntering, onEntered, onExit, onExiting, onExited }
          ) :
          this.renderBody(children, bsProps)
        }

        {footer && (
          <div className={prefix(bsProps, 'footer')}>
            {footer}
          </div>
        )}
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default bsClass('panel',
  bsStyles(
    [...Object.values(State), Style.DEFAULT, Style.PRIMARY],
    Style.DEFAULT,
    Panel
  )
);
