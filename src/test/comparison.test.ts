import {performance} from 'perf_hooks';
import {expect} from 'chai';

import {lt} from '../operators/comparison';

let startTime: number = 0;

let debug = false;

describe.only('less than operation', () => {
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
    it('123 is less than 2342 is true', () => {
      expect(lt('123', '2342')).to.be.true;
    });

    it('123213 is less than 2342 is false', () => {
      expect(lt('123213', '2342')).to.be.false;
    });
  });

  describe('both negative number', () => {
    it('-123213 is less than -2342 is true', () => {
      expect(lt('-123213', '-2342')).to.be.true;
    });

    it('-4564 is less than -346354535 is false', () => {
      expect(lt('-4564', '-346354535')).to.be.false;
    });
  });

  describe('one negative and one positive number', () => {
    it('-4564 is less than 346354535 is true', () => {
      expect(lt('-4564', '346354535')).to.be.true;
    });

    it('4564 is less than -346354535 is false', () => {
      expect(lt('4564', '-346354535')).to.be.false;
    });

    it('0 is less than -346354535 is false', () => {
      expect(lt('0', '-346354535')).to.be.false;
    });

    it('-4534 is less than -0 is true', () => {
      expect(lt('-4534', '-0')).to.be.true;
    });
  });

  describe('both zeroes number', () => {
    it('000 is less than -000 is false', () => {
      expect(lt('000', '-000')).to.be.false;
    });

    it('00000 is less than 00000 is false', () => {
      expect(lt('00000', '00000')).to.be.false;
    });

    it('+0 is less than -0 is false', () => {
      expect(lt('+0', '-0')).to.be.false;
    });

    it('000 is less than 0000 is false', () => {
      expect(lt('000', '0000')).to.be.false;
    });

    it('0 is less than 0 is false', () => {
      expect(lt('0', '0')).to.be.false;
    });
  });
});
