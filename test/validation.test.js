const {performance} = require('perf_hooks');

const {isNumber, isZero} = require('../src/validation');

let startTime = null;

let debug = false;

describe('Test Validation functionality', () => {
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

  describe('isNumber', () => {
    describe('positive no with out sign', () => {
      it('#1', () => {
        isNumber('1231231').should.be.equal(true);
      });

      it('#2', () => {
        isNumber('41431234002342342134234').should.be.equal(true);
      });

      it('#3', () => {
        isNumber('  7867234745756  ').should.be.equal(true);
      });
    });

    describe('positive no with sign', () => {
      it('#1', () => {
        isNumber('+1231231').should.be.equal(true);
      });

      it('#2', () => {
        isNumber('+2345234523453').should.be.equal(true);
      });

      it('#3', () => {
        isNumber('  +925465672783565  ').should.be.equal(true);
      });
    });

    describe('invalid positive no with sign', () => {
      it('#1', () => {
        isNumber('  +8945645023423421q34234  ').should.be.equal(false);
      });

      it('#2', () => {
        isNumber('s  +9754567575  a').should.be.equal(false);
      });
    });

    describe('not number', () => {
      it('#1', () => {
        isNumber('-+9754567575').should.be.equal(false);
      });
    });

    describe('check for zero', () => {
      it('#1', () => {
        isNumber('00000000').should.be.equal(true);
      });
    });

    describe('check for zero with positive sign', () => {
      it('#1', () => {
        isNumber('+00000000').should.be.equal(true);
      });
    });

    describe('check for zero with negative sign', () => {
      it('#1', () => {
        isNumber('-00000000').should.be.equal(true);
      });
    });

    describe('check for single digit zero', () => {
      it('#1', () => {
        isNumber('0').should.be.equal(true);
      });
    });

    describe('check for single digit zero with negative sign', () => {
      it('#1', () => {
        isNumber('-0').should.be.equal(true);
      });
    });

    describe('check for single digit zero with positive sign', () => {
      it('#1', () => {
        isNumber('+0').should.be.equal(true);
      });
    });
  });

  describe('isZero', () => {
    describe('check for zero', () => {
      it('#1', () => {
        isZero('23432').should.be.equal(false);
      });

      it('#2', () => {
        isZero('00').should.be.equal(true);
      });

      it('#3', () => {
        isZero('-0000').should.be.equal(true);
      });

      it('#4', () => {
        isZero('+000000').should.be.equal(true);
      });

      it('#5', () => {
        isZero('+435345').should.be.equal(false);
      });

      it('#6', () => {
        isZero('-5675435345').should.be.equal(false);
      });
    });
  });
});
