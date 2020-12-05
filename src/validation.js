const {RE_IS_NUMBER, RE_IS_ZERO} = require('./patterns');

const isNumber = (num) => {
  return RE_IS_NUMBER.test(num.toString().trim());
};

const isNegative = (num) => num.toString().indexOf('-') === 0;

const isPositive = (num) => !isNegative(num);

const isZero = (num) => !!RE_IS_ZERO.test(num);

module.exports = {isNumber, isNegative, isPositive, isZero};
