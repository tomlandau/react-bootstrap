import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai'

import ModalTitle from '../src/ModalTitle';
mockDom('<html><body></body></html>');

describe('ModalTitle', () => {
  it('uses "h4" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
  });

  it('has "modal-title" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-title');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-title');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "h4"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle componentClass="h3" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H3');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle>
        <strong>Children</strong>
      </ModalTitle>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
