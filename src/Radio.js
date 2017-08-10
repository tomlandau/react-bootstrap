import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

const propTypes = {
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  validationState: PropTypes.oneOf([
    'success', 'warning', 'error', null,
  ]),
  inputRef: PropTypes.func,
};

const defaultProps = {
  inline: false,
  disabled: false,
  title: ''
};

/**
 * # A radio form control component for React.
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `radio`.
 * @property {bool} disabled - Default is `false`.
 * @property {bool} inline - Default is `false`.
 * @property {func} inputRef - Attaches a ref to the `<input>` element. Only functions can be used here.
 * @property {'success'|'error'|'warning'} validationState - Only valid if `inline` is not set.
 */
class Radio extends React.Component {
  render() {
    const {
      inline,
      disabled,
      validationState,
      inputRef,
      className,
      style,
      title,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const input = (
      <input
        {...elementProps}
        ref={inputRef}
        type="radio"
        disabled={disabled}
      />
    );

    if (inline) {
      const classes = {
        [prefix(bsProps, 'inline')]: true,
        disabled,
      };

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      warning(
        !validationState,
        '`validationState` is ignored on `<Radio inline>`. To display ' +
        'validation state on an inline radio, set `validationState` on a ' +
        'parent `<FormGroup>` or other element instead.'
      );

      return (
        <label className={classNames(className, classes)} style={style} title={title}>
          {input}
          {children}
        </label>
      );
    }

    const classes = {
      ...getClassSet(bsProps),
      disabled,
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div className={classNames(className, classes)} style={style}>
        <label title={title}>
          {input}
          {children}
        </label>
      </div>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default bsClass('radio', Radio);
