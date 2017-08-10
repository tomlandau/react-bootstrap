import React from 'react';
import $ from 'teaspoon';
import {expect} from 'chai';

import FormControlStatic from '../src/FormControlStatic';

describe('<FormControlStatic>', () => {
  it('should render correctly', () => {
    expect(
      $(
        <FormControlStatic name="foo" className="my-form-control-static">
          Static text
        </FormControlStatic>
      )
        .shallowRender()
        .single('.form-control-static.my-form-control-static')
          .text()
    ).to.equal('Static text');
  });

  it('should support custom componentClass', () => {
    function MyComponent({ children, ...props }) {
      return (
        <div {...props}>{children}</div>
      );
    }

    expect(
      $(
        <FormControlStatic componentClass={MyComponent}>
          Static text
        </FormControlStatic>
      )
        .shallowRender()
        .single($.s`${MyComponent}.form-control-static`)
          .text()
    ).to.equal('Static text');
  });
});
