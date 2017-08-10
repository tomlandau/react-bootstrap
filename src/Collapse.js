import classNames from 'classnames';
import css from 'dom-helpers/style';
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-overlays/lib/Transition';

import capitalize from './utils/capitalize';
import createChainedFunction from './utils/createChainedFunction';

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

function getDimensionValue(dimension, elem) {
  let value = elem[`offset${capitalize(dimension)}`];
  let margins = MARGINS[dimension];

  return (value +
    parseInt(css(elem, margins[0]), 10) +
    parseInt(css(elem, margins[1]), 10)
  );
}

const propTypes = {
  in: PropTypes.bool,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  transitionAppear: PropTypes.bool,
  timeout: PropTypes.number,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  dimension: PropTypes.oneOfType([
    PropTypes.oneOf(['height', 'width']),
    PropTypes.func,
  ]),
  getDimensionValue: PropTypes.func,
  role: PropTypes.string,
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  transitionAppear: false,

  dimension: 'height',
  getDimensionValue,
};

/**
 * # Adds a collapse toggle animation to an element or component.
 * 
 * &nbsp;
 * > A note regarding 'dimension' prop: Bootstrap only partially supports 'width'!
 * > You will need to supply your own CSS animation for the `.width` CSS class.
 * 
 * &nbsp;
 * > ## Smoothing animations
 * > If you're noticing choppy animations, and the component that's being collapsed has non-zero margin or padding, try wrapping the contents of your `<Collapse>` inside a node with no margin or padding, like the `<div>` in the example below. This will allow the height to be computed properly, so the animation can proceed smoothly.
 * 
 * @example
 * ```js
 * class Example extends React.Component {
 *  constructor(...args) {
 *    super(...args);
 * 
 *    this.state = {};
 *  }
 * 
 *  render() {
 *    return (
 *      <div>
 *        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
 *          click
 *        </Button>
 *        <Collapse in={this.state.open}>
 *          <div>
 *            <Well>
 *              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
 *              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
 *            </Well>
 *          </div>
 *        </Collapse>
 *      </div>
 *    );
 *  }
 * }
 * 
 * ReactDOM.render(<Example/>, mountNode);
 * ```
 * 
 * @property {bool} in - Show the component; triggers the expand or collapse animation.
 * @property {bool} mountOnEnter - Wait until the first "enter" transition to mount the component (add it to the DOM).
 * @property {bool} unmountOnExit - Unmount the component (remove it from the DOM) when it is collapsed.
 * @property {bool} transitionAppear - Run the expand animation when the component mounts, if it is initially shown.
 * @property {number} timeout - Duration of the collapse animation in milliseconds, to ensure that finishing callbacks are fired even if the original browser transition end events are canceled.
 * @property {func} onEnter - Callback fired before the component expands.
 * @property {func} onEntering - Callback fired after the component starts to expand.
 * @property {func} onEntered - Callback fired after the component has expanded.
 * @property {func} onExit - Callback fired before the component collapses.
 * @property {func} onExiting - Callback fired after the component starts to collapse.
 * @property {func} onExited - Callback fired after the component has collapsed.
 * @property {'height'|'width'|func} dimension - The dimension used when collapsing, or a function that returns the dimension.
 * @property {func} getDimensionValue - A function that returns the height or width of the animating DOM node. Allows for providing some custom logic for how much the Collapse component should animate in its specified dimension. Called with the current dimension prop value and the DOM node.
 * @property {string} role - RIA role of collapsible element.
 * @bit
 */
class Collapse extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleEnter = this.handleEnter.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExiting = this.handleExiting.bind(this);
  }

  /* -- Expanding -- */
  handleEnter(elem) {
    const dimension = this._dimension();
    elem.style[dimension] = '0';
  }

  handleEntering(elem) {
    const dimension = this._dimension();
    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  }

  handleEntered(elem) {
    const dimension = this._dimension();
    elem.style[dimension] = null;
  }

  /* -- Collapsing -- */
  handleExit(elem) {
    const dimension = this._dimension();
    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
    triggerBrowserReflow(elem);
  }

  handleExiting(elem) {
    const dimension = this._dimension();
    elem.style[dimension] = '0';
  }

  _dimension() {
    return typeof this.props.dimension === 'function'
      ? this.props.dimension()
      : this.props.dimension;
  }

  // for testing
  _getScrollDimensionValue(elem, dimension) {
    return `${elem[`scroll${capitalize(dimension)}`]}px`;
  }

  render() {
    const {
      onEnter, onEntering, onEntered, onExit, onExiting, className, ...props
    } = this.props;

    delete props.dimension;
    delete props.getDimensionValue;

    const handleEnter =
      createChainedFunction(this.handleEnter, onEnter);
    const handleEntering =
      createChainedFunction(this.handleEntering, onEntering);
    const handleEntered =
      createChainedFunction(this.handleEntered, onEntered);
    const handleExit =
      createChainedFunction(this.handleExit, onExit);
    const handleExiting =
      createChainedFunction(this.handleExiting, onExiting);

    const classes = {
      width: this._dimension() === 'width',
    };

    return (
      <Transition
        {...props}
        aria-expanded={props.role ? props.in : null}
        className={classNames(className, classes)}
        exitedClassName="collapse"
        exitingClassName="collapsing"
        enteredClassName="collapse in"
        enteringClassName="collapsing"
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
      />
    );
  }
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;

export default Collapse;
