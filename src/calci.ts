import { lt as lessThan } from './operators/comparison';

import { add as addition, addArray } from './operators/add';

import { multiply } from './operators/multiply';

import { subtract } from './operators/subtract';

import { UserInputType } from './interfaces/common';

export const lt = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  lessThan(String(inputNumOne), String(inputNumTwo));

export const add = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  addition(String(inputNumOne), String(inputNumTwo));

export const addFromArray = (array: Array<UserInputType>) => {
  if (!Array.isArray(array)) {
    throw new Error('Input should be array.');
  }

  return addArray(array);
};

export const mul = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  multiply(String(inputNumOne), String(inputNumTwo));

export const sub = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  subtract(String(inputNumOne), String(inputNumTwo));
