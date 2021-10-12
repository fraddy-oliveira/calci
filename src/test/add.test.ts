import {performance} from 'perf_hooks';
import chai from 'chai';

const should = chai.should();

import * as calci from '../calci';

let startTime: number = 0;

let debug = false;

describe('addition (add)', () => {
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

  describe('add two numbers', () => {
    it('#1', () => {
      calci
        .add('1123123123123123213123213', '12312312312334233331421322')
        .should.be.equal('13435435435457356544544535');
    });

    it('#2', () => {
      calci
        .add('1123123123123123213123213', '12312312312334233331421322')
        .should.be.equal('13435435435457356544544535');
    });

    it('#3 - 10 digit', () => {
      calci.add('1123123423', '8345345523').should.be.equal('9468468946');
    });

    it('#4 - both blank', () => {
      calci.add(' ', ' ').should.be.equal('0');
    });

    it('#5 - both zero', () => {
      calci.add('0', '0').should.be.equal('0');
    });
  });

  describe('add numbers from array', () => {
    it('#1', () => {
      const arr = Array.from(
        {length: 100},
        () => parseInt(Math.random() * 1000000000000 + '', 10) + '',
      );

      calci
        .addFromArray(arr)
        .should.be.equal(
          arr
            .reduce(
              (a, b) => (parseInt(a, 10) + parseInt(b, 10)).toString(),
              '0',
            )
            .toString(),
        );
    });

    it('#2', () => {
      const arr = ['0', '0', '0'];
      calci
        .addFromArray(arr)
        .should.be.equal(
          arr
            .reduce(
              (a, b) => (parseInt(a, 10) + parseInt(b, 10)).toString(),
              '0',
            )
            .toString(),
        );
    });

    it('#3', () => {
      const arr = [
        '1123123123123123453423213123213',
        '1231231233245123342234523433331421322',
        '1231231223453123342333332453245423451421322',
        '12312232345453245345312312334233331421322',
        '12312312312334233331421322',
      ];
      calci
        .addFromArray(arr)
        .should.be.equal('1243544687030932968237422435890746658808501');
    });

    it('#4', () => {
      const arr = ['12', '12', '12'];
      calci
        .addFromArray(arr)
        .should.be.equal(
          arr
            .reduce(
              (a, b) => (parseInt(a, 10) + parseInt(b, 10)).toString(),
              '0',
            )
            .toString(),
        );
    });
  });
});
