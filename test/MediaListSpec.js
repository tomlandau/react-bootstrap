import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import MediaList from '../src/MediaList';
mockDom('<html><body></body></html>');

describe(`MediaList`, () => {
  it(`uses "ul"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'UL');
  });
  it(`has "media-list" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-list');
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList className="custom-class" />
      );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media-list');
    assert.include(classes, 'custom-class');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList>
          <strong>Content</strong>
        </MediaList>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
