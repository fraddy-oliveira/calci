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

describe('subtract (sub)', () => {
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

/* eslint-enable no-undef */
