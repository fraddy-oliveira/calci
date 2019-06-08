let calculator = {}

calculator.debug = false
calculator.addition_unit = 5

calculator.option = {}
calculator.option['addition_unit'] = 5

let adder = function (a, b, carry) {
    return ((a ? parseInt(a) : 0) + (b ? parseInt(b) : 0) + (carry ? parseInt(carry) : 0)).toString()
}

let addPadding = function (num, padding_length) {
    let num_string = ''
    for (let i = 0; i < padding_length; i++) {
        num_string += '0'
    }
    return num_string + num
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

let addPositive = function (num_1, num_2, carry, option) {

    let result_sum = '', addition_unit = calculator.addition_unit
    num_1 = num_1 ? num_1.toString().trim() : '0'
    num_2 = num_2 ? num_2.toString().trim() : '0'
    carry = carry ? carry.toString().trim() : '0'

    addition_unit = option && option['addition_unit'] ? Number(option['addition_unit']) : 5

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

calculator.add = function (num_1, num_2) {

    let option = calculator.option

    let ret = ''

    if (Array.isArray(num_1)) {
        ret = calculator.add_array(num_1, option)
    } else {
        ret = addPositive(num_1, num_2, 0, option)
    }
    return ret
}

calculator.add_array = function (num, option) {

    let option = option ? option : calculator.option

    let ret = ''

    if (Array.isArray(num) && num.length > 0) {
        ret = num[0]
        for (let i = 1; i < num.length; i++) {
            ret = addPositive(num[i], ret, 0, option)
        }
    }
    return ret
}

module.exports = {
    'add': calculator.add
}

