import chai from 'chai';

const should = chai.should();

import {performance} from 'perf_hooks';

import * as calci from '../calci';

let startTime: number = 0;

let debug = false;

describe('subtract (sub)', () => {
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

  describe('two positive numbers', () => {
    it('#1', () => {
      calci.sub('60', '90').should.be.equal('-30');
    });

    it('#2', () => {
      calci
        .sub('42343242343234343260', '42234234343260')
        .should.be.equal('42343200109000000000');
    });

    it('#3', () => {
      calci.sub('00', '00').should.be.equal('0');
    });

    it('#4', () => {
      calci.sub('989', '89').should.be.equal('900');
    });

    it('#5', () => {
      calci.sub('555', '555').should.be.equal('0');
    });

    it('#6', () => {
      calci.sub('9000000', '1111111').should.be.equal('7888889');
    });

    it('#7', () => {
      calci.sub('34', '55').should.be.equal('-21');
    });
  });

  describe('first negative numbers', () => {
    it('#1', () => {
      calci.sub('-60', '90').should.be.equal('-150');
    });

    it('#2', () => {
      calci.sub('-150', '90').should.be.equal('-240');
    });
  });

  describe('second negative numbers', () => {
    it('#1', () => {
      calci.sub('60', '-90').should.be.equal('150');
    });
  });
});
