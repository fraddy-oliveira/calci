import { lt as lessThan } from './operators/comparison';

import { add as addition } from './operators/add';

import { multiply } from './operators/multiply';

import { subtract } from './operators/subtract';

import { UserInputType } from './interfaces/common';

export const lt = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  lessThan(String(inputNumOne), String(inputNumTwo));

export const add = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  addition(String(inputNumOne), String(inputNumTwo));

export const addFromArray = (numArr: Array<UserInputType>): string => {
  if (!Array.isArray(numArr)) {
    throw new Error('Input should be array.');
  }

  let ret = '0';

  if (Array.isArray(numArr) && numArr.length > 0) {
    ret = String(numArr[0]);

    for (let i = 1; i < numArr.length; i += 1) {
      ret = addition(String(numArr[i]), ret);
    }
  }

  return ret;
};

export const mul = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  multiply(String(inputNumOne), String(inputNumTwo));

export const sub = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  subtract(String(inputNumOne), String(inputNumTwo));
