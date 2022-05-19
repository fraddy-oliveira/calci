import { ADDITION_UNIT } from '../core/defaults';

import { normalize, toggleSign, abs } from '../utils/helpers';

import { isNegative, isPositive, isZero } from '../core/validation';

import { OperationOptionsStructure } from '../interfaces/common';

import { mulPositive } from '../core/signedOperations';

/**
 *    @Name: mul
 *    @Description: Multiply two numbers.
 *    @params {string} inputNumOne.
 *    @params {string} inputNumTwo.
 *    @return multiplication of numbers.
 */
export const mul = (inputNumOne: string, inputNumTwo: string) => {
  let ret = '';

  const option: OperationOptionsStructure = { additionUnit: ADDITION_UNIT };

  const numOne = normalize(inputNumOne);
  const numTwo = normalize(inputNumTwo);
  if (
    (isNegative(numOne) && isNegative(numTwo))
    || (isPositive(numOne) && isPositive(numTwo))
  ) {
    ret = mulPositive(abs(numOne), abs(numTwo), option);
  } else {
    ret = mulPositive(abs(numOne), abs(numTwo), option);
    if (!isZero(ret)) {
      ret = toggleSign(ret);
    }
  }

  return ret;
};
