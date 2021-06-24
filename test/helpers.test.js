const chaiPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiPromised);

const should = chai.should();

const {expect} = chai;

const {performance} = require('perf_hooks');

const {toggleSign, normalize} = require('../src/helpers.js');

let startTime = null;

let debug = false;

describe('Test helper functionality', () => {
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

  describe('toggleSign', () => {
    describe('positive number', () => {
      it('#1', () => {
        toggleSign('12423123').should.be.equal('-12423123');
      });
    });

    describe('negative number', () => {
      it('#1', () => {
        toggleSign('-9587373').should.be.equal('9587373');
      });
    });

    describe('zero number with negative sign', () => {
      it('#1', () => {
        toggleSign('-0000').should.be.equal('0000');
      });
    });

    describe('zero number with positive sign', () => {
      it('#1', () => {
        toggleSign('000000').should.be.equal('-000000');
      });
    });
  });
  describe('normalize', () => {
    describe('positive number', () => {
      it('#1', () => {
        normalize('+12423123 ').should.be.equal('12423123');
      });
    });

    describe('negative number', () => {
      it('#1', () => {
        normalize(' -12423123').should.be.equal('-12423123');
      });

      it('#2', () => {
        normalize(' -00012423123 ').should.be.equal('-12423123');
      });

      it('#3', () => {
        normalize('-000').should.be.equal('0');
      });

      it('#4', () => {
        normalize('-00001').should.be.equal('-1');
      });
    });

    describe('zero number', () => {
      it('#1', () => {
        normalize('-000').should.be.equal('0');
      });

      it('#2', () => {
        normalize('+000').should.be.equal('0');
      });

      it('#3', () => {
        normalize('000').should.be.equal('0');
      });
    });

    describe('blank number', () => {
      it('#1', () => {
        normalize('').should.be.equal('0');
      });

      it('#2', () => {
        normalize('  ').should.be.equal('0');
      });
    });

    describe('invalid number', () => {
      it('#1', () => {
        expect(() => normalize(' - ')).to.throw('Illegal number');
      });

      it('#2', () => {
        expect(() => normalize('12423dd123')).to.throw('Illegal number');
      });
    });
  });
});
