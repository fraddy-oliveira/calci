const {RE_IS_NUMBER, RE_IS_ZERO} = require('./patterns.js');

const {isNegative} = require('./validation.js');

/**
 *    @Name: normalize
 *    @Description: detect input which is not number and throws error.
 *    @Note: keep zero dependencies on this library for this function.
 *    @params {string} num - string to be manipulated.
 *    @return string that can used to perform operations.
 */

const normalize = (inputNum) => {
  let num = inputNum.toString().trim();

  num = num ? num.replace(/^\++/g, '') : '0';

  if (RE_IS_ZERO.exec(num)) {
    return '0';
  }

  const match = RE_IS_NUMBER.exec(num);

  if (!match) {
    throw new Error(`Illegal number : ${num}`);
  }

  return match[1] + match[2].replace(/^0+/g, '');
};

const adder = (a, b, carry) =>
  (
    (a ? parseInt(a, 10) : 0) +
    (b ? parseInt(b, 10) : 0) +
    (carry ? parseInt(carry, 10) : 0)
  ).toString();

const subtractor = (a, b) =>
  ((a ? parseInt(a, 10) : 0) - (b ? parseInt(b, 10) : 0)).toString();

const multiplier = (a, b, carry) =>
  (
    (a ? parseInt(a, 10) : 0) * (b ? parseInt(b, 10) : 0) +
    (carry ? parseInt(carry, 10) : 0)
  ).toString();

const addPadding = (num, paddingLength, inputType) => {
  const type = inputType === undefined ? 'left' : inputType;

  let numString = '';

  Array.from({length: paddingLength}, () => {
    numString += '0';

    return 0;
  });

  return type === 'left' ? numString + num : num + numString;
};

const toggleSign = (num) => {
  if (isNegative(num)) {
    return num.slice(1);
  }

  return `-${num}`;
};

const addLeftPadding = (num, paddingLength) =>
  addPadding(num, paddingLength, 'left');

const addRightPadding = (num, paddingLength) =>
  addPadding(num, paddingLength, 'right');

const abs = (num) => num.replace(/^([-+]?)/, '');

module.exports = {
  normalize,
  adder,
  subtractor,
  addPadding,
  toggleSign,
  addLeftPadding,
  addRightPadding,
  multiplier,
  abs,
};
