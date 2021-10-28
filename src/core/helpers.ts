import { RE_IS_NUMBER, RE_IS_ZERO } from './patterns';

import { isNegative } from './validation';

/**
 *    @Name: normalize
 *    @Description: detect input which is not number and throws error.
 *    @Note: keep zero dependencies on this library for this function.
 *    @params {string} num - string to be manipulated.
 *    @return string that can used to perform operations.
 */

export const normalize = (inputNum: string) => {
  let num = inputNum.trim();

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

//  @TODO : convert adders inputs to number type.
export const adder = (a: string, b: string, carry: string): string => {
  const num1 = Number.isNaN(parseInt(a, 10)) ? '0' : `${parseInt(a, 10)}`;
  const num2 = Number.isNaN(parseInt(b, 10)) ? '0' : `${parseInt(b, 10)}`;
  const numCarry = Number.isNaN(parseInt(carry, 10))
    ? '0'
    : `${parseInt(carry, 10)}`;

  return (parseInt(num1, 10) + parseInt(num2, 10) + parseInt(numCarry, 10)).toString();
};

export const subtractor = (a: string, b: string): string =>
  ((a ? parseInt(a, 10) : 0) - (b ? parseInt(b, 10) : 0)).toString();

export const multiplier = (a: string, b: string, carry: string): string =>
  (
    (a ? parseInt(a, 10) : 0) * (b ? parseInt(b, 10) : 0)
    + (carry ? parseInt(carry, 10) : 0)
  ).toString();

export const addPadding = (
  num: string,
  paddingLength: number,
  inputType: 'left' | 'right',
) => {
  let numString = '';

  Array.from({ length: paddingLength }, () => {
    numString += '0';

    return 0;
  });

  return inputType === 'left' ? numString + num : num + numString;
};

export const toggleSign = (num: string) => {
  if (isNegative(num)) {
    return num.slice(1);
  }

  return `-${num}`;
};

export const addLeftPadding = (num: string, paddingLength: number) =>
  addPadding(num, paddingLength, 'left');

export const addRightPadding = (num: string, paddingLength: number) =>
  addPadding(num, paddingLength, 'right');

export const abs = (num: string) => num.replace(/^([-+]?)/, '');

export const addToVerify = (array: string[]): string => {
  const sum = array.reduce(
    (a: string, b: string) => (parseInt(a, 10) + parseInt(b, 10)).toString(),
    '0',
  );

  return sum;
};
