const {RE_IS_NUMBER, RE_IS_ZERO} = require('./patterns');

/**
 *    @Name: isNumber
 *    @Description: Check if value is number.
 *    @params {string} num.
 *    @return returns true is input is number else false.
 */

const isNumber = (num) => RE_IS_NUMBER.test(num.toString().trim());

/**
 *    @Name: isNegative
 *    @Description: Check if value is negative.
 *    @params {string} num.
 *    @return returns true is input is negative else false.
 */

const isNegative = (num) => num.toString().indexOf('-') === 0;

/**
 *    @Name: isPositive
 *    @Description: Check if value is positive.
 *    @params {string} num.
 *    @return returns true is input is positive else false.
 */

const isPositive = (num) => !isNegative(num);

/**
 *    @Name: isZero
 *    @Description: Check if value is zero.
 *    @params {string} num.
 *    @return returns true is input is zero else false.
 */

const isZero = (num) => !!RE_IS_ZERO.test(num);

module.exports = {isNumber, isNegative, isPositive, isZero};
