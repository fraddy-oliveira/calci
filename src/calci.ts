import * as comparison from './operators/comparison';

import * as addition from './operators/add';

import * as multiply from './operators/mul';

import * as subtraction from './operators/sub';

import { UserInputType } from './interfaces/common';

export const lt = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  comparison.lt(String(inputNumOne), String(inputNumTwo));

export const add = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  addition.add(String(inputNumOne), String(inputNumTwo));

export const addFromArray = (array: Array<UserInputType>) => {
  if (!Array.isArray(array)) {
    throw new Error('Input should be array.');
  }

  return addition.addArray(array);
};

export const mul = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  multiply.mul(String(inputNumOne), String(inputNumTwo));

export const sub = (inputNumOne: UserInputType, inputNumTwo: UserInputType) =>
  subtraction.sub(String(inputNumOne), String(inputNumTwo));
