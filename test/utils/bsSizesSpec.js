import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import bsSizes from '../../src/utils/bsSizes';
import render from '../../src/utils/render';

mockDom('<html><body></body></html>');
const sandbox = sinon.sandbox.create();

describe('bsSizes', () => {
    beforeEach(() => {
      sandbox.restore();
    });

    it('should add size to allowed propTypes', () => {
      const spy = sandbox.spy(console, 'error');

      const Component = () => null;
      bsSizes(['large', 'small'])(Component);

      expect(Component.propTypes).to.exist;

      React.createElement(Component, { bsSize: 'small' });
      React.createElement(Component, { bsSize: 'sm' });

      React.createElement(Component, { bsSize: 'superSmall' });
      expect(spy.calledWithMatch('expected one of ["lg","large","sm","small"]')).to.be.ok;
    });

    it('should not override other propTypes', () => {
      const Component = { propTypes: { other() {} } };

      bsSizes(['smallish', 'micro', 'planet'])(Component);

      expect(Component.propTypes).to.exist;
      expect(Component.propTypes.other).to.exist;
    });

    it('should set a default if provided', () => {
      const Component = { propTypes: { other() {} } };

      bsSizes(['smallish', 'micro', 'planet'], 'smallish')(Component);

      expect(Component.defaultProps).to.exist;
      expect(Component.defaultProps.bsSize).to.equal('smallish');
    });

    it('should work with es6 classes', () => {
      const spy = sandbox.spy(console, 'error');

      class Component extends React.Component {
        render() { return <span />; }
      }

      const WrappedComponent = bsSizes(['smallish', 'micro', 'planet'], 'smallish')(Component);

      const instance = render(<WrappedComponent />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<WrappedComponent bsSize="not-smallish" />);

      expect(spy.calledWithMatch('expected one of ["smallish","micro","planet"]')).to.be.ok;
    });

    it('should work with createClass', () => {
      const spy = sandbox.spy(console, 'error');

      const Component = bsSizes(['smallish', 'micro', 'planet', 'big'], 'smallish')(
        class extends React.Component {
          render() { return <span />; }
        }
      );

      const instance = render(<Component />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<Component bsSize="not-smallish" />);

      expect(spy.calledWithMatch('expected one of ["smallish","micro","planet","big"]')).to.be.ok;
    });
  });