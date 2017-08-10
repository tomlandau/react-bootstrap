import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import MediaListItem from '../src/MediaListItem';
mockDom('<html><body></body></html>');

describe(`MediaListItem`, () => {
  it(`uses "li"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'LI');
  });
  it(`has "media" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem className="custom-class" />
      );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media');
    assert.include(classes, 'custom-class');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem>
          <strong>Content</strong>
        </MediaListItem>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
