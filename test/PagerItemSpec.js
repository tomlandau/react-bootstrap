import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import PagerItem from '../src/PagerItem';
mockDom('<html><body></body></html>');

describe('PagerItem', () => {
  it('Should output a "list item" as root element, and an "anchor" as a child item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem href="#">Text</PagerItem>
    );

    let node = ReactDOM.findDOMNode(instance);
    assert.equal(node.nodeName, 'LI');
    assert.equal(node.children.length, 1);
    assert.equal(node.children[0].nodeName, 'A');
  });

  it('Should output "disabled" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem disabled href="#">Text</PagerItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should output "next" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem previous href="#">Previous</PagerItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'previous'));
  });

  it('Should output "previous" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem next href="#">Next</PagerItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'next'));
  });

  it('Should call "onSelect" when item is clicked', (done) => {
    function handleSelect(key) {
      assert.equal(key, 1);
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem eventKey={1} onSelect={handleSelect}>Next</PagerItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should not call "onSelect" when item disabled and is clicked', () => {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem disabled onSelect={handleSelect}>Next</PagerItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should set target attribute on anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem next href="#" target="_blank">Next</PagerItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getAttribute('target'), '_blank');
  });

  it('Should call "onSelect" with target attribute', (done) => {
    function handleSelect(key, e) {
      assert.equal(e.target.target, '_blank');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <PagerItem eventKey={1} onSelect={handleSelect} target="_blank">Next</PagerItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });
});
