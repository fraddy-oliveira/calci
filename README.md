# Calci

Calci is a library which allows to do operations on huge digits of integer numbers that cannot be handled by pure JavaScript.

## Experimental code

The library is still under development and testing. Not suitable for Production system.

## Prerequisite

- Node version >=12.4.0
- Can be consumed as CommonJs or ES module

## Support

- The library is only supported in NodeJs.
- The package supports the operations only integer numbers.

## Getting Started

## Installation

```cmd
npm install --save sci-calci
```

### How to use Calci ?

```js
const assert = require('assert');

const {add, sub, mul, addFromArray, lt} = require('sci-calci');

assert.strictEqual(
  add('95857458950595857575789506', '969685885748595050059484'),
  '96827144836344452625848990',
  'Addition failed',
);

assert.strictEqual(
  sub('95857458950595857575789506', '969685885748595050059484'),
  '94887773064847262525730022',
  'Subtraction failed',
);

assert.strictEqual(
  mul('958504957305857494505', '2049584045585058958'),
  '1964536468108273617340322645756586025790',
  'Multiplication failed',
);

assert.strictEqual(
  addFromArray(['21', '95', '25']),
  '141',
  'Add numbers from array failed',
);

assert.strictEqual(lt('100', '153'), true, '100 is less than 153');

assert.strictEqual(lt('153', '100'), false, '153 is not less than 100');
```

### Operation Supported

- Addition
- Subraction
- Multiplication
- Less than opertor

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
