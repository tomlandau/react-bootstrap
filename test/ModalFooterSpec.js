import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai'

import ModalFooter from '../src/ModalFooter';
mockDom('<html><body></body></html>');

describe('ModalFooter', () => {
  it('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalFooter />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "modal-footer" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalFooter />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-footer');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalFooter className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-footer');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalFooter componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalFooter>
        <strong>Content</strong>
      </ModalFooter>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
