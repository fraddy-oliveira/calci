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

describe('less than (lt)', function () {

    beforeEach(function () {
        start_time = performance.now()
    });

    afterEach(function () {
        //console.log('timediff:' + (performance.now() - start_time))   // print seconds required to execute each test case.
        start_time = null
    });

    describe('both positive number', function () {

        it('#1', function () {
            calci.lt('123', '2342').should.be.equal(true)
        })

        it('#2', function () {
            calci.lt('123213', '2342').should.be.equal(false)
        })

    })

    describe('both negative number', function () {

        it('#1', function () {
            calci.lt('-123213', '-2342').should.be.equal(true)
        })

        it('#2', function () {
            calci.lt('-4564', '-346354535').should.be.equal(false)
        })

    })

    describe('one negative and one positive number', function () {

        it('#1', function () {
            calci.lt('-4564', '346354535').should.be.equal(true)
        })

        it('#2', function () {
            calci.lt('4564', '-346354535').should.be.equal(false)
        })

        it('#3', function () {
            calci.lt('0', '-346354535').should.be.equal(false)
        })

        it('#4', function () {
            calci.lt('-4534', '-0').should.be.equal(true)
        })

    })

    describe('both zeroes number', function () {

        it('#1', function () {
            calci.lt('000', '-000').should.be.equal(false)
        })

        it('#2', function () {
            calci.lt('+0000', '-00000').should.be.equal(false)
        })

        it('#3', function () {
            calci.lt('+0', '-0').should.be.equal(false)
        })

        it('#4', function () {
            calci.lt('000', '0000').should.be.equal(false)
        })

        it('#5', function () {
            calci.lt('0', '0').should.be.equal(false)
        })

    })

})
