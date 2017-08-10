import {expect} from 'chai';
import prefix from '../../src/utils/prefix';

describe("prefix", () => {
    it('should prefix with bsClass', () => {
    expect(prefix({ bsClass: 'yolo' }, 'pie')).to.equal('yolo-pie');
  });

  it('should return bsClass when there is no suffix', () => {
    expect(prefix({ bsClass: 'yolo' })).to.equal('yolo');
    expect(prefix({ bsClass: 'yolo' }, '')).to.equal('yolo');
    expect(prefix({ bsClass: 'yolo' }, null)).to.equal('yolo');
  });
});