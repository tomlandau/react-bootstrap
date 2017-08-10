import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai'

import ModalBody from '../src/ModalBody';
mockDom('<html><body></body></html>');

describe('ModalBody', () => {
  it('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalBody />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "modal-body" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalBody />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-body');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalBody className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-body');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalBody componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalBody>
        <strong>Content</strong>
      </ModalBody>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
