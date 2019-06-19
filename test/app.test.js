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

describe('lt', function () {
    it('both positive number #1', function () {
        sci_calci.lt('123', '2342').should.be.equal(true)
    })
    it('both positive number #2', function () {
        sci_calci.lt('123213', '2342').should.be.equal(false)
    })
    it('both negative number #1', function () {
        sci_calci.lt('-123213', '-2342').should.be.equal(true)
    })
    it('both negative number #2', function () {
        sci_calci.lt('-4564', '-346354535').should.be.equal(false)
    })
    it('one negative and one positive number #1', function () {
        sci_calci.lt('-4564', '346354535').should.be.equal(true)
    })
    it('one negative and one positive number #2', function () {
        sci_calci.lt('4564', '-346354535').should.be.equal(false)
    })
    it('one negative and one positive number #3', function () {
        sci_calci.lt('0', '-346354535').should.be.equal(false)
    })
    it('one negative and one positive number #4', function () {
        sci_calci.lt('-4534', '-0').should.be.equal(true)
    })
    it('both zeroes number #1', function () {
        sci_calci.lt('000', '-000').should.be.equal(false)
    })
    it('both zeroes number #2', function () {
        sci_calci.lt('+0000', '-00000').should.be.equal(false)
    })
    it('both zeroes number #3', function () {
        sci_calci.lt('+0', '-0').should.be.equal(false)
    })
    it('both zeroes number #4', function () {
        sci_calci.lt('000', '0000').should.be.equal(false)
    })
    it('both zeroes number #5', function () {
        sci_calci.lt('0', '0').should.be.equal(false)
    })
})

afterEach(function () {
    //console.log('timediff:' + (performance.now() - start_time))
    start_time = null
});