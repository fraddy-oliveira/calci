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

describe('subtract 2 positive numbers', function () {
    it('subtract 2 nos #1', function () {
        sci_calci.sub('60', '90').should.be.equal('-30')
    })
    it('subtract 2 nos #2', function () {
        sci_calci.sub('42343242343234343260', '42234234343260').should.be.equal('42343200109000000000')
    })
    it('subtract 2 nos #3', function () {
        sci_calci.sub('00', '00').should.be.equal('0')
    })
    it('subtract 2 nos #4', function () {
        sci_calci.sub('989', '89').should.be.equal('900')
    })
    it('subtract 2 nos #5', function () {
        sci_calci.sub('555', '555').should.be.equal('0')
    })
    it('subtract 2 nos #6', function () {
        sci_calci.sub('9000000', '1111111').should.be.equal('7888889')
    })
    it('subtract 2 nos #7', function () {
        sci_calci.sub('34', '55').should.be.equal('-21')
    })
})

describe('subtract negative numbers', function () {
    it('subtract nos #1', function () {
        sci_calci.sub('60', '-90').should.be.equal('150')
    })
    it('subtract nos #2', function () {
        sci_calci.sub('-60', '90').should.be.equal('-150')
    })
    it('subtract nos #3', function () {
        sci_calci.sub('-150', '90').should.be.equal('-240')
    })
});

afterEach(function () {
    //console.log('timediff:' + (performance.now() - start_time))
    start_time = null
});