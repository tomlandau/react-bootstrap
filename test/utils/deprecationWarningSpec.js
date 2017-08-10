import deprecationWarning from '../../src/utils/deprecationWarning';
mockDom('<html><body></body></html>');

import sinon from 'sinon';
import {expect} from 'chai';

describe('deprecationWarning', () => {
  it('warns exactly once', () => {
    // console.error has already been stubbed out by test setup.
    const spy = sinon.spy(console, 'error');

    deprecationWarning('foo', 'bar');

    // No second warning.
    deprecationWarning('foo', 'bar');

    expect(spy.calledWithMatch(sinon.match(/(deprecated)/))).to.be.ok;
  });
});