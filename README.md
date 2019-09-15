# Calci

Calci is a library which allows to do operations on huge digits integer numbers which cannot be handled by pure JavaScript.

## Experimental code

Library is still under development and testing. Not suitable for Production system.

## Support

Currently library is only supported in NodeJs. In future support will be extended to browser.

## Getting Started

### Usage
1) Copy calci.js file from github repository to directory Path_to_project/
2) include library in wrapper file
```
  let calci = require('./calci')
```
3) do addition operation of two numbers
```
  calci.add('1123123123123123213123213', '12312312312334233331421322'); // result is 13435435435457356544544535
```

### Operation Supported
1) Addition
2) Subraction
3) Multiplication
4) Less than opertor
