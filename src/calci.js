const {ADDITION_UNIT} = require('./defaults.js');

const {normalize, toggleSign, abs} = require('./helpers.js');

const {lt} = require('./comparison.js');

const {isNegative, isPositive, isZero} = require('./validation.js');

const {
  addPositive,
  subPositive,
  mulPositive,
} = require('./signedOperations.js');

/**
 *    @Name: add
 *    @Description: Add two numbers.
 *    @params {string} inputNumOne - number for addition.
 *    @params {string} inputNumTwo - number for addition.
 *    @return addition of numbers.
 */
const add = (inputNumOne, inputNumTwo) => {
  let ret = '';

  let numOne = inputNumOne;

  let numTwo = inputNumTwo;

  const option = {};

  option.additionUnit = ADDITION_UNIT;

  numOne = normalize(numOne);

  numTwo = normalize(numTwo);

  if (isNegative(numOne) && isNegative(numTwo)) {
    ret = toggleSign(
      addPositive(toggleSign(numOne), toggleSign(numTwo), 0, option),
    );
  } else if (isPositive(numOne) && isPositive(numTwo)) {
    ret = addPositive(numOne, numTwo, 0, option);
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
 *    @Name: sub
 *    @Description: Subtract two numbers.
 *    @params {string} inputNumOne - number for subtraction.
 *    @params {string} inputNumTwo - number for subtraction.
 *    @return addition of numbers.
 */
const sub = (inputNumOne, inputNumTwo) => {
  return add(normalize(inputNumOne), toggleSign(normalize(inputNumTwo)));
};

/**
 *    @Name: addArray
 *    @Description: Add numbers from array.
 *    @params {array} numArr - list of numbers.
 *    @return addition of numbers.
 */
const addArray = (numArr) => {
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

/**
 *    @Name: mul
 *    @Description: Multiply two numbers.
 *    @params {string} inputNumOne.
 *    @params {string} inputNumTwo.
 *    @return multiplication of numbers.
 */
const mul = (inputNumOne, inputNumTwo) => {
  let ret = '';
  const option = {};

  option.additionUnit = ADDITION_UNIT;

  const numOne = normalize(inputNumOne);
  const numTwo = normalize(inputNumTwo);
  if (
    (isNegative(numOne) && isNegative(numTwo)) ||
    (isPositive(numOne) && isPositive(numTwo))
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

module.exports = {
  add: add,
  sub: sub,
  lt: lt,
  mul: mul,
  addFromArray: addArray,
};
