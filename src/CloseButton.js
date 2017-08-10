import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: 'Close'
};

/**
 * # A react component for a close button.
 * @property {string} label - Button label (required).
 * @property {func} onClick - onClick handler.
 */
class CloseButton extends React.Component {
  render() {
    const { label, onClick } = this.props;
    return (
      <button
        type="button"
        className="close"
        onClick={onClick}
      >
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">{label}</span>
      </button>
    );
  }
}

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
