const {RE_IS_NUMBER} = require('./patterns');

const isNumber = (num) => {
  return RE_IS_NUMBER.test(num.toString().trim());
};

module.exports = {isNumber};
