import { ADDITION_UNIT } from '../core/defaults';

import { normalize, toggleSign, abs } from '../utils/helpers';

import { lt, gt } from './comparison';

import { isNegative, isPositive } from '../core/validation';

import { OperationOptionsStructure } from '../interfaces/common';

import { addPositive, subPositive } from '../core/signedOperations';

/**
 *    @Name: add
 *    @Description: Add two numbers.
 *    @params {string} inputNumOne - number for addition.
 *    @params {string} inputNumTwo - number for addition.
 *    @return addition of numbers.
 */
export const add = (inputNumOne: string, inputNumTwo: string) => {
  const numOne = normalize(inputNumOne);

  const numTwo = normalize(inputNumTwo);

  const option: OperationOptionsStructure = { additionUnit: ADDITION_UNIT };

  //  If both numbers are negative
  if (isNegative(numOne) && isNegative(numTwo)) {
    return toggleSign(
      addPositive(toggleSign(numOne), toggleSign(numTwo), '0', option),
    );
  }

  // If both numbers are positive
  if (isPositive(numOne) && isPositive(numTwo)) {
    return addPositive(numOne, numTwo, '0', option);
  }

  // If first number is negative and second number is positive
  if (isNegative(numOne)) {
    let ret = subPositive(abs(numOne), abs(numTwo), option);

    // Make result as negative if absolute value of first number
    // is greater than second number
    if (gt(abs(numOne), abs(numTwo))) {
      ret = toggleSign(ret);
    }

    return ret;
  }

  // If first number is positive and second number is negative.
  // And absolute value of first number is less than second number.
  if (lt(abs(numOne), abs(numTwo))) {
    return toggleSign(subPositive(abs(numOne), abs(numTwo), option));
  }

  // If first number is positive and second number is negative.
  // And absolute value of first number is greater than second number.
  return subPositive(abs(numOne), abs(numTwo), option);
};
