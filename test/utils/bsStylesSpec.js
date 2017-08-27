import {expect} from 'chai';
import React from 'react';
import bsStyles from '../../src/utils/bsStyles';
import render from '../../src/utils/render';

mockDom('<html><body></body></html>');
const sandbox = sinon.sandbox.create();

describe('bsStyles', () => {
  beforeEach(() => {
    sandbox.restore();
  });

    it('should add style to allowed propTypes', () => {
      const spy = sandbox.spy(console, 'error');
      const Component = () => null;
      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;

      React.createElement(Component, { bsStyle: 'plaid' });
      
      React.createElement(Component, { bsStyle: 'not-plaid' });

      expect(spy.calledWithMatch('expected one of ["minimal","boss","plaid"]')).to.be.ok;
    });

    it('should not override other propTypes', () => {
      const propTypes = { other() {} };
      const Component = () => null;
      Component.propTypes = propTypes;
      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;
      expect(Component.propTypes.other).to.exist;
    });

    it('should set a default if provided', () => {
      const propTypes = { other() {} };
      const Component = () => null;
      Component.propTypes = propTypes;
      bsStyles(['minimal', 'boss', 'plaid'], 'plaid')(Component);

      expect(Component.defaultProps).to.exist;
      expect(Component.defaultProps.bsStyle).to.equal('plaid');
    });

    it('should work with ES classes', () => {
      const spy = sandbox.spy(console, 'error');

      class Component extends React.Component {
        render() { return <span />; }
      }

      const WrappedComponent = bsStyles(['minimal', 'tweed', 'plaid'], 'plaid')(Component);

      const instance = render(<WrappedComponent />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<WrappedComponent bsStyle="not-plaid" />);

      expect(spy.calledWithMatch('expected one of ["minimal","tweed","plaid"]')).to.be.ok;
    });

    it('should work with createClass', () => {
      const spy = sandbox.spy(console, 'error');

      const Component = bsStyles(['minimal', 'boss', 'plaid', 'tweed'], 'plaid')(
        class extends React.Component {
          render() { return <span />; }
        }
      );

      const instance = render(<Component />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<Component bsStyle="not-plaid" />);

      expect(spy.calledWithMatch('expected one of ["minimal","boss","plaid","tweed"]')).to.be.ok;
    });

    it('should work with functional components', () => {
      const spy = sandbox.spy(console, 'error');

      const Component = bsStyles(['minimal', 'boss', 'tartan'], 'tartan')(
        () => <span />
      );

      render(<Component bsStyle="not-plaid" />);

      expect(spy.calledWithMatch('expected one of ["minimal","boss","tartan"]')).to.be.ok;
    });
  });