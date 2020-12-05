const {ADDITION_UNIT} = require('./defaults.js');

const {normalize, toggleSign, abs} = require('./helpers.js');

const {lt} = require('./comparison.js');

const {isNegative, isPositive, isZero} = require('./validation.js');

const {
  addPositive,
  subPositive,
  mulPositive,
} = require('./signedOperations.js');

//  Addition

const add = (inputNumOne, inputNumTwo) => {
  let ret = '';
  let numOne = inputNumOne;
  let numTwo = inputNumTwo;
  const option = {};

  option.additionUnit = ADDITION_UNIT;

  if (Array.isArray(numOne)) {
    ret = addArray(numOne);
  } else {
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
  }
  return ret;
};

const sub = (numOne, numTwo) => {
  return add(normalize(numOne), toggleSign(normalize(numTwo)));
};

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
};
