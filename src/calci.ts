import * as comparison from './operators/comparison';

import * as addition from './operators/add';

import * as multiply from './operators/mul';

import * as subtraction from './operators/sub';

export const lt = (inputNumOne: unknown, inputNumTwo: unknown) =>
  comparison.lt(String(inputNumOne), String(inputNumTwo));

export const add = (inputNumOne: unknown, inputNumTwo: unknown) =>
  addition.add(String(inputNumOne), String(inputNumTwo));

export const addFromArray = (array: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Input should be array.');
  }

  return addition.addArray(array);
};

export const mul = (inputNumOne: unknown, inputNumTwo: unknown) =>
  multiply.mul(String(inputNumOne), String(inputNumTwo));

export const sub = (inputNumOne: unknown, inputNumTwo: unknown) =>
  subtraction.sub(String(inputNumOne), String(inputNumTwo));
