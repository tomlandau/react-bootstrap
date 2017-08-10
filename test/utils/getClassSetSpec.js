import React from 'react';
import {expect} from 'chai';
import getClassSet from '../../src/utils/getClassSet';

describe('bootstrapUtils', () => {

  it('returns a classSet of bsClass', () => {
    expect(getClassSet({ bsClass: 'btn' })).to.eql({ btn: true });
  });

  it('returns a classtSet of bsClass and style', () => {
    expect(
      getClassSet({ bsClass: 'btn', bsStyle: 'primary' })
    )
    .to.eql({ btn: true, 'btn-primary': true });
  });

  it('returns a classSet of bsClass and size', () => {
    expect(getClassSet({ bsClass: 'btn', bsSize: 'large' }))
        .to.eql({ btn: true, 'btn-lg': true });

    expect(getClassSet({ bsClass: 'btn', bsSize: 'lg' }))
        .to.eql({ btn: true, 'btn-lg': true });
  });

  it('returns a classSet of bsClass, style and size', () => {
    expect(getClassSet({ bsClass: 'btn', bsSize: 'lg', bsStyle: 'primary' }))
        .to.eql({ btn: true, 'btn-lg': true, 'btn-primary': true });
  });
});
