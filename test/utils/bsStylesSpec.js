import {expect} from 'chai';
import React from 'react';
import bsStyles from '../../src/utils/bsStyles';

const shouldWarn = (about) => {
  expect(console.error.calledWith(about)).to.be.true;
};

let stub = {};

describe('bsStyles', () => {
    beforeEach(() => {
      stub = this.sinon.stub(console, 'error');
    });

    afterEach(() => {
      stub.restore();
    });

    it('should add style to allowed propTypes', () => {
      const Component = () => null;
      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;

      React.createElement(Component, { bsStyle: 'plaid' });

      shouldWarn('expected one of ["minimal","boss","plaid"]');
      React.createElement(Component, { bsStyle: 'not-plaid' });
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
      shouldWarn('expected one of ["minimal","tweed","plaid"]');

      class Component extends React.Component {
        render() { return <span />; }
      }

      const WrappedComponent = bsStyles(['minimal', 'tweed', 'plaid'], 'plaid')(Component);

      const instance = render(<WrappedComponent />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<WrappedComponent bsStyle="not-plaid" />);
    });

    it('should work with createClass', () => {
      shouldWarn('expected one of ["minimal","boss","plaid","tweed"]');

      const Component = bsStyles(['minimal', 'boss', 'plaid', 'tweed'], 'plaid')(
        class extends React.Component {
          render() { return <span />; }
        }
      );

      const instance = render(<Component />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<Component bsStyle="not-plaid" />);
    });

    it('should work with functional components', () => {
      shouldWarn('expected one of ["minimal","boss","tartan"]');

      const Component = bsStyles(['minimal', 'boss', 'tartan'], 'tartan')(
        () => <span />
      );

      render(<Component bsStyle="not-plaid" />);
    });
  });