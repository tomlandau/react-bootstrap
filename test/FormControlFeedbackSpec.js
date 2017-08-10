import React from 'react';
import $ from 'teaspoon';

import FormControlFeedback from '../src/FormControlFeedback';
import FormGroup from '../src/FormGroup';
mockDom('<html><body></body></html>');

describe('<FormControlFeedback>', () => {
  it('should render default success', () => {
    $(
      <FormGroup validationState="success">
        <FormControlFeedback />
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-ok');
  });

  it('should render default warning', () => {
    $(
      <FormGroup validationState="warning">
        <FormControlFeedback />
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-warning-sign');
  });

  it('should render default error', () => {
    $(
      <FormGroup validationState="error">
        <FormControlFeedback />
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-remove');
  });

  it('should render default validation state', () => {
    $(
      <FormGroup validationState="success">
        <div>
          <FormControlFeedback />
        </div>
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-ok');
  });

  it('should render custom component', () => {
    function MyComponent(props) {
      return <div {...props} />;
    }

    $(
      <FormControlFeedback>
        <MyComponent className="foo" />
      </FormControlFeedback>
    )
      .render()
      .single($.s`${MyComponent}.foo.form-control-feedback`);
  });
});
