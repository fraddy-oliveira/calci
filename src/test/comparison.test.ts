import chaiPromised from 'chai-as-promised';
import chai from 'chai';

chai.use(chaiPromised);

const should = chai.should();

import {performance} from 'perf_hooks';

import {lt} from '../operators/comparison';

let startTime: number = 0;

let debug = false;

describe('less than (lt)', () => {
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

  describe('both positive number', () => {
    it('#1', () => {
      lt('123', '2342').should.be.equal(true);
    });

    it('#2', () => {
      lt('123213', '2342').should.be.equal(false);
    });
  });

  describe('both negative number', () => {
    it('#1', () => {
      lt('-123213', '-2342').should.be.equal(true);
    });

    it('#2', () => {
      lt('-4564', '-346354535').should.be.equal(false);
    });
  });

  describe('one negative and one positive number', () => {
    it('#1', () => {
      lt('-4564', '346354535').should.be.equal(true);
    });

    it('#2', () => {
      lt('4564', '-346354535').should.be.equal(false);
    });

    it('#3', () => {
      lt('0', '-346354535').should.be.equal(false);
    });

    it('#4', () => {
      lt('-4534', '-0').should.be.equal(true);
    });
  });

  describe('both zeroes number', () => {
    it('#1', () => {
      lt('000', '-000').should.be.equal(false);
    });

    it('#2', () => {
      lt('00000', '00000').should.be.equal(false);
    });

    it('#3', () => {
      lt('+0', '-0').should.be.equal(false);
    });

    it('#4', () => {
      lt('000', '0000').should.be.equal(false);
    });

    it('#5', () => {
      lt('0', '0').should.be.equal(false);
    });
  });
});
