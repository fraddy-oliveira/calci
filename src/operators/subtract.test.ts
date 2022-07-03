import { expect } from 'chai';

import { subtract } from './subtract';

describe('subtract (sub)', () => {
  describe('two positive numbers', () => {
    it('#1', () => {
      expect(subtract('60', '90')).to.equal('-30');
    });

    it('#2', () => {
      expect(subtract('42343242343234343260', '42234234343260')).to.equal(
        '42343200109000000000',
      );
    });

    it('#3', () => {
      expect(subtract('00', '00')).to.equal('0');
    });

    it('#4', () => {
      expect(subtract('989', '89')).to.equal('900');
    });

    it('#5', () => {
      expect(subtract('555', '555')).to.equal('0');
    });

    it('#6', () => {
      expect(subtract('9000000', '1111111')).to.equal('7888889');
    });

    it('#7', () => {
      expect(subtract('34', '55')).to.equal('-21');
    });
  });

  describe('first negative numbers', () => {
    it('#1', () => {
      expect(subtract('-60', '90')).to.equal('-150');
    });

    it('#2', () => {
      expect(subtract('-150', '90')).to.equal('-240');
    });
  });

  describe('second negative numbers', () => {
    it('#1', () => {
      expect(subtract('60', '-90')).to.equal('150');
    });
  });
});
