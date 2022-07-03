import { normalize, toggleSign } from '../utils/helpers';

import { add } from './add';

/**
 *    @Name: subtract
 *    @Description: Subtract two numbers.
 *    @params {string} inputNumOne - number for subtraction.
 *    @params {string} inputNumTwo - number for subtraction.
 *    @return addition of numbers.
 */
export const subtract = (inputNumOne: string, inputNumTwo: string) =>
  add(normalize(inputNumOne), toggleSign(normalize(inputNumTwo)));
