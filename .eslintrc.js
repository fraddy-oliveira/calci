module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': ['off'],
    'import/no-unresolved': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'no-unused-expressions': ['off'],
    'import/prefer-default-export': ['off'],
    'no-param-reassign': ['off'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
