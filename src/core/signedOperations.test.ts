import { expect } from 'chai';
import { addPositive } from '../core/signedOperations';
import { ADDITION_UNIT } from '../core/defaults';
import * as mockAddPositive from './fixtures/mockAddPositive.json';

describe('addPositive', () => {
  type mockAddPositiveI = {list: {numOne:string, numTwo:string, result: string}[]}

  it('Verify test results from mockAddPositive.json file', () => {
    const options = { additionUnit: ADDITION_UNIT };

    (mockAddPositive as mockAddPositiveI).list.forEach((item) => {
      const result = addPositive(item.numOne, item.numTwo, '0', options);

      expect(result).to.be.equal(item.result);
    });
  });

  describe('Special cases for Addition operation', () => {
    it('Expect to sum large numbers', () => {
      const options = { additionUnit: ADDITION_UNIT };

      const numOne = '752749368535594182377233134417928629607859542192296476524204849670880250425934784064432754170507412607684844778562399858105464165016156558043324234877476589272932020597910575939261884494962059383462717147739154938692173433036963071966292735242258153213011663247483979576456801675701972165089144836916';

      const numTwo = '5952247832144133696614981369476275162278267324704148903210399273991970794474651631021858909905239125545584129464717093757500007750320413261592080131427124689423225279549071029316593942558684084820435978236571911198758230204209565531184487519799909130871347265777170772507066434278153412711165556921506';

      const mockResult = '6704997200679727878992214503894203791886126866896445379734604123662851044900586415086291664075746538153268974243279493615605471915336569819635404366304601278696157300146981605255855827053646144203898695384311066137450403637246528603150780255042167284084358929024654752083523235953855384876254701758422';

      const result = addPositive(numOne, numTwo, '0', options);

      expect(result).to.be.equal(mockResult);
    });
  });
});
