let calci = {}

calci.debug = false
calci.addition_unit = 5

calci.option = {}
calci.option['addition_unit'] = 5

calci.operationType = { 'addition': 'add', 'subraction': 'sub' }

calci.RE_IS_NUMBER = /^([-+]?)0*([0-9][0-9]*)$/
calci.RE_IS_ZERO = /^([-+]?)0+?$/
calci.RE_NON_ZERO = /^([+]?)0*([1-9][0-9]*)$/;

//  Validation

let isNumber = function (num) {
    num = num.toString().trim()
    return calci.RE_IS_NUMBER.test(num)
}

let isNegative = function (num) {
    return num.toString().indexOf('-') === 0 ? true : false
}

let isPositive = function (num) {
    return !isNegative(num) ? true : false
}

/**
 *    @Name: normalize
 *    @Description: detect input which is not number and throws error.
 *    @Note: keep zero dependencies on this library for this function.
 *    @params {string} num - string to be manipulated.
 *    @return string that can used to perform operations.
 */

let normalize = function (num) {
    num = num.toString().trim()
    num = num ? num.replace(/^\++/g, '') : '0'
    if (calci.RE_IS_ZERO.exec(num)) {
        return "0";
    }
    var match = calci.RE_IS_NUMBER.exec(num);
    if (!match) {
        throw new Error("Illegal number : " + num);
    }
    return match[1] + match[2].replace(/^0+/g, '');
}

let isZero = function (num) {
    return calci.RE_IS_ZERO.test(num) ? true : false
}

//  Helpers

let adder = function (a, b, carry) {
    return ((a ? parseInt(a) : 0) + (b ? parseInt(b) : 0) + (carry ? parseInt(carry) : 0)).toString()
}

let subtractor = function (a, b) {
    return ((a ? parseInt(a) : 0) - (b ? parseInt(b) : 0)).toString()
}

let addPadding = function (num, padding_length, type) {
    type = type === undefined ? 'left' : type
    let num_string = ''
    for (let i = 0; i < padding_length; i++) {
        num_string += '0'
    }
    return type === 'left' ? num_string + num : num + num_string
}

let addLeftPadding = function (num, padding_length) {
    return addPadding(num, padding_length, 'left')
}

let addRightPadding = function (num, padding_length) {
    return addPadding(num, padding_length, 'right')
}

let toggleSign = function (num) {
    if (isNegative(num)) {
        num = num.slice(1)
    } else {
        num = '-' + num
    }
    return num
}

let multiplier = function (a, b, carry) {
    return ((a ? parseInt(a) : 0) * (b ? parseInt(b) : 0) + (carry ? parseInt(carry) : 0)).toString()
}

//  Comparison

let ltPositive = function (num_1, num_2) {
    if (isNegative(num_1) || isNegative(num_2)) {
        throw new Error("Both operands must be positive: " + num_1 + " " + num_2);
    }
    let maxLength = Math.max(num_1.length, num_2.length);
    let lhs = addLeftPadding(num_1, maxLength - num_1.length);
    let rhs = addLeftPadding(num_2, maxLength - num_2.length);
    return lhs < rhs; // lexicographical comparison
}

let lt = calci.lt = function (num_1, num_2) {
    num_1 = normalize(num_1)
    num_2 = normalize(num_2)
    let is_lt = false
    if (isZero(num_1) && isZero(num_2)) {
        is_lt = false
    } else if (isNegative(num_1) && isPositive(num_2)) {
        is_lt = true
    } else if (isPositive(num_1) && isNegative(num_2)) {
        is_lt = false
    } else if (isNegative(num_1) && isNegative(num_2)) {
        is_lt = ltPositive(abs(num_1), abs(num_2)) ? false : true
    } else {
        is_lt = ltPositive(num_1, num_2) ? true : false
    }
    return is_lt
}

let abs = function (num) {
    return num.replace(/^([-+]?)/, '')
}

let eq = calci.eq = function (num_1, num_2) {
    return normalize(num_1) === normalize(num_2);
}

let lte = calci.lte = function (num_1, num_2) {
    return lt(num_1, num_2) || eq(num_1, num_2)
}

let gt = calci.gt = function (num_1, num_2) {
    return !lt(num_1, num_2)
}

let gte = calci.gte = function (num_1, num_2) {
    return gt(num_1, num_2) || eq(num_1, num_2)
}

//  Addition

let addPositive = function (num_1, num_2, carry, option) {

    let result_sum = '', addition_unit = calci.addition_unit
    num_1 = num_1 ? num_1.toString().trim() : '0'
    num_2 = num_2 ? num_2.toString().trim() : '0'
    carry = carry ? carry.toString().trim() : '0'

    addition_unit = option && option['addition_unit'] ? Number(option['addition_unit']) : addition_unit

    if (num_1.length > num_2.length) {
        num_2 = addLeftPadding(num_2, num_1.length - num_2.length)
    } else if (num_1.length < num_2.length) {
        num_1 = addLeftPadding(num_1, num_2.length - num_1.length)
    }

    let string_split_up = num_1.length, string_split_lower = num_1.length - addition_unit

    string_split_lower = string_split_lower < 0 ? 0 : string_split_lower

    for (let j = 0; j < Math.ceil(num_1.length / addition_unit); j++) {
        let adder_rst = adder(num_1.slice(string_split_lower, string_split_up), num_2.slice(string_split_lower, string_split_up), carry)

        if (adder_rst.length < addition_unit) {
            adder_rst = addLeftPadding(adder_rst, addition_unit - adder_rst.length)
        }

        carry = adder_rst.slice(0, adder_rst.length - addition_unit)

        result_sum = adder_rst.slice(adder_rst.length - addition_unit, adder_rst.length) + result_sum

        string_split_up -= addition_unit
        string_split_lower -= addition_unit
        string_split_lower = string_split_lower < 0 ? 0 : string_split_lower
        if (string_split_up <= 0) {
            break
        }
    }

    result_sum = (carry + result_sum + '').replace(/^0+/g, '')

    result_sum = result_sum ? result_sum : '0'

    return result_sum
}

let subPositive = function (num_1, num_2, option) {

    let result_sum = '', addition_unit = calci.addition_unit
    let interchangeNos = false
    num_1 = num_1 ? num_1.toString().trim() : '0'
    num_2 = num_2 ? num_2.toString().trim() : '0'

    addition_unit = option && option['addition_unit'] ? Number(option['addition_unit']) : addition_unit

    if (num_2.length > num_1.length) {
        interchangeNos = true
    } else if (num_1.slice(0, 1) < num_2.slice(0, 1)) {
        interchangeNos = true
    }

    if (interchangeNos) {
        num_1 = num_2 + (num_2 = num_1, "");
    }

    if (num_1.length > num_2.length) {
        num_2 = addLeftPadding(num_2, num_1.length - num_2.length)
    } else if (num_1.length < num_2.length) {
        num_1 = addLeftPadding(num_1, num_2.length - num_1.length)
    }

    let string_split_up = num_1.length, string_split_lower = num_1.length - addition_unit

    string_split_lower = string_split_lower < 0 ? 0 : string_split_lower

    let carry = 0

    for (let j = 0; j < Math.ceil(num_1.length / addition_unit); j++) {

        let unit_1 = num_1.slice(string_split_lower, string_split_up) + ''
        let unit_2 = num_2.slice(string_split_lower, string_split_up) + ''
        let unit_rst = ''

        if (carry == 1) {
            unit_2 = parseInt(unit_2) + carry + ''
            carry = 0
        }

        if ((parseInt(unit_1) - parseInt(unit_2)) < 0) {
            unit_1 = unit_2 + (unit_2 = unit_1, "");
            carry = 1
        }

        unit_rst = subtractor(unit_1, unit_2)

        if (carry == 1) {
            unit_rst = (parseInt('1' + addLeftPadding('', addition_unit)) - parseInt(unit_rst)) + ''
        }

        if (unit_rst.length < addition_unit) {
            unit_rst = addLeftPadding(unit_rst, addition_unit - unit_rst.length)
        }

        result_sum = unit_rst + result_sum

        string_split_up -= addition_unit
        string_split_lower -= addition_unit
        string_split_lower = string_split_lower < 0 ? 0 : string_split_lower
        if (string_split_up <= 0) {
            break
        }
    }

    result_sum = (result_sum + '').replace(/^0+/g, '')

    result_sum = result_sum ? result_sum : '0'

    return result_sum
}

let add = calci.add = function (num_1, num_2) {
    let ret = ''

    if (Array.isArray(num_1)) {
        ret = add_array(num_1)
    } else {
        num_1 = normalize(num_1)
        num_2 = normalize(num_2)
        if (isNegative(num_1) && isNegative(num_2)) {
            ret = toggleSign(addPositive(toggleSign(num_1), toggleSign(num_2), 0, calci.option))
        } else if (isPositive(num_1) && isPositive(num_2)) {
            ret = addPositive(num_1, num_2, 0, calci.option)
        } else {
            if (isNegative(num_1)) {
                ret = subPositive(abs(num_1), abs(num_2), calci.option)
                if (lt(abs(num_1), abs(num_2))) {
                    ret = ret
                } else {
                    ret = toggleSign(ret)
                }
            } else {
                if (lt(abs(num_1), abs(num_2))) {
                    ret = toggleSign(subPositive(abs(num_1), abs(num_2), calci.option))
                } else {
                    ret = subPositive(abs(num_1), abs(num_2), calci.option)
                }
            }
        }
    }
    return ret
}

let sub = calci.sub = function (num_1, num_2) {
    let ret = ''
    num_1 = normalize(num_1)
    num_2 = normalize(num_2)
    ret = add(num_1, toggleSign(num_2))
    return ret
}

let add_array = function (num_arr) {
    let ret = ''
    if (Array.isArray(num_arr) && num_arr.length > 0) {
        ret = num_arr[0]
        for (let i = 1; i < num_arr.length; i++) {
            ret = add(num_arr[i], ret)
        }
    }
    return ret
}

let mulPositive = function (num_1, num_2, option) {
    let result_sum = '', addition_unit = calci.addition_unit, interchangeNos = false, j_loop_result = ''
    num_1 = num_1 ? num_1.toString().trim() : '0'
    num_2 = num_2 ? num_2.toString().trim() : '0'

    addition_unit = option && option['addition_unit'] ? Number(option['addition_unit']) : addition_unit

    if (num_2.length > num_1.length) {
        interchangeNos = true
    } else if (num_1.slice(0, 1) < num_2.slice(0, 1)) {
        interchangeNos = true
    }

    if (interchangeNos) {
        num_1 = num_2 + (num_2 = num_1, "");
    }

    if (isZero(num_1) || isZero(num_2)) {
        return '0'
    }

    let num_2_low_point = num_2.length - addition_unit, num_2_up_point = num_2.length
    let num_1_low_point = 0, num_1_up_point = 0
    let j_loop_right_padding = 0, i_loop_right_padding = 0


    num_2_low_point = num_2_low_point < 0 ? 0 : num_2_low_point

    for (let i = 0; i < Math.ceil(num_2.length / addition_unit); i++) {
        j_loop_result = ''
        num_1_low_point = num_1.length - addition_unit
        num_1_up_point = num_1.length

        num_1_low_point = num_1_low_point < 0 ? 0 : num_1_low_point

        j_loop_right_padding = 0

        for (let j = 0; j < Math.ceil(num_1.length / addition_unit); j++) {

            j_loop_right_padding += (j > 0 ? addition_unit : 0)

            j_loop_result = addPositive(j_loop_result, addRightPadding(multiplier(num_1.slice(num_1_low_point, num_1_up_point), num_2.slice(num_2_low_point, num_2_up_point)), j_loop_right_padding))

            num_1_low_point -= addition_unit
            num_1_up_point -= addition_unit
            num_1_low_point = num_1_low_point < 0 ? 0 : num_1_low_point
            if (num_1_up_point <= 0) {
                break
            }
        }

        i_loop_right_padding += (i > 0 ? addition_unit : 0)

        result_sum = addPositive(result_sum, addRightPadding(j_loop_result, i_loop_right_padding))

        num_2_low_point -= addition_unit
        num_2_up_point -= addition_unit
        num_2_low_point = num_2_low_point < 0 ? 0 : num_2_low_point
        if (num_2_up_point <= 0) {
            break
        }
    }

    result_sum = (result_sum + '').replace(/^0+/g, '')

    result_sum = result_sum ? result_sum : '0'

    return result_sum
}

let mul = calci.mul = function (num_1, num_2) {
    let ret = ''
    num_1 = normalize(num_1)
    num_2 = normalize(num_2)
    if ((isNegative(num_1) && isNegative(num_2)) || (isPositive(num_1) && isPositive(num_2))) {
        ret = mulPositive(abs(num_1), abs(num_2))
    } else {
        ret = mulPositive(abs(num_1), abs(num_2))
        if (!isZero(ret)) {
            ret = toggleSign(ret)
        }
    }
    return ret
}

module.exports = {
    'add': calci.add,
    'sub': calci.sub,
    'lt': calci.lt,
    'mul': calci.mul,
}