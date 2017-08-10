import React from 'react';

import DropdownToggle from './DropdownToggle';

/**
 * An inner component of <SplitButton>.
 */
class SplitToggle extends React.Component {
  render() {
    return (
      <DropdownToggle
        {...this.props}
        useAnchor={false}
        noCaret={false}
      />
    );
  }
}

SplitToggle.defaultProps = DropdownToggle.defaultProps;

export default SplitToggle;
