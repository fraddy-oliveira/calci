import { isNegative } from './validation';

import { addLeftPadding } from '../utils/helpers';

export const ltPositive = (numOne: string, numTwo: string) => {
  if (isNegative(numOne) || isNegative(numTwo)) {
    throw new Error(`Both operands must be positive: ${numOne} ${numTwo}`);
  }

  const maxLength = Math.max(numOne.length, numTwo.length);

  const lhs = addLeftPadding(numOne, maxLength - numOne.length);

  const rhs = addLeftPadding(numTwo, maxLength - numTwo.length);

  return lhs < rhs; // lexicographical comparison
};
