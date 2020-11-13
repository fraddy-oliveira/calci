const chaiPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiPromised);

/* eslint-disable no-unused-vars */

const should = chai.should();

/* eslint-enable no-unused-vars */

const {expect} = chai;

const {performance} = require('perf_hooks');

const rewire = require('rewire');

const appInternal = rewire('../src/calci');
const validationInternal = rewire('../src/validation');

let startTime = null;

/* eslint-disable prefer-const */

let debug = false;

/* eslint-enable prefer-const */

/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

describe('Test internal function', () => {
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
        appInternal
          .__get__('toggleSign')('12423123')
          .should.be.equal('-12423123');
      });
    });

    describe('negative number', () => {
      it('#1', () => {
        appInternal
          .__get__('toggleSign')('-9587373')
          .should.be.equal('9587373');
      });
    });

    describe('zero number with negative sign', () => {
      it('#1', () => {
        appInternal.__get__('toggleSign')('-0000').should.be.equal('0000');
      });
    });

    describe('zero number with positive sign', () => {
      it('#1', () => {
        appInternal.__get__('toggleSign')('000000').should.be.equal('-000000');
      });
    });
  });
  describe('normalize', () => {
    describe('positive number', () => {
      it('#1', () => {
        appInternal
          .__get__('normalize')('+12423123 ')
          .should.be.equal('12423123');
      });
    });

    describe('negative number', () => {
      it('#1', () => {
        appInternal
          .__get__('normalize')(' -12423123')
          .should.be.equal('-12423123');
      });

      it('#2', () => {
        appInternal
          .__get__('normalize')(' -00012423123 ')
          .should.be.equal('-12423123');
      });

      it('#3', () => {
        appInternal.__get__('normalize')('-000').should.be.equal('0');
      });

      it('#4', () => {
        appInternal.__get__('normalize')('-00001').should.be.equal('-1');
      });
    });

    describe('zero number', () => {
      it('#1', () => {
        appInternal.__get__('normalize')('-000').should.be.equal('0');
      });

      it('#2', () => {
        appInternal.__get__('normalize')('+000').should.be.equal('0');
      });

      it('#3', () => {
        appInternal.__get__('normalize')('000').should.be.equal('0');
      });
    });

    describe('blank number', () => {
      it('#1', () => {
        appInternal.__get__('normalize')('').should.be.equal('0');
      });

      it('#2', () => {
        appInternal.__get__('normalize')('  ').should.be.equal('0');
      });
    });

    describe('invalid number', () => {
      it('#1', () => {
        expect(() => appInternal.__get__('normalize')(' - ')).to.throw(
          'Illegal number',
        );
      });

      it('#2', () => {
        expect(() => appInternal.__get__('normalize')('12423dd123')).to.throw(
          'Illegal number',
        );
      });
    });
  });
  describe('isNumber', () => {
    describe('positive no with out sign', () => {
      it('#1', () => {
        validationInternal.__get__('isNumber')('1231231').should.be.equal(true);
      });

      it('#2', () => {
        validationInternal
          .__get__('isNumber')('41431234002342342134234')
          .should.be.equal(true);
      });

      it('#3', () => {
        validationInternal
          .__get__('isNumber')('  7867234745756  ')
          .should.be.equal(true);
      });
    });

    describe('positive no with sign', () => {
      it('#1', () => {
        validationInternal
          .__get__('isNumber')('+1231231')
          .should.be.equal(true);
      });

      it('#2', () => {
        validationInternal
          .__get__('isNumber')('+2345234523453')
          .should.be.equal(true);
      });

      it('#3', () => {
        validationInternal
          .__get__('isNumber')('  +925465672783565  ')
          .should.be.equal(true);
      });
    });

    describe('invalid positive no with sign', () => {
      it('#1', () => {
        validationInternal
          .__get__('isNumber')('  +8945645023423421q34234  ')
          .should.be.equal(false);
      });

      it('#2', () => {
        validationInternal
          .__get__('isNumber')('s  +9754567575  a')
          .should.be.equal(false);
      });
    });

    describe('not number', () => {
      it('#1', () => {
        validationInternal
          .__get__('isNumber')('-+9754567575')
          .should.be.equal(false);
      });
    });

    describe('check for zero', () => {
      it('#1', () => {
        validationInternal
          .__get__('isNumber')('00000000')
          .should.be.equal(true);
      });
    });

    describe('check for zero with positive sign', () => {
      it('#1', () => {
        validationInternal
          .__get__('isNumber')('+00000000')
          .should.be.equal(true);
      });
    });

    describe('check for zero with negative sign', () => {
      it('#1', () => {
        validationInternal
          .__get__('isNumber')('-00000000')
          .should.be.equal(true);
      });
    });

    describe('check for single digit zero', () => {
      it('#1', () => {
        validationInternal.__get__('isNumber')('0').should.be.equal(true);
      });
    });

    describe('check for single digit zero with negative sign', () => {
      it('#1', () => {
        validationInternal.__get__('isNumber')('-0').should.be.equal(true);
      });
    });

    describe('check for single digit zero with positive sign', () => {
      it('#1', () => {
        validationInternal.__get__('isNumber')('+0').should.be.equal(true);
      });
    });
  });
  describe('isZero', () => {
    describe('check for zero', () => {
      it('#1', () => {
        appInternal.__get__('isZero')('23432').should.be.equal(false);
      });

      it('#2', () => {
        appInternal.__get__('isZero')('00').should.be.equal(true);
      });

      it('#3', () => {
        appInternal.__get__('isZero')('-0000').should.be.equal(true);
      });

      it('#4', () => {
        appInternal.__get__('isZero')('+000000').should.be.equal(true);
      });

      it('#5', () => {
        appInternal.__get__('isZero')('+435345').should.be.equal(false);
      });

      it('#6', () => {
        appInternal.__get__('isZero')('-5675435345').should.be.equal(false);
      });
    });
  });
});

/* eslint-enable no-undef */
/* eslint-enable no-underscore-dangle */
