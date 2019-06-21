let path = require('path');
let chai_promised = require('chai-as-promised');
let chai = require("chai");
chai.use(chai_promised);
let should = chai.should();
let expect = chai.expect
let assert = require('chai').assert, foo = [];
const { PerformanceObserver, performance } = require('perf_hooks');

let calci = require('../calci')

let start_time = null

describe('subtract (sub)', function () {

    beforeEach(function () {
        start_time = performance.now()
    });

    afterEach(function () {
        //console.log('timediff:' + (performance.now() - start_time))   // print seconds required to execute each test case.
        start_time = null
    });

    describe('two positive numbers', function () {

        it('#1', function () {
            calci.sub('60', '90').should.be.equal('-30')
        })

        it('#2', function () {
            calci.sub('42343242343234343260', '42234234343260').should.be.equal('42343200109000000000')
        })

        it('#3', function () {
            calci.sub('00', '00').should.be.equal('0')
        })

        it('#4', function () {
            calci.sub('989', '89').should.be.equal('900')
        })

        it('#5', function () {
            calci.sub('555', '555').should.be.equal('0')
        })

        it('#6', function () {
            calci.sub('9000000', '1111111').should.be.equal('7888889')
        })

        it('#7', function () {
            calci.sub('34', '55').should.be.equal('-21')
        })

    })

    describe('first negative numbers', function () {

        it('#1', function () {
            calci.sub('-60', '90').should.be.equal('-150')
        })

        it('#2', function () {
            calci.sub('-150', '90').should.be.equal('-240')
        })

    });

    describe('second negative numbers', function () {

        it('#1', function () {
            calci.sub('60', '-90').should.be.equal('150')
        })

    });

})