let path = require('path');
let chai_promised = require('chai-as-promised');
let chai = require("chai");
chai.use(chai_promised);
let should = chai.should();
let expect = chai.expect
let assert = require('chai').assert, foo = [];
const { PerformanceObserver, performance } = require('perf_hooks');

let sci_calci = require('../calci')

let start_time = null
beforeEach(function () {
    start_time = performance.now()
});

describe('add 2 numbers', function () {
    before(function () {
    });

    it('add numbers 1', function () {
        return new Promise((res, rej) => {
            setTimeout(function () {
                res(sci_calci.add('1123123123123123213123213', '12312312312334233331421322').should.be.equal('13435435435457356544544535'))
            }, 10)
        });
    });

    it('add numbers 1', function () {
        sci_calci.add('1123123123123123213123213', '12312312312334233331421322').should.be.equal('13435435435457356544544535')
    })

    it('add numbers of 10 digit', function () {
        sci_calci.add('1123123423', '8345345523').should.be.equal('9468468946')
    })
    it('both numbers blank', function () {
        sci_calci.add(' ', ' ').should.be.equal('0')
    })
    it('both numbers zero', function () {
        sci_calci.add('0', '0').should.be.equal('0')
    })
    it('add numbers from array 1', function () {
        let arr = ((digit) => {
            let arr = []
            for (let i = 0; i < digit; i++) {
                arr.push(parseInt(Math.random() * 1000000000000))
            }
            return arr
        })(100)
        sci_calci.add(arr).should.be.equal(arr.reduce((a, b) => a + b, 0).toString())
    })
    it('add numbers from array 2', function () {
        let arr = [00, 00, 00]
        sci_calci.add(arr).should.be.equal(arr.reduce((a, b) => a + b, 0).toString())
    })
    it('add long numbers from array 3', function () {
        let arr = ['1123123123123123453423213123213', '1231231233245123342234523433331421322', '1231231223453123342333332453245423451421322', '12312232345453245345312312334233331421322', '12312312312334233331421322']
        sci_calci.add(arr).should.be.equal('1243544687030932968237422435890746658808501')
    })
    it('add numbers from array 4', function () {
        let arr = [12, 12, 12]
        sci_calci.add(arr).should.be.equal(arr.reduce((a, b) => a + b, 0).toString())
    })

    after(function () {
    })
});

afterEach(function () {
    //console.log('timediff:' + (performance.now() - start_time))
    start_time = null
});