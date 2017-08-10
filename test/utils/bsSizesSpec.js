import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import bsSizes from '../../src/utils/bsSizes';

const shouldWarn = (about) => {
  expect(console.error.calledWith(about)).to.be.true;
};

let stub = {};

describe('bsSizes', () => {
    beforeEach(() => {
      stub = this.sinon.stub(console, 'error');
    });

    afterEach(() => {
      stub.restore();
    });

    it('should add size to allowed propTypes', () => {
      const Component = () => null;
      bsSizes(['large', 'small'])(Component);

      expect(Component.propTypes).to.exist;

      React.createElement(Component, { bsSize: 'small' });
      React.createElement(Component, { bsSize: 'sm' });

      shouldWarn('expected one of ["lg","large","sm","small"]');
      React.createElement(Component, { bsSize: 'superSmall' });
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
      shouldWarn('expected one of ["smallish","micro","planet"]');

      class Component extends React.Component {
        render() { return <span />; }
      }

      const WrappedComponent = bsSizes(['smallish', 'micro', 'planet'], 'smallish')(Component);

      const instance = render(<WrappedComponent />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<WrappedComponent bsSize="not-smallish" />);
    });

    it('should work with createClass', () => {
      shouldWarn('expected one of ["smallish","micro","planet","big"]');

      const Component = bsSizes(['smallish', 'micro', 'planet', 'big'], 'smallish')(
        class extends React.Component {
          render() { return <span />; }
        }
      );

      const instance = render(<Component />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<Component bsSize="not-smallish" />);
    });
  });