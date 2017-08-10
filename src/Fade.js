import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-overlays/lib/Transition';

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
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  transitionAppear: false,
};

/**
 * # Adds a fade animation to a child element or component.
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
 */
class Fade extends React.Component {
  render() {
    return (
      <Transition
        {...this.props}
        className={classNames(this.props.className, 'fade')}
        enteredClassName="in"
        enteringClassName="in"
      />
    );
  }
}

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;

export default Fade;
