const {RE_IS_NUMBER, RE_IS_ZERO} = require('./patterns');

const calci = {};

calci.additionUnit = 5;

calci.option = {};
calci.option.additionUnit = 5;

calci.operationType = {addition: 'add', subraction: 'sub'};

const isNegative = (num) => num.toString().indexOf('-') === 0;

const isPositive = (num) => !isNegative(num);

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

const isZero = (num) => !!RE_IS_ZERO.test(num);

//  Helpers

const adder = (a, b, carry) =>
  (
    (a ? parseInt(a, 10) : 0) +
    (b ? parseInt(b, 10) : 0) +
    (carry ? parseInt(carry, 10) : 0)
  ).toString();

const subtractor = (a, b) =>
  ((a ? parseInt(a, 10) : 0) - (b ? parseInt(b, 10) : 0)).toString();

const addPadding = (num, paddingLength, inputType) => {
  const type = inputType === undefined ? 'left' : inputType;
  let numString = '';

  Array.from({length: paddingLength}, () => {
    numString += '0';
    return 0;
  });

  return type === 'left' ? numString + num : num + numString;
};

const addLeftPadding = (num, paddingLength) =>
  addPadding(num, paddingLength, 'left');

const addRightPadding = (num, paddingLength) =>
  addPadding(num, paddingLength, 'right');

const toggleSign = (num) => {
  if (isNegative(num)) {
    return num.slice(1);
  }
  return `-${num}`;
};

const multiplier = (a, b, carry) =>
  (
    (a ? parseInt(a, 10) : 0) * (b ? parseInt(b, 10) : 0) +
    (carry ? parseInt(carry, 10) : 0)
  ).toString();

//  Comparison

const ltPositive = (numOne, numTwo) => {
  if (isNegative(numOne) || isNegative(numTwo)) {
    throw new Error(`Both operands must be positive: ${numOne} ${numTwo}`);
  }
  const maxLength = Math.max(numOne.length, numTwo.length);
  const lhs = addLeftPadding(numOne, maxLength - numOne.length);
  const rhs = addLeftPadding(numTwo, maxLength - numTwo.length);
  return lhs < rhs; // lexicographical comparison
};

calci.lt = (inputNumOne, inputNumTwo) => {
  const numOne = normalize(inputNumOne);
  const numTwo = normalize(inputNumTwo);
  let isLt = false;
  if (isZero(numOne) && isZero(numTwo)) {
    isLt = false;
  } else if (isNegative(numOne) && isPositive(numTwo)) {
    isLt = true;
  } else if (isPositive(numOne) && isNegative(numTwo)) {
    isLt = false;
  } else if (isNegative(numOne) && isNegative(numTwo)) {
    isLt = !ltPositive(abs(numOne), abs(numTwo));
  } else {
    isLt = !!ltPositive(numOne, numTwo);
  }
  return isLt;
};

const {lt} = calci;

const abs = (num) => num.replace(/^([-+]?)/, '');

calci.eq = (numOne, numTwo) => normalize(numOne) === normalize(numTwo);

const {eq} = calci;

calci.lte = (numOne, numTwo) => lt(numOne, numTwo) || eq(numOne, numTwo);

calci.gt = (numOne, numTwo) => !lt(numOne, numTwo);

const {gt} = calci;

calci.gte = (numOne, numTwo) => gt(numOne, numTwo) || eq(numOne, numTwo);

//  Addition

const addPositive = (inputNumOne, inputNumTwo, inputCarry, option) => {
  let resultSum = '';
  let {additionUnit} = calci;
  let numOne = inputNumOne ? inputNumOne.toString().trim() : '0';
  let numTwo = inputNumTwo ? inputNumTwo.toString().trim() : '0';
  let carry = inputCarry ? inputCarry.toString().trim() : '0';

  additionUnit =
    option && option.additionUnit ? Number(option.additionUnit) : additionUnit;

  if (numOne.length > numTwo.length) {
    numTwo = addLeftPadding(numTwo, numOne.length - numTwo.length);
  } else if (numOne.length < numTwo.length) {
    numOne = addLeftPadding(numOne, numTwo.length - numOne.length);
  }

  let stringSplitUp = numOne.length;
  let stringSplitLower = numOne.length - additionUnit;

  stringSplitLower = stringSplitLower < 0 ? 0 : stringSplitLower;

  for (let j = 0; j < Math.ceil(numOne.length / additionUnit); ) {
    let adderRst = adder(
      numOne.slice(stringSplitLower, stringSplitUp),
      numTwo.slice(stringSplitLower, stringSplitUp),
      carry,
    );

    if (adderRst.length < additionUnit) {
      adderRst = addLeftPadding(adderRst, additionUnit - adderRst.length);
    }

    carry = adderRst.slice(0, adderRst.length - additionUnit);

    resultSum =
      adderRst.slice(adderRst.length - additionUnit, adderRst.length) +
      resultSum;

    stringSplitUp -= additionUnit;
    stringSplitLower -= additionUnit;
    stringSplitLower = stringSplitLower < 0 ? 0 : stringSplitLower;
    if (stringSplitUp <= 0) {
      break;
    }
    j += 1;
  }

  resultSum = `${carry + resultSum}`.replace(/^0+/g, '');

  resultSum = resultSum || '0';

  return resultSum;
};

const subPositive = (inputNumOne, inputNumTwo, option) => {
  let resultSum = '';
  let {additionUnit} = calci;
  let interchangeNos = false;
  let numOne = inputNumOne ? inputNumOne.toString().trim() : '0';
  let numTwo = inputNumTwo ? inputNumTwo.toString().trim() : '0';

  additionUnit =
    option && option.additionUnit ? Number(option.additionUnit) : additionUnit;

  if (numTwo.length > numOne.length) {
    interchangeNos = true;
  } else if (numOne.slice(0, 1) < numTwo.slice(0, 1)) {
    interchangeNos = true;
  }

  if (interchangeNos) {
    numOne = numTwo + ((numTwo = numOne), '');
  }

  if (numOne.length > numTwo.length) {
    numTwo = addLeftPadding(numTwo, numOne.length - numTwo.length);
  } else if (numOne.length < numTwo.length) {
    numOne = addLeftPadding(numOne, numTwo.length - numOne.length);
  }

  let stringSplitUp = numOne.length;
  let stringSplitLower = numOne.length - additionUnit;

  stringSplitLower = stringSplitLower < 0 ? 0 : stringSplitLower;

  let carry = 0;

  for (let j = 0; j < Math.ceil(numOne.length / additionUnit); ) {
    let unitOne = `${numOne.slice(stringSplitLower, stringSplitUp)}`;
    let unitTwo = `${numTwo.slice(stringSplitLower, stringSplitUp)}`;
    let unitRst = '';

    if (carry === 1) {
      unitTwo = `${parseInt(unitTwo, 10) + carry}`;
      carry = 0;
    }

    if (parseInt(unitOne, 10) - parseInt(unitTwo, 10) < 0) {
      unitOne = unitTwo + ((unitTwo = unitOne), '');
      carry = 1;
    }

    unitRst = subtractor(unitOne, unitTwo);

    if (carry === 1) {
      unitRst = `${
        parseInt(`1${addLeftPadding('', additionUnit)}`, 10) -
        parseInt(unitRst, 10)
      }`;
    }

    if (unitRst.length < additionUnit) {
      unitRst = addLeftPadding(unitRst, additionUnit - unitRst.length);
    }

    resultSum = unitRst + resultSum;

    stringSplitUp -= additionUnit;
    stringSplitLower -= additionUnit;
    stringSplitLower = stringSplitLower < 0 ? 0 : stringSplitLower;
    if (stringSplitUp <= 0) {
      break;
    }
    j += 1;
  }

  resultSum = `${resultSum}`.replace(/^0+/g, '');

  resultSum = resultSum || '0';

  return resultSum;
};

calci.add = (inputNumOne, inputNumTwo) => {
  let ret = '';
  let numOne = inputNumOne;
  let numTwo = inputNumTwo;

  if (Array.isArray(numOne)) {
    ret = addArray(numOne);
  } else {
    numOne = normalize(numOne);
    numTwo = normalize(numTwo);
    if (isNegative(numOne) && isNegative(numTwo)) {
      ret = toggleSign(
        addPositive(toggleSign(numOne), toggleSign(numTwo), 0, calci.option),
      );
    } else if (isPositive(numOne) && isPositive(numTwo)) {
      ret = addPositive(numOne, numTwo, 0, calci.option);
    } else if (isNegative(numOne)) {
      ret = subPositive(abs(numOne), abs(numTwo), calci.option);
      if (!lt(abs(numOne), abs(numTwo))) {
        ret = toggleSign(ret);
      }
    } else if (lt(abs(numOne), abs(numTwo))) {
      ret = toggleSign(subPositive(abs(numOne), abs(numTwo), calci.option));
    } else {
      ret = subPositive(abs(numOne), abs(numTwo), calci.option);
    }
  }
  return ret;
};

const {add} = calci;

calci.sub = (numOne, numTwo) => {
  return add(normalize(numOne), toggleSign(normalize(numTwo)));
};

const addArray = (numArr) => {
  let ret = '';
  if (Array.isArray(numArr) && numArr.length > 0) {
    [ret] = numArr;
    for (let i = 1; i < numArr.length; ) {
      ret = add(numArr[i], ret);
      i += 1;
    }
  }
  return ret;
};

const mulPositive = (inputNumOne, inputNumTwo, option) => {
  let resultSum = '';
  let {additionUnit} = calci;
  let interchangeNos = false;
  let jLoopResult = '';
  let numOne = inputNumOne ? inputNumOne.toString().trim() : '0';
  let numTwo = inputNumTwo ? inputNumTwo.toString().trim() : '0';

  additionUnit =
    option && option.additionUnit ? Number(option.additionUnit) : additionUnit;

  if (numTwo.length > numOne.length) {
    interchangeNos = true;
  } else if (numOne.slice(0, 1) < numTwo.slice(0, 1)) {
    interchangeNos = true;
  }

  if (interchangeNos) {
    numOne = numTwo + ((numTwo = numOne), '');
  }

  if (isZero(numOne) || isZero(numTwo)) {
    return '0';
  }

  let numTwoLowPoint = numTwo.length - additionUnit;
  let numTwoUpPoint = numTwo.length;
  let numOneLowPoint = 0;
  let numOneUpPoint = 0;
  let jLoopRightPadding = 0;
  let iLoopRightPadding = 0;

  numTwoLowPoint = numTwoLowPoint < 0 ? 0 : numTwoLowPoint;

  for (let i = 0; i < Math.ceil(numTwo.length / additionUnit); ) {
    jLoopResult = '';
    numOneLowPoint = numOne.length - additionUnit;
    numOneUpPoint = numOne.length;

    numOneLowPoint = numOneLowPoint < 0 ? 0 : numOneLowPoint;

    jLoopRightPadding = 0;

    for (let j = 0; j < Math.ceil(numOne.length / additionUnit); ) {
      jLoopRightPadding += j > 0 ? additionUnit : 0;

      jLoopResult = addPositive(
        jLoopResult,
        addRightPadding(
          multiplier(
            numOne.slice(numOneLowPoint, numOneUpPoint),
            numTwo.slice(numTwoLowPoint, numTwoUpPoint),
          ),
          jLoopRightPadding,
        ),
      );

      numOneLowPoint -= additionUnit;
      numOneUpPoint -= additionUnit;
      numOneLowPoint = numOneLowPoint < 0 ? 0 : numOneLowPoint;
      if (numOneUpPoint <= 0) {
        break;
      }

      j += 1;
    }

    iLoopRightPadding += i > 0 ? additionUnit : 0;

    resultSum = addPositive(
      resultSum,
      addRightPadding(jLoopResult, iLoopRightPadding),
    );

    numTwoLowPoint -= additionUnit;
    numTwoUpPoint -= additionUnit;
    numTwoLowPoint = numTwoLowPoint < 0 ? 0 : numTwoLowPoint;
    if (numTwoUpPoint <= 0) {
      break;
    }

    i += 1;
  }

  resultSum = `${resultSum}`.replace(/^0+/g, '');

  resultSum = resultSum || '0';

  return resultSum;
};

calci.mul = (inputNumOne, inputNumTwo) => {
  let ret = '';
  const numOne = normalize(inputNumOne);
  const numTwo = normalize(inputNumTwo);
  if (
    (isNegative(numOne) && isNegative(numTwo)) ||
    (isPositive(numOne) && isPositive(numTwo))
  ) {
    ret = mulPositive(abs(numOne), abs(numTwo));
  } else {
    ret = mulPositive(abs(numOne), abs(numTwo));
    if (!isZero(ret)) {
      ret = toggleSign(ret);
    }
  }
  return ret;
};

module.exports = {
  add: calci.add,
  sub: calci.sub,
  lt: calci.lt,
  mul: calci.mul,
};
