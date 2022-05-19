import { expect } from 'chai';

import { isNumber, isZero } from '../core/validation';

describe('Test Validation functionality', () => {
  describe('isNumber', () => {
    describe('positive no with out sign', () => {
      it('#1', () => {
        expect(isNumber('1231231')).to.be.true;
      });

      it('#2', () => {
        expect(isNumber('41431234002342342134234')).to.be.true;
      });

      it('#3', () => {
        expect(isNumber('  7867234745756  ')).to.be.true;
      });
    });

    describe('positive no with sign', () => {
      it('#1', () => {
        expect(isNumber('+1231231')).to.be.true;
      });

      it('#2', () => {
        expect(isNumber('+2345234523453')).to.be.true;
      });

      it('#3', () => {
        expect(isNumber('  +925465672783565  ')).to.be.true;
      });
    });

    describe('invalid positive no with sign', () => {
      it('#1', () => {
        expect(isNumber('  +8945645023423421q34234  ')).to.be.false;
      });

      it('#2', () => {
        expect(isNumber('s  +9754567575  a')).to.be.false;
      });
    });

    describe('not number', () => {
      it('#1', () => {
        expect(isNumber('-+9754567575')).to.be.false;
      });
    });

    describe('check for zero', () => {
      it('#1', () => {
        expect(isNumber('00000000')).to.be.true;
      });
    });

    describe('check for zero with positive sign', () => {
      it('#1', () => {
        expect(isNumber('+00000000')).to.be.true;
      });
    });

    describe('check for zero with negative sign', () => {
      it('#1', () => {
        expect(isNumber('-00000000')).to.be.true;
      });
    });

    describe('check for single digit zero', () => {
      it('#1', () => {
        expect(isNumber('0')).to.be.true;
      });
    });

    describe('check for single digit zero with negative sign', () => {
      it('#1', () => {
        expect(isNumber('-0')).to.be.true;
      });
    });

    describe('check for single digit zero with positive sign', () => {
      it('#1', () => {
        expect(isNumber('+0')).to.be.true;
      });
    });
  });

  describe('isZero', () => {
    describe('check for zero', () => {
      it('#1', () => {
        expect(isZero('23432')).to.be.false;
      });

      it('#2', () => {
        expect(isZero('00')).to.be.true;
      });

      it('#3', () => {
        expect(isZero('-0000')).to.be.true;
      });

      it('#4', () => {
        expect(isZero('+000000')).to.be.true;
      });

      it('#5', () => {
        expect(isZero('+435345')).to.be.false;
      });

      it('#6', () => {
        expect(isZero('-5675435345')).to.be.false;
      });
    });
  });
});
