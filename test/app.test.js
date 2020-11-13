const chaiPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiPromised);

/* eslint-disable no-unused-vars */

const should = chai.should();

/* eslint-enable no-unused-vars */

const {performance} = require('perf_hooks');

const calci = require('../src/calci');

let startTime = null;

/* eslint-disable prefer-const */

let debug = false;

/* eslint-enable prefer-const */

/* eslint-disable no-undef */

describe('less than (lt)', () => {
  beforeEach(() => {
    startTime = performance.now();
  });

  afterEach(() => {
    if (debug) {
      // print seconds required to execute each test case.
      console.log(`timediff: ${performance.now() - startTime}`);
    }
    startTime = null;
  });

  describe('both positive number', () => {
    it('#1', () => {
      calci.lt('123', '2342').should.be.equal(true);
    });

    it('#2', () => {
      calci.lt('123213', '2342').should.be.equal(false);
    });
  });

  describe('both negative number', () => {
    it('#1', () => {
      calci.lt('-123213', '-2342').should.be.equal(true);
    });

    it('#2', () => {
      calci.lt('-4564', '-346354535').should.be.equal(false);
    });
  });

  describe('one negative and one positive number', () => {
    it('#1', () => {
      calci.lt('-4564', '346354535').should.be.equal(true);
    });

    it('#2', () => {
      calci.lt('4564', '-346354535').should.be.equal(false);
    });

    it('#3', () => {
      calci.lt('0', '-346354535').should.be.equal(false);
    });

    it('#4', () => {
      calci.lt('-4534', '-0').should.be.equal(true);
    });
  });

  describe('both zeroes number', () => {
    it('#1', () => {
      calci.lt('000', '-000').should.be.equal(false);
    });

    it('#2', () => {
      calci.lt('00000', '00000').should.be.equal(false);
    });

    it('#3', () => {
      calci.lt('+0', '-0').should.be.equal(false);
    });

    it('#4', () => {
      calci.lt('000', '0000').should.be.equal(false);
    });

    it('#5', () => {
      calci.lt('0', '0').should.be.equal(false);
    });
  });
});

/* eslint-enable no-undef */
