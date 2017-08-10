import sinon from 'sinon';
import {expect} from 'chai';

import _curry
  from '../../src/utils/curry';

describe('decorators', () => {
    it('should apply immediately if a component is supplied', () => {
      const spy = sinon.spy();
      const component = function noop() {};

      _curry(spy)(true, 'hi', component);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(true, 'hi', component);
    });

    it('should curry the method as a decorator', () => {
      const spy = sinon.spy();
      const component = function noop() {};
      const decorator = _curry(spy)(true, 'hi');

      expect(spy).to.have.not.been.calledOnce;

      decorator(component);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(true, 'hi', component);
    });
  });