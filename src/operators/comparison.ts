import { isZero, isNegative, isPositive } from '../core/validation';

import { abs } from '../utils/helpers';

import { ltPositive } from '../core/comparison';

export const eq = (numOne: string, numTwo: string) => numOne === numTwo;

export const lt = (numOne: string, numTwo: string) => {
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
