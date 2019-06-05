let path = require('path');
let chai_promised = require('chai-as-promised');
let chai = require("chai");
chai.use(chai_promised);
let should = chai.should();
let expect = chai.expect
let assert = require('chai').assert, foo = [];

let sci_calci = require('../sci_calci')

describe('Calculator', function () {
    before(function () {
    });

    describe('add', function () {
        it('add numbers', function () {
            sci_calci.add(1, 2).should.be.equal('3')
        })
        it('add numbers', function () {
            sci_calci.add('1123123123123123213123213', '12312312312334233331421322').should.be.equal('13435435435457356544544535')
        })
    })

    after(function () {
    })
});