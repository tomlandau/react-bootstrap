import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import CarouselCaption from '../src/CarouselCaption';
mockDom('<html><body></body></html>');

describe('<CarouselCaption>', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <CarouselCaption />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "carousel-caption" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <CarouselCaption>CarouselCaption content</CarouselCaption>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'carousel-caption');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <CarouselCaption className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcarousel-caption\b/));
  });

  it('allows custom elements instead of "div"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <CarouselCaption componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
