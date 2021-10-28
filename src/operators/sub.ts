import { normalize, toggleSign } from '../core/helpers';

import { add } from './add';

/**
 *    @Name: sub
 *    @Description: Subtract two numbers.
 *    @params {string} inputNumOne - number for subtraction.
 *    @params {string} inputNumTwo - number for subtraction.
 *    @return addition of numbers.
 */
export const sub = function sub(inputNumOne: string, inputNumTwo: string) {
  return add(normalize(inputNumOne), toggleSign(normalize(inputNumTwo)));
};
