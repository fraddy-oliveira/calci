let calculator = {}

calculator.debug = false
calculator.addition_unit = 5

calculator.option = {}
calculator.option['addition_unit'] = 5

calculator.operationType = { 'addition': 'add', 'subraction': 'sub' }

calculator.RE_IS_NUMBER = /^([-+]?)\d+?$/
calculator.RE_IS_ZERO = /^([-+]?)0+?$/
calculator.RE_NON_ZERO = /^([-+]?)0*([1-9][0-9]*)$/;

//  Validation

let isNumber = function (num) {
    num = num.toString().trim()
    return calculator.RE_IS_NUMBER.test(num)
}

let isNegative = function (num) {
    return num.toString().indexOf('-') === 0 ? true : false
}

let isPositive = function (num) {
    return !isNegative(num) ? true : false
}

let normalize = function (num) {
    num = num.toString().trim()
    num = num ? num.replace(/^\++/g, '') : '0'
    if (calculator.RE_IS_ZERO.test(num)) {
        return "0";
    }
    var match = calculator.RE_NON_ZERO.exec(num);
    if (!match) {
        throw new Error("Illegal number : " + num);
    }
    return match[1] + match[2].replace(/^0+/g, '');
}

let is_input_invalidate = function (num_1, num_2, carry, option) {
    let errors = []
    let input_datatype = ['string', 'number']
    if (!num_1 || !num_2) {
        errors.push('input numbers are required')
    }
    if (!input_datatype.includes(typeof num_1) || !input_datatype.includes(typeof num_2)) {
        errors.push('datatype of input numbers should be either string or number')
    }
    if (carry) {
        if (!input_datatype.includes(typeof carry))
            errors.push('datatype of carry numbers should be either string or number')
    }
    if (option && option['addition_unit']) {
        if (!input_datatype.includes(typeof option['addition_unit']))
            errors.push('datatype of addition_unit numbers should be either string or number')
    }
    return errors.length > 0 ? errors : false
}

//  Helpers

let adder = function (a, b, carry) {
    return ((a ? parseInt(a) : 0) + (b ? parseInt(b) : 0) + (carry ? parseInt(carry) : 0)).toString()
}

let subtractor = function (a, b) {
    return ((a ? parseInt(a) : 0) - (b ? parseInt(b) : 0)).toString()
}

let addPadding = function (num, padding_length) {
    let num_string = ''
    for (let i = 0; i < padding_length; i++) {
        num_string += '0'
    }
    return num_string + num
}

let toggleSign = function (num) {
    if (isNegative(num)) {
        num = num.slice(1)
    } else {
        num = '-' + num
    }
    return num
}

//  Comparison

let ltPositive = function (num_1, num_2) {
    if (isNegative(num_1) || isNegative(num_2)) {
        throw new Error("Both operands must be positive: " + num_1 + " " + num_2);
    }
    let maxLength = Math.max(num_1.length, num_2.length);
    let lhs = addPadding(num_1, maxLength - num_1.length);
    let rhs = addPadding(num_2, maxLength - num_2.length);
    return lhs < rhs; // lexicographical comparison
}

let lt = calculator.lt = function (num_1, num_2) {
    num_1 = normalize(num_1)
    num_2 = normalize(num_2)
    let is_lt = false
    if (calculator.RE_IS_ZERO.test(num_1) && calculator.RE_IS_ZERO.test(num_2)) {
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

let abs = calculator.abs = function (num) {
    return num.replace(/^([-+]?)/, '')
}

//  Addition

let addPositive = function (num_1, num_2, carry, option) {

    let result_sum = '', addition_unit = calculator.addition_unit
    num_1 = num_1 ? num_1.toString().trim() : '0'
    num_2 = num_2 ? num_2.toString().trim() : '0'
    carry = carry ? carry.toString().trim() : '0'

    addition_unit = option && option['addition_unit'] ? Number(option['addition_unit']) : addition_unit

    if (num_1.length > num_2.length) {
        num_2 = addPadding(num_2, num_1.length - num_2.length)
    } else if (num_1.length < num_2.length) {
        num_1 = addPadding(num_1, num_2.length - num_1.length)
    }

    let string_split_up = num_1.length, string_split_lower = num_1.length - addition_unit

    string_split_lower = string_split_lower < 0 ? 0 : string_split_lower

    for (let j = 0; j < Math.ceil(num_1.length / addition_unit); j++) {
        let adder_rst = adder(num_1.slice(string_split_lower, string_split_up), num_2.slice(string_split_lower, string_split_up), carry)

        if (adder_rst.length < addition_unit) {
            adder_rst = addPadding(adder_rst, addition_unit - adder_rst.length)
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

    let result_sum = '', addition_unit = calculator.addition_unit
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
        num_2 = addPadding(num_2, num_1.length - num_2.length)
    } else if (num_1.length < num_2.length) {
        num_1 = addPadding(num_1, num_2.length - num_1.length)
    }

    let string_split_up = num_1.length, string_split_lower = num_1.length - addition_unit

    string_split_lower = string_split_lower < 0 ? 0 : string_split_lower

    let carry = 0

    // console.log('num_1:'+num_1.length)
    // console.log('num_2:'+num_2)
    // console.log('Math.ceil(num_1.length / addition_unit):'+Math.ceil(num_1.length / addition_unit))
    // console.log('addition_unit:'+addition_unit)

    for (let j = 0; j < Math.ceil(num_1.length / addition_unit); j++) {

        let unit_1 = num_1.slice(string_split_lower, string_split_up) + ''
        let unit_2 = num_2.slice(string_split_lower, string_split_up) + ''
        let unit_rst = ''

        if (carry == 1) {
            unit_2 = parseInt(unit_2) + carry + ''
            carry = 0
        }

        //console.log('parseInt:' + (parseInt(unit_1) - parseInt(unit_2)))

        if ((parseInt(unit_1) - parseInt(unit_2)) < 0) {
            unit_1 = unit_2 + (unit_2 = unit_1, "");
            carry = 1
        }

        unit_rst = subtractor(unit_1, unit_2)

        if (carry == 1) {
            unit_rst = (parseInt('1' + addPadding('', addition_unit)) - parseInt(unit_rst)) + ''
        }

        if (unit_rst.length < addition_unit) {
            unit_rst = addPadding(unit_rst, addition_unit - unit_rst.length)
        }

        //console.log('unit_1:' + unit_1 + '/unit_2:' + unit_2 + '/unit_rst:' + unit_rst + '/carry:' + carry)

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

calculator.add = function (num_1, num_2) {
    let ret = ''

    if (Array.isArray(num_1)) {
        ret = add_array(num_1)
    } else {
        num_1 = normalize(num_1)
        num_2 = normalize(num_2)
        if (isNegative(num_1) && isNegative(num_2)) {
            ret = toggleSign(addPositive(toggleSign(num_1), toggleSign(num_2), 0, calculator.option))
        } else if (isPositive(num_1) && isPositive(num_2)) {
            ret = addPositive(num_1, num_2, 0, calculator.option)
        } else {
            if (isNegative(num_1)) {
                ret = subPositive(abs(num_1), abs(num_2), calculator.option)
                if (lt(abs(num_1), abs(num_2))) {
                    ret = ret
                } else {
                    ret = toggleSign(ret)
                }
            } else {
                if (lt(abs(num_1), abs(num_2))) {
                    ret = toggleSign(subPositive(abs(num_1), abs(num_2), calculator.option))
                } else {
                    ret = subPositive(abs(num_1), abs(num_2), calculator.option)
                }
            }
        }
    }
    return ret
}

calculator.sub = function (num_1, num_2) {
    let ret = ''
    num_1 = normalize(num_1)
    num_2 = normalize(num_2)
    ret = calculator.add(num_1, toggleSign(num_2))
    return ret
}

let add_array = function (num_arr) {
    let ret = ''
    if (Array.isArray(num_arr) && num_arr.length > 0) {
        ret = num_arr[0]
        for (let i = 1; i < num_arr.length; i++) {
            ret = calculator.add(num_arr[i], ret)
        }
    }
    return ret
}

module.exports = {
    'add': calculator.add,
    'sub': calculator.sub,
    'lt': calculator.lt,
    'test': {
        'normalize': normalize
    }
}