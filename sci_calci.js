let calculator = {}

let adder = function (a, b, carry) {
    return (a ? parseInt(a) : 0) + (b ? parseInt(b) : 0) + (carry ? parseInt(carry) : 0)
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
    if (option && option['adder_unit_count']) {
        if (!input_datatype.includes(typeof option['adder_unit_count']))
            errors.push('datatype of adder_unit_count numbers should be either string or number')
    }
    return errors.length > 0 ? errors : false
}

let stringAdder = function (num_1, num_2, carry, option) {
    let error = []

    if (error = is_input_invalidate(num_1, num_2, carry, option)) {
        console.log(error.join(','))
        return ''
    }

    let result_sum = '', adder_unit_count = 0
    num_1 = num_1.toString()
    num_2 = num_2.toString()
    carry = carry ? carry.toString() : ''

    adder_unit_count = option && option['adder_unit_count'] ? Number(option['adder_unit_count']) : 5

    if (num_1.length > num_2.length) {
        num_2 = addPadding(num_2, num_1.length - num_2.length)
    } else if (num_1.length < num_2.length) {
        num_1 = addPadding(num_1, num_2.length - num_1.length)
    }

    let string_split_up = num_1.length, string_split_lower = num_1.length - adder_unit_count

    string_split_lower = string_split_lower < 0 ? 0 : string_split_lower

    for (let j = 0; j < Math.ceil(num_1.length / adder_unit_count); j++) {
        let adder_rst = adder(num_1.slice(string_split_lower, string_split_up), num_2.slice(string_split_lower, string_split_up), carry)

        adder_rst = adder_rst.toString()

        if (adder_rst.length < adder_unit_count) {
            adder_rst = addPadding(adder_rst, adder_unit_count - adder_rst.length)
        }

        carry = adder_rst.slice(0, adder_rst.length - adder_unit_count)

        result_sum = adder_rst.slice(adder_rst.length - adder_unit_count, adder_rst.length) + result_sum

        string_split_up -= adder_unit_count
        string_split_lower -= adder_unit_count
        string_split_lower = string_split_lower < 0 ? 0 : string_split_lower
        if (string_split_up <= 0) {
            break
        }
    }

    result_sum = carry + result_sum + ''

    result_sum = result_sum.replace(/^0+/g, '')

    return result_sum

}

calculator.add = function (num_1, num_2) {
    let option = {}
    option['adder_unit_count'] = 5
    return stringAdder(num_1, num_2, 0, option)
}

module.exports = {
    'add': calculator.add
}

