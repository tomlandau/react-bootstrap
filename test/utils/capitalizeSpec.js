import {expect} from 'chai';
import capitalize from '../../src/utils/capitalize';

describe('capitalize', () => {
    it('should return a single word capitalized', () => {
        expect(capitalize('word')).to.eql('Word');
    });

    it('should return a single capitalized word without change', () => {
        expect(capitalize('Word')).to.eql('Word');
    });

    it('should return a secntence with first word capitalized', () => {
        expect(capitalize('two words')).to.eql('Two words');
    });
});