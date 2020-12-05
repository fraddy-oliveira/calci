const {isZero, isNegative, isPositive} = require('./validation.js');

const {normalize, addLeftPadding, abs} = require('./helpers.js');

const eq = (numOne, numTwo) => normalize(numOne) === normalize(numTwo);

const ltPositive = (numOne, numTwo) => {
  if (isNegative(numOne) || isNegative(numTwo)) {
    throw new Error(`Both operands must be positive: ${numOne} ${numTwo}`);
  }

  const maxLength = Math.max(numOne.length, numTwo.length);

  const lhs = addLeftPadding(numOne, maxLength - numOne.length);

  const rhs = addLeftPadding(numTwo, maxLength - numTwo.length);

  return lhs < rhs; // lexicographical comparison
};

const lt = (inputNumOne, inputNumTwo) => {
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

const lte = (numOne, numTwo) => lt(numOne, numTwo) || eq(numOne, numTwo);

const gt = (numOne, numTwo) => !lt(numOne, numTwo);

const gte = (numOne, numTwo) => gt(numOne, numTwo) || eq(numOne, numTwo);

module.exports = {lt, eq, lte, gt, gte};
