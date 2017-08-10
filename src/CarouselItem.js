import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import addEndEventListener from './utils/addEndEventListener';

// TODO: This should use a timeout instead of TransitionEvents, or else just
// not wait until transition end to trigger continuing animations.

const propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']),
  onAnimateOutEnd: PropTypes.func,
  active: PropTypes.bool,
  animateIn: PropTypes.bool,
  animateOut: PropTypes.bool,
  index: PropTypes.number,
};

const defaultProps = {
  active: false,
  animateIn: false,
  animateOut: false,
};

/**
 * # Represents a single Carousel item.
 * ## props:
 * @property {'prev'|'next'} direction
 * @property {func} onAnimateOutEnd
 * @property {bool} active
 * @property {bool} animateIn
 * @property {bool} animateOur
 * @property {number} index
 */
class CarouselItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleAnimateOutEnd = this.handleAnimateOutEnd.bind(this);

    this.state = {
      direction: null,
    };

    this.isUnmounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({ direction: null });
    }
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    const prevActive = prevProps.active;

    if (!active && prevActive) {
      addEndEventListener(
        ReactDOM.findDOMNode(this), this.handleAnimateOutEnd
      );
    }

    if (active !== prevActive) {
      setTimeout(() => this.startAnimation(), 20);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleAnimateOutEnd() {
    if (this.isUnmounted) {
      return;
    }

    if (this.props.onAnimateOutEnd) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  }

  startAnimation() {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left',
    });
  }

  render() {
    const {
      direction, active, animateIn, animateOut, className, ...props
    } = this.props;

    delete props.onAnimateOutEnd;
    delete props.index;

    const classes = {
      item: true,
      active: active && !animateIn || animateOut,
    };
    if (direction && active && animateIn) {
      classes[direction] = true;
    }
    if (this.state.direction && (animateIn || animateOut)) {
      classes[this.state.direction] = true;
    }

    return (
      <div
        {...props}
        className={classNames(className, classes)}
      />
    );
  }
}

CarouselItem.propTypes = propTypes;
CarouselItem.defaultProps = defaultProps;

export default CarouselItem;
