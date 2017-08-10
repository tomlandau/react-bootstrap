import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {assert, expect} from 'chai';
import sinon from 'sinon';

import ResponsiveEmbed from '../src/ResponsiveEmbed';
mockDom('<html><body></body></html>');
const sandbox = sinon.sandbox.create();

describe('ResponsiveEmbed', () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it('should contain `embed-responsive` class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9>
        <div />
      </ResponsiveEmbed>
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName, 'embed-responsive');
  });

  it('should warn if neither `a16by9` nor `a4by3` is set', () => {
    const spy = sandbox.spy(console, 'error');

    ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed>
        <div />
      </ResponsiveEmbed>
    );

    expect(spy.calledWithMatch(sinon.match(/(Either `a16by9` or `a4by3` must be set.)/))).to.be.ok;
  });

  it('should warn about both `a16by9` or `a4by3` attributes set', () => {
    const spy = sandbox.spy(console, 'error');

    ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9 a4by3>
        <div />
      </ResponsiveEmbed>
    );

    expect(spy.calledWithMatch(sinon.match(/(Only one of `a16by9` or `a4by3` can be set.)/))).to.be.ok;
  });

  it('should add `embed-responsive-item` class to child element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9>
        <div />
      </ResponsiveEmbed>
    );

    let child = ReactDOM.findDOMNode(instance).firstChild;
    assert.ok(child.className.match(/\bembed-responsive-item\b/));
  });

  it('should add custom classes to child element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9 className="custom-class">
        <div />
      </ResponsiveEmbed>
    );

    let child = ReactDOM.findDOMNode(instance).firstChild;
    assert.ok(child.className.match(/\bcustom-class\b/));
  });

  it('should pass custom attributes to child element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9 style={{color: 'white'}}>
        <div />
      </ResponsiveEmbed>
    );

    let child = ReactDOM.findDOMNode(instance).firstChild;
    assert.equal(child.style.color, 'white');
  });

  it('should add `embed-responsive-16by9` class with `a16by9` attribute set', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9>
        <div />
      </ResponsiveEmbed>
    );

    let wrapper = ReactDOM.findDOMNode(instance);
    assert.ok(wrapper.className.match(/\bembed-responsive-16by9\b/));
  });

  it('should add `embed-responsive-4by3` class with `a4by3` attribute set', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a4by3>
        <div />
      </ResponsiveEmbed>
    );

    let wrapper = ReactDOM.findDOMNode(instance);
    assert.ok(wrapper.className.match(/\bembed-responsive-4by3\b/));
  });
});
