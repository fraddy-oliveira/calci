import { isZero, isNegative, isPositive } from '../core/validation';

import { normalize, addLeftPadding, abs } from '../core/helpers';

export const eq = (numOne: string, numTwo: string) =>
  normalize(numOne) === normalize(numTwo);

const ltPositive = (numOne: string, numTwo: string) => {
  if (isNegative(numOne) || isNegative(numTwo)) {
    throw new Error(`Both operands must be positive: ${numOne} ${numTwo}`);
  }

  const maxLength = Math.max(numOne.length, numTwo.length);

  const lhs = addLeftPadding(numOne, maxLength - numOne.length);

  const rhs = addLeftPadding(numTwo, maxLength - numTwo.length);

  return lhs < rhs; // lexicographical comparison
};

export const lt = (inputNumOne: string, inputNumTwo: string) => {
  const numOne = normalize(inputNumOne);

  const numTwo = normalize(inputNumTwo);

  let isLt = false;

  if (isZero(numOne) && isZero(numTwo)) {
    isLt = false;
  } else if (isNegative(numOne) && isPositive(numTwo)) {
    isLt = true;
  } else if (isPositive(numOne) && isNegative(numTwo)) {
    isLt = false;
  } else if (isNegative(numOne) && isNegative(numTwo)) {
    isLt = !ltPositive(abs(numOne), abs(numTwo));
  } else {
    isLt = !!ltPositive(numOne, numTwo);
  }

  return isLt;
};

export const lte = (numOne: string, numTwo: string) =>
  lt(numOne, numTwo) || eq(numOne, numTwo);

export const gt = (numOne: string, numTwo: string) => !lt(numOne, numTwo);

export const gte = (numOne: string, numTwo: string) =>
  gt(numOne, numTwo) || eq(numOne, numTwo);
