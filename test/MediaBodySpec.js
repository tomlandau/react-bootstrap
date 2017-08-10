import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert} from 'chai';

import MediaBody from '../src/MediaBody';
mockDom('<html><body></body></html>');

describe('<MediaBody>', () => {
  it('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaBody />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "media-body" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaBody />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-body');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaBody className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media-body');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaBody componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MediaBody>
        <strong>Content</strong>
      </MediaBody>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
