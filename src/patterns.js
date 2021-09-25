/**
 *    @Name: RE_IS_NUMBER
 *    @Description: Regexp to check if value is number.
 */

const RE_IS_NUMBER = /^([-+]?)0*([0-9][0-9]*)$/;

/*
 *  @Name : REGEX_INT_NUMBER
 *  @Description : Regular expression to check if number is integer.
 */

const REGEX_INT_NUMBER = /^([-+]?)0*([0-9]+)$/;

/**
 *    @Name: RE_IS_ZERO
 *    @Description: Regexp to check if value is zero.
 */

const RE_IS_ZERO = /^([-+]?)0+?$/;

/**
 *    @Name: RE_NON_ZERO
 *    @Description: Regexp to check if value is non-zero.
 */

const RE_NON_ZERO = /^([+]?)0*([1-9][0-9]*)$/;

module.exports = {RE_IS_NUMBER, REGEX_INT_NUMBER, RE_IS_ZERO, RE_NON_ZERO};
