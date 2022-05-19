import { expect } from 'chai';

import { sub } from '../calci';

describe('subtract (sub)', () => {
  describe('two positive numbers', () => {
    it('#1', () => {
      expect(sub('60', '90')).to.equal('-30');
    });

    it('#2', () => {
      expect(sub('42343242343234343260', '42234234343260')).to.equal(
        '42343200109000000000',
      );
    });

    it('#3', () => {
      expect(sub('00', '00')).to.equal('0');
    });

    it('#4', () => {
      expect(sub('989', '89')).to.equal('900');
    });

    it('#5', () => {
      expect(sub('555', '555')).to.equal('0');
    });

    it('#6', () => {
      expect(sub('9000000', '1111111')).to.equal('7888889');
    });

    it('#7', () => {
      expect(sub('34', '55')).to.equal('-21');
    });
  });

  describe('first negative numbers', () => {
    it('#1', () => {
      expect(sub('-60', '90')).to.equal('-150');
    });

    it('#2', () => {
      expect(sub('-150', '90')).to.equal('-240');
    });
  });

  describe('second negative numbers', () => {
    it('#1', () => {
      expect(sub('60', '-90')).to.equal('150');
    });
  });
});
