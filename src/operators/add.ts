import {ADDITION_UNIT} from '../defaults.js';

import {normalize, toggleSign, abs} from '../helpers';

import {lt} from '../comparison';

import {isNegative, isPositive} from '../validation';

import {OperationOptionsStructure} from '../abstraction/interfaces';

import {addPositive, subPositive} from '../signedOperations';

/**
 *    @Name: add
 *    @Description: Add two numbers.
 *    @params {string} inputNumOne - number for addition.
 *    @params {string} inputNumTwo - number for addition.
 *    @return addition of numbers.
 */
export const add = (inputNumOne: string, inputNumTwo: string) => {
  let ret = '';

  let numOne = inputNumOne;

  let numTwo = inputNumTwo;

  const option: OperationOptionsStructure = {additionUnit: ADDITION_UNIT};

  numOne = normalize(numOne);

  numTwo = normalize(numTwo);

  if (isNegative(numOne) && isNegative(numTwo)) {
    ret = toggleSign(
      addPositive(toggleSign(numOne), toggleSign(numTwo), '0', option),
    );
  } else if (isPositive(numOne) && isPositive(numTwo)) {
    ret = addPositive(numOne, numTwo, '0', option);
  } else if (isNegative(numOne)) {
    ret = subPositive(abs(numOne), abs(numTwo), option);
    if (!lt(abs(numOne), abs(numTwo))) {
      ret = toggleSign(ret);
    }
  } else if (lt(abs(numOne), abs(numTwo))) {
    ret = toggleSign(subPositive(abs(numOne), abs(numTwo), option));
  } else {
    ret = subPositive(abs(numOne), abs(numTwo), option);
  }

  return ret;
};

/**
 *    @Name: addArray
 *    @Description: Add numbers from array.
 *    @params {array} numArr - list of numbers.
 *    @return addition of numbers.
 */
export const addArray = (numArr: Array<string>) => {
  let ret = '';
  if (Array.isArray(numArr) && numArr.length > 0) {
    [ret] = numArr;
    for (let i = 1; i < numArr.length; ) {
      ret = add(numArr[i], ret);
      i += 1;
    }
  }
  return ret;
};
