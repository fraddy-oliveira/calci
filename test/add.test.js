let path = require('path');
let chai_promised = require('chai-as-promised');
let chai = require("chai");
chai.use(chai_promised);
let should = chai.should();
let expect = chai.expect
let assert = require('chai').assert, foo = [];
const { PerformanceObserver, performance } = require('perf_hooks');

let calci = require('../src/calci')

let start_time = null

describe('addition (add)', function () {

    beforeEach(function () {
        start_time = performance.now()
    });

    afterEach(function () {
        //console.log('timediff:' + (performance.now() - start_time))   // print seconds required to execute each test case.
        start_time = null
    });

    describe('add two numbers', function () {

        it('#1', function () {
            return new Promise((res, rej) => {
                setTimeout(function () {
                    res(calci.add('1123123123123123213123213', '12312312312334233331421322').should.be.equal('13435435435457356544544535'))
                }, 10)
            });
        });

        it('#2', function () {
            calci.add('1123123123123123213123213', '12312312312334233331421322').should.be.equal('13435435435457356544544535')
        })

        it('#3 - 10 digit', function () {
            calci.add('1123123423', '8345345523').should.be.equal('9468468946')
        })

        it('#4 - both blank', function () {
            calci.add(' ', ' ').should.be.equal('0')
        })

        it('#5 - both zero', function () {
            calci.add('0', '0').should.be.equal('0')
        })

    })

    describe('add numbers from array', function () {

        it('#1', function () {
            let arr = ((digit) => {
                let arr = []
                for (let i = 0; i < digit; i++) {
                    arr.push(parseInt(Math.random() * 1000000000000))
                }
                return arr
            })(100)
            calci.add(arr).should.be.equal(arr.reduce((a, b) => a + b, 0).toString())
        })

        it('#2', function () {
            let arr = [00, 00, 00]
            calci.add(arr).should.be.equal(arr.reduce((a, b) => a + b, 0).toString())
        })

        it('#3', function () {
            let arr = ['1123123123123123453423213123213', '1231231233245123342234523433331421322', '1231231223453123342333332453245423451421322', '12312232345453245345312312334233331421322', '12312312312334233331421322']
            calci.add(arr).should.be.equal('1243544687030932968237422435890746658808501')
        })

        it('#4', function () {
            let arr = [12, 12, 12]
            calci.add(arr).should.be.equal(arr.reduce((a, b) => a + b, 0).toString())
        })

    })

});