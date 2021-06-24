'use strict';

module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-unused-vars': ['off'],
  },
};
