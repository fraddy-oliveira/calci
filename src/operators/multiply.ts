import { ADDITION_UNIT } from '../core/defaults';

import { toggleSign, abs } from '../utils/helpers';

import { isNegative, isPositive, isZero } from '../core/validation';

import { OperationOptionsStructure } from '../interfaces/common';

import { mulPositive } from '../core/signedOperations';

/**
 *    @Name: multiply
 *    @Description: Multiply two numbers.
 *    @params {string} inputNumOne.
 *    @params {string} inputNumTwo.
 *    @return multiplication of numbers.
 */
export const multiply = (numOne: string, numTwo: string) => {
  let ret = '';

  const option: OperationOptionsStructure = { additionUnit: ADDITION_UNIT };

  ret = mulPositive(abs(numOne), abs(numTwo), option);

  //  Check if both numbers have different sign
  if (
    (isNegative(numOne) && isPositive(numTwo))
    || (isPositive(numOne) && isNegative(numTwo))
  ) {
    //  TODO: include check for zero in toggleSign function
    if (!isZero(ret)) {
      ret = toggleSign(ret);
    }
  }

  return ret;
};
