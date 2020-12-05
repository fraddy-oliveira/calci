/**
 *    @Name: RE_IS_NUMBER
 *    @Description: Regexp to check if value is number.
 */

exports.RE_IS_NUMBER = /^([-+]?)0*([0-9][0-9]*)$/;

/**
 *    @Name: RE_IS_ZERO
 *    @Description: Regexp to check if value is zero.
 */

exports.RE_IS_ZERO = /^([-+]?)0+?$/;

/**
 *    @Name: RE_NON_ZERO
 *    @Description: Regexp to check if value is non-zero.
 */

exports.RE_NON_ZERO = /^([+]?)0*([1-9][0-9]*)$/;
