import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import MediaRight from '../src/MediaRight';
mockDom('<html><body></body></html>');

describe('MediaRight', () => {
  it('uses "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaRight />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "media-right" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaRight />
    );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-right\b/));
  });

  it('should be able to change alignment to middle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaRight align="middle" />
    );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-middle\b/));
  });

  it('should be able to change alignment to bottom', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaRight align="bottom" />
    );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-bottom\b/));
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaRight className="custom-class" />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-right');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaRight>
        <img />
      </MediaRight>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });
});
