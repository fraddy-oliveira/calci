import { RE_IS_NUMBER, RE_IS_ZERO } from './patterns';

/**
 *    @Name: isNumber
 *    @Description: Check if value is number.
 *    @params {string} num.
 *    @return returns true is input is number else false.
 */

export const isNumber = (num: string) => RE_IS_NUMBER.test(num.trim());

/**
 *    @Name: isNegative
 *    @Description: Check if value is negative.
 *    @params {string} num.
 *    @return returns true is input is negative else false.
 */

export const isNegative = (num: string) => num.indexOf('-') === 0;

/**
 *    @Name: isPositive
 *    @Description: Check if value is positive.
 *    @params {string} num.
 *    @return returns true is input is positive else false.
 */

export const isPositive = (num: string) => !isNegative(num);

/**
 *    @Name: isZero
 *    @Description: Check if value is zero.
 *    @params {string} num.
 *    @return returns true is input is zero else false.
 */

export const isZero = (num: string) => !!RE_IS_ZERO.test(num);
