Calci is a library which allows to do operations on huge digits numbers which cannot be handled by pure javascript.

Operation which are supported:
1) Addition
2) Subraction
3) Multiplication
4) Less than opertor

Support:
Currently library support is only for NodeJs. In future support will be extended to browser.

Example:
1) Addition
  let calci = require('./calci');
  calci.add('1123123123123123213123213', '12312312312334233331421322'); // result is 13435435435457356544544535
