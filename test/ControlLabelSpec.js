import React from 'react';
import $ from 'teaspoon';
import {expect} from 'chai';
import sinon from 'sinon';

import ControlLabel from '../src/ControlLabel';
import FormGroup from '../src/FormGroup';
mockDom('<html><body></body></html>');

describe('<ControlLabel>', () => {
  it('should render correctly', () => {
    expect(
      $(
        <ControlLabel htmlFor="foo" className="my-control-label">
          Label
        </ControlLabel>
      )
        .shallowRender()
        .single('label.control-label.my-control-label[htmlFor="foo"]')
          .text()
    ).to.equal('Label');
  });

  it('should respect srOnly', () => {
    $(
      <ControlLabel srOnly>
        Label
      </ControlLabel>
    )
      .shallowRender()
      .single('label.control-label.sr-only');
  });

  it('should use controlId for htmlFor', () => {
    $(
      <FormGroup controlId="foo">
        <ControlLabel>Label</ControlLabel>
      </FormGroup>
    )
      .render()
      .single('label.control-label[htmlFor="foo"]');
  });

  it('should prefer explicit htmlFor', () => {
    const spy = sinon.spy(console, 'error');

    $(
      <FormGroup controlId="foo">
        <ControlLabel htmlFor="bar">
          Label
        </ControlLabel>
      </FormGroup>
    )
      .render()
      .single('label.control-label[htmlFor="bar"]');

     expect(spy.calledWithMatch(sinon.match(/(ignored)/))).to.be.ok; 
  });
});
