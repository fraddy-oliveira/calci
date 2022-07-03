import { lt as lessThan } from './operators/comparison';

import { add as addition } from './operators/add';

import { multiply } from './operators/multiply';

import { subtract } from './operators/subtract';

import { UserInputType } from './interfaces/common';

import { normalize } from './utils/helpers';

export const lt = (numOne: UserInputType, numTwo: UserInputType) =>
  lessThan(normalize(String(numOne)), normalize(String(numTwo)));

export const add = (numOne: UserInputType, numTwo: UserInputType) =>
  addition(normalize(String(numOne)), normalize(String(numTwo)));

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

export const mul = (numOne: UserInputType, numTwo: UserInputType) =>
  multiply(normalize(String(numOne)), normalize(String(numTwo)));

export const sub = (numOne: UserInputType, numTwo: UserInputType) =>
  subtract(normalize(String(numOne)), normalize(String(numTwo)));
