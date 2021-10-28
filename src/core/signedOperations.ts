import {
  addLeftPadding,
  adder,
  subtractor,
  addRightPadding,
  multiplier,
} from './helpers';

import { isZero } from './validation';

import { OperationOptionsStructure } from './interfaces';

export const addPositive = (
  numOne: string,
  numTwo: string,
  carry: string,
  option: OperationOptionsStructure,
) => {
  let resultSum = '';

  numOne = numOne.trim();
  numTwo = numTwo.trim();
  carry = carry.trim();

  numOne = numOne || '0';
  numTwo = numTwo || '0';
  carry = carry || '0';

  const { additionUnit } = option;

  if (numOne.length > numTwo.length) {
    numTwo = addLeftPadding(numTwo, numOne.length - numTwo.length);
  } else if (numOne.length < numTwo.length) {
    numOne = addLeftPadding(numOne, numTwo.length - numOne.length);
  }

  let stringSplitUp = numOne.length;
  let stringSplitLower = numOne.length - additionUnit;

  stringSplitLower = stringSplitLower < 0 ? 0 : stringSplitLower;

  const computeUnits = Math.ceil(numOne.length / additionUnit);

  for (let j = 0; j < computeUnits;) {
    let adderRst = adder(
      numOne.slice(stringSplitLower, stringSplitUp),
      numTwo.slice(stringSplitLower, stringSplitUp),
      carry,
    );

    if (adderRst.length < additionUnit) {
      adderRst = addLeftPadding(adderRst, additionUnit - adderRst.length);
    }

    carry = adderRst.slice(0, adderRst.length - additionUnit);

    resultSum = adderRst.slice(adderRst.length - additionUnit, adderRst.length)
      + resultSum;

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

export const subPositive = (
  inputNumOne: string,
  inputNumTwo: string,
  option: OperationOptionsStructure,
) => {
  let resultSum = '';
  let interchangeNos = false;
  let numOne = inputNumOne ? inputNumOne.toString().trim() : '0';
  let numTwo = inputNumTwo ? inputNumTwo.toString().trim() : '0';

  if (!option || !option.additionUnit || Number(option.additionUnit) <= 0) {
    throw new Error('Option additionUnit is required');
  }

  const additionUnit = Number(option.additionUnit);

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

  for (let j = 0; j < Math.ceil(numOne.length / additionUnit);) {
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
        parseInt(`1${addLeftPadding('', additionUnit)}`, 10)
        - parseInt(unitRst, 10)
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

export const mulPositive = (
  inputNumOne: string,
  inputNumTwo: string,
  option: OperationOptionsStructure,
) => {
  let resultSum = '';
  let interchangeNos = false;
  let jLoopResult = '';
  let numOne = inputNumOne ? inputNumOne.toString().trim() : '0';
  let numTwo = inputNumTwo ? inputNumTwo.toString().trim() : '0';

  if (!option || !option.additionUnit || Number(option.additionUnit) <= 0) {
    throw new Error('Option additionUnit is required');
  }

  const additionUnit = Number(option.additionUnit);

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

  for (let i = 0; i < Math.ceil(numTwo.length / additionUnit);) {
    jLoopResult = '';
    numOneLowPoint = numOne.length - additionUnit;
    numOneUpPoint = numOne.length;

    numOneLowPoint = numOneLowPoint < 0 ? 0 : numOneLowPoint;

    jLoopRightPadding = 0;

    for (let j = 0; j < Math.ceil(numOne.length / additionUnit);) {
      jLoopRightPadding += j > 0 ? additionUnit : 0;

      jLoopResult = addPositive(
        jLoopResult,
        addRightPadding(
          multiplier(
            numOne.slice(numOneLowPoint, numOneUpPoint),
            numTwo.slice(numTwoLowPoint, numTwoUpPoint),
            '0',
          ),
          jLoopRightPadding,
        ),
        '0',
        option,
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
      '0',
      option,
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
