import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import MediaHeading from '../src/MediaHeading';
mockDom('<html><body></body></html>');

describe('MediaHeading', () => {
  it('uses "h4" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaHeading />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
  });

  it('has "media-heading" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaHeading />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-heading');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaHeading className="custom-class" />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-heading');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });

  it('should allow custom elements instead of "h4"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaHeading componentClass="h2" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H2');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaHeading>
        <strong>Children</strong>
      </MediaHeading>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
