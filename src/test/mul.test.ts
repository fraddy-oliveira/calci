import { expect } from 'chai';

import { mul } from '../calci';

describe('multiply operation', () => {
  describe('first number negative and second number positive', () => {
    it('#1', () => {
      expect(mul('-12', '12')).to.equal('-144');
    });

    it('#2', () => {
      expect(mul('-000', '00001')).to.equal('0');
    });

    it('#3', () => {
      expect(mul('-000', '0000')).to.equal('0');
    });

    it('#4', () => {
      expect(mul('-100', '100')).to.equal('-10000');
    });

    it('#5', () => {
      const result = mul(
        '-872348723947324723947238947293847234732283478234783247893',
        '23489734892374932749237489503485094395555435439584390580',
      );

      expect(result).to.equal(
        '-20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940',
      );
    });

    it('#6', () => {
      const result = mul(
        '-23489734892374932749237489503485094395555435439584390580',
        '872348723947324723947238947293847234732283478234783247893',
      );

      expect(result).to.equal(
        '-20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940',
      );
    });

    it('#7', () => {
      const result = mul(
        '-1223489734892374932749237489503485094395555435439584390580',
        '32872348723947324723947238947293847234732283478234783247893',
      );

      expect(result).to.equal(
        '-40218981225552011738355807513786710644956418114572074681342694602048367563738184734951914168924668336638437474047940',
      );
    });

    it('#8', () => {
      const result = mul(
        '-24213421342342134123412342134123423423333333333333312342421342342421342134234213412341234213412342342333333333333331234242134234',
        '242134213423421341234123421341234234233333333333333123424213423425435345345325325234534',
      );

      expect(result).to.equal(
        '-5862897731017895563354347895515829861193226259556387249279481416948511964698067962133914423425726208677270449233028929459679293390385926573835444949407963387414322255794782327739020453173115175416370741420760436956',
      );
    });
  });
  describe('both positive numbers', () => {
    let numOne = '0';
    let numTwo = '0';

    beforeEach(() => {
      numOne = `${parseInt(`${Math.random() * 100000}`, 10)}`;
      numTwo = `${parseInt(`${Math.random() * 1000}`, 10)}`;
    });

    afterEach(() => {
      numOne = '0';
      numTwo = '0';
    });

    it('#1', () => {
      expect(mul(numOne, numTwo)).to.equal(
        (parseInt(numOne, 10) * parseInt(numTwo, 10)).toString(),
      );
    });

    it('#2', () => {
      expect(mul(numOne, numTwo)).to.equal(
        (parseInt(numOne, 10) * parseInt(numTwo, 10)).toString(),
      );
    });

    it('#3', () => {
      expect(mul(numOne, numTwo)).to.equal(
        (parseInt(numOne, 10) * parseInt(numTwo, 10)).toString(),
      );
    });

    it('#4', () => {
      expect(mul(numOne, numTwo)).to.equal(
        (parseInt(numOne, 10) * parseInt(numTwo, 10)).toString(),
      );
    });
  });

  describe('both numbers negative', () => {
    it('#1', () => {
      expect(mul('-12', '-12')).to.equal('144');
    });

    it('#2', () => {
      expect(mul('-000', '-00001')).to.equal('0');
    });

    it('#3', () => {
      expect(mul('-000', '-0000')).to.equal('0');
    });

    it('#4', () => {
      expect(mul('-100', '-100')).to.equal('10000');
    });

    it('#5', () => {
      const result = mul(
        '-872348723947324723947238947293847234732283478234783247893',
        '-23489734892374932749237489503485094395555435439584390580',
      );

      expect(result).to.equal(
        '20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940',
      );
    });

    it('#6', () => {
      const result = mul(
        '-23489734892374932749237489503485094395555435439584390580',
        '-872348723947324723947238947293847234732283478234783247893',
      );

      expect(result).to.equal(
        '20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940',
      );
    });

    it('#7', () => {
      const result = mul(
        '-1223489734892374932749237489503485094395555435439584390580',
        '-32872348723947324723947238947293847234732283478234783247893',
      );

      expect(result).to.equal(
        '40218981225552011738355807513786710644956418114572074681342694602048367563738184734951914168924668336638437474047940',
      );
    });

    it('#8', () => {
      const result = mul(
        '-24213421342342134123412342134123423423333333333333312342421342342421342134234213412341234213412342342333333333333331234242134234',
        '-242134213423421341234123421341234234233333333333333123424213423425435345345325325234534',
      );

      expect(result).to.equal(
        '5862897731017895563354347895515829861193226259556387249279481416948511964698067962133914423425726208677270449233028929459679293390385926573835444949407963387414322255794782327739020453173115175416370741420760436956',
      );
    });
  });
});
