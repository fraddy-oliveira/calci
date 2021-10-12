import {expect} from 'chai';

import {performance} from 'perf_hooks';

import {toggleSign, normalize} from '../core/helpers';

let startTime: number = 0;

let debug = false;

describe('Toggle sign of number', () => {
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

  describe('Toggle positive number', () => {
    it('12423123 should be -12423123', () => {
      expect(toggleSign('12423123')).to.equal('-12423123');
    });
  });

  describe('Toggle negative number', () => {
    it('-9587373 should be 9587373', () => {
      expect(toggleSign('-9587373')).to.equal('9587373');
    });
  });

  describe('Toggle zero number with negative sign', () => {
    it('-0000 should be 0000', () => {
      expect(toggleSign('-0000')).to.equal('0000');
    });
  });

  describe('Toggle zero number with positive sign', () => {
    it('000000 should be -000000', () => {
      expect(toggleSign('000000')).to.equal('-000000');
    });
  });
});

describe('Normalize number', () => {
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

  describe('positive number', () => {
    it('+12423123  should normalize to 12423123', () => {
      expect(normalize('+12423123 ')).to.equal('12423123');
    });
  });

  describe('negative number', () => {
    it(' -12423123 should be -12423123', () => {
      expect(normalize(' -12423123')).to.equal('-12423123');
    });

    it(' -00012423123  should be -12423123', () => {
      expect(normalize(' -00012423123 ')).to.equal('-12423123');
    });

    it('-000 should be 0', () => {
      expect(normalize('-000')).to.equal('0');
    });

    it('-00001 should be -1', () => {
      expect(normalize('-00001')).to.equal('-1');
    });
  });

  describe('zero number', () => {
    it('-000 should be 0', () => {
      expect(normalize('-000')).to.equal('0');
    });

    it('+000 should be 0', () => {
      expect(normalize('+000')).to.equal('0');
    });

    it('000 should be 0', () => {
      expect(normalize('000')).to.equal('0');
    });
  });

  describe('blank number', () => {
    it('empty string should be 0', () => {
      expect(normalize('')).to.equal('0');
    });

    it('blank string should be 0', () => {
      expect(normalize('  ')).to.equal('0');
    });
  });

  describe('invalid number', () => {
    it('- is illegal number', () => {
      expect(() => normalize(' - ')).to.throw('Illegal number');
    });

    it('12423dd123 is illegal', () => {
      expect(() => normalize('12423dd123')).to.throw('Illegal number');
    });
  });
});
