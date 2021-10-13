import {performance} from 'perf_hooks';

import {expect} from 'chai';

import {add, addFromArray} from '../calci';

import {addToVerify} from '../core/helpers';

let startTime: number = 0;

let debug = false;

describe('Add operation', () => {
  beforeEach(() => {
    startTime = performance.now();
  });

  afterEach(() => {
    if (debug) {
      // print seconds required to execute each test case.
      console.log(`timediff: ${performance.now() - startTime}`);
    }

    startTime = 0;
  });

  describe('Add two numbers', () => {
    it('Sum should be 13435435435457356544544535', () => {
      const sum = add(
        '1123123123123123213123213',
        '12312312312334233331421322',
      );

      expect(sum).to.equal('13435435435457356544544535');
    });

    it('Sum should be 13435435435457356544544535', () => {
      const sum = add(
        '1123123123123123213123213',
        '12312312312334233331421322',
      );

      expect(sum).to.equal('13435435435457356544544535');
    });

    it('Sum should be 9468468946', () => {
      const sum = add('1123123423', '8345345523');

      expect(sum).to.equal('9468468946');
    });

    it('Blank inputs should sum to 0', () => {
      const sum = add(' ', ' ');

      expect(sum).to.equal('0');
    });

    it('Both zero input should sum to 0', () => {
      const sum = add('0', '0');

      expect(sum).to.equal('0');
    });
  });

  describe('Add random numbers from array', () => {
    it('Add hundred random numbers', () => {
      const arr = Array.from(
        {length: 100},
        () => parseInt(Math.random() * 1000000000000 + '', 10) + '',
      );

      expect(addFromArray(arr)).to.equal(addToVerify(arr));
    });
  });

  describe('Add numbers from array', () => {
    it('Add 3 zeros should sum to 0', () => {
      const arr = ['0', '0', '0'];

      expect(addFromArray(arr)).to.equal(addToVerify(arr));
    });

    it('Sum should be 1243544687030932968237422435890746658808501', () => {
      const arr = [
        '1123123123123123453423213123213',
        '1231231233245123342234523433331421322',
        '1231231223453123342333332453245423451421322',
        '12312232345453245345312312334233331421322',
        '12312312312334233331421322',
      ];

      expect(addFromArray(arr)).to.equal(
        '1243544687030932968237422435890746658808501',
      );
    });

    it('Add three similar numbers should sum to 36', () => {
      const arr = ['12', '12', '12'];

      expect(addFromArray(arr)).to.equal('36');
    });
  });
});
