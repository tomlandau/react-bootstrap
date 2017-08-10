import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import bsClass from './utils/bsClass';
import bsStyles from './utils/bsStyles';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';
import bsSizes from './utils/bsSizes';
import { Size, State, Style } from './utils/StyleConfig';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  componentClass: elementType,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

const defaultProps = {
  active: false,
  block: false,
  disabled: false,
};

/**
 * # A basic button React component.
 * ## props:
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. default is `btn`.
 * @property {'lg'|'large'|'sm'|'small'|'xs'|'xsmall'} bsSize - Component size variations.x
 * @property {'success'|'warning'|'danger'|'info'|'default'|'primary'|'link'} bsStyle - Component visual or contextual style variants.
 * @property {bool} active - deafult is false.
 * @property {bool} block - default is false.
 * @property {bool} disabled - default is false.
 * @property {func} onClick - to be invoked on button click.
 * @property {elementType} componentClass - which component type to render as button - default is `<button>`.
 * @property {string} href - an optional url to be provided in order to make the button a hyperlink.
 * @property {'button'|'reset'|'submit'} type - defines HTML button type attribute - deafult is `button`.
 * 
 * Use any of the available button style types to quickly create a styled button. Just modify the `bsStyle` prop.
 * ```js
 * const buttonsInstance = (
 *  <ButtonToolbar>
 *    // Standard button
 *    <Button>Default</Button>
 *
 *    // Provides extra visual weight and identifies the primary action in a set of buttons
 *    <Button bsStyle="primary">Primary</Button>
 *
 *    // Indicates a successful or positive action
 *    <Button bsStyle="success">Success</Button>
 *
 *    // Contextual button for informational alert messages
 *    <Button bsStyle="info">Info</Button>
 *
 *    // Indicates caution should be taken with this action
 *    <Button bsStyle="warning">Warning</Button>
 *
 *    // Indicates a dangerous or potentially negative action
 *    <Button bsStyle="danger">Danger</Button>
 *
 *    // Deemphasize a button by making it look like a link while maintaining button behavior
 *    <Button bsStyle="link">Link</Button>
 *  </ButtonToolbar>
 * );
 *
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * ## Button spacing
 * Because React doesn't output newlines between elements, buttons on the same line are displayed flush against each other. To preserve the spacing between multiple inline buttons, wrap your button group in `<ButtonToolbar />`.
 * 
 * ## Sizes
 * Fancy larger or smaller buttons? Add `bsSize="large"`, `bsSize="small"`, or `bsSize="xsmall"` for additional sizes.
 * ```js
 * const buttonsInstance = (
 *  <div>
 *    <ButtonToolbar>
 *      <Button bsStyle="primary" bsSize="large">Large button</Button>
 *      <Button bsSize="large">Large button</Button>
 *    </ButtonToolbar>
 *    <ButtonToolbar>
 *      <Button bsStyle="primary">Default button</Button>
 *      <Button>Default button</Button>
 *    </ButtonToolbar>
 *    <ButtonToolbar>
 *      <Button bsStyle="primary" bsSize="small">Small button</Button>
 *      <Button bsSize="small">Small button</Button>
 *    </ButtonToolbar>
 *    <ButtonToolbar>
 *      <Button bsStyle="primary" bsSize="xsmall">Extra small button</Button>
 *      <Button bsSize="xsmall">Extra small button</Button>
 *    </ButtonToolbar>
 *  </div>
 * );
 * 
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * Create block level buttons—those that span the full width of a parent— by adding the `block` prop.
 * ```js
 * const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
 *
 * const buttonsInstance = (
 *  <div className="well" style={wellStyles}>
 *    <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
 *    <Button bsSize="large" block>Block level button</Button>
 *  </div>
 * );
 *
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * ## Active state
 * To set a buttons active state simply set the components `active` prop.
 * ```js
 * const buttonsInstance = (
 *  <ButtonToolbar>
 *    <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
 *    <Button bsSize="large" active>Button</Button>
 *  </ButtonToolbar>
 * );
 *
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * ## Button tags
 * The DOM element tag is choosen automatically for you based on the props you supply. Passing a `href` will result in the button using a `<a />` element otherwise a `<button />` element will be used.
 * ```js
 *  const buttonsInstance = (
 *    <ButtonToolbar>
 *      <Button href="#">Link</Button>
 *      <Button>Button</Button>
 *    </ButtonToolbar>
 *  );
 *
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * ## Disabled state
 * Make buttons look unclickable by fading them back 50%. To do this add the `disabled` attribute to buttons.
 * ```js
 * const buttonsInstance = (
 *  <ButtonToolbar>
 *    <Button bsStyle="primary" bsSize="large" disabled>Primary button</Button>
 *    <Button bsSize="large" disabled>Button</Button>
 *  </ButtonToolbar>
 * );
 *
 * ReactDOM.render(buttonsInstance, mountNode);
 * ```
 * 
 * ## Cross-Browser compatibility
 * Because `<Button />` will render an `<a>` tag in certain situations. Since anchor tags can't be `disabled`, the behavior is emulated as best it can be. Specifically, `pointer-events: none;` style is added to the anchor to prevent focusing, which is only supported in newer browser versions.
 * 
 * ## Button loading state
 * When activating an asynchronous action from a button it is a good UX pattern to give the user feedback as to the loading state, this can easily be done by updating your `<Button />`’s props from a state change like below.
 * ```js
 * const LoadingButton = React.createClass({
 *  getInitialState() {
 *    return {
 *      isLoading: false
 *    };
 *  },
 * 
 *  render() {
 *    let isLoading = this.state.isLoading;
 *    return (
 *      <Button
 *        bsStyle="primary"
 *        disabled={isLoading}
 *        onClick={!isLoading ? this.handleClick : null}>
 *        {isLoading ? 'Loading...' : 'Loading state'}
 *      </Button>
 *    );
 *  },
 * 
 *  handleClick() {
 *    this.setState({isLoading: true});
 * 
 *    // This probably where you would have an `ajax` call
 *    setTimeout(() => {
 *      // Completed of async action, set loading state back
 *      this.setState({isLoading: false});
 *    }, 2000);
 *  }
 * });
 * 
 * ReactDOM.render(<LoadingButton />, mountNode);
 * ```
 * @bit
 */
class Button extends React.Component {
  renderAnchor(elementProps, className) {
    return (
      <SafeAnchor
        {...elementProps}
        className={classNames(
          className, elementProps.disabled && 'disabled'
        )}
      />
    );
  }

  renderButton({ componentClass, ...elementProps }, className) {
    const Component = componentClass || 'button';

    return (
      <Component
        {...elementProps}
        type={elementProps.type || 'button'}
        className={className}
      />
    );
  }

  render() {
    const { active, block, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      [prefix(bsProps, 'block')]: block,
    };
    const fullClassName = classNames(className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default bsClass('btn',
  bsSizes([Size.LARGE, Size.SMALL, Size.XSMALL],
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY, Style.LINK],
      Style.DEFAULT,
      Button
    )
  )
);
