let path = require('path');
let chai_promised = require('chai-as-promised');
let chai = require("chai");
chai.use(chai_promised);
let should = chai.should();
let expect = chai.expect
let assert = require('chai').assert, foo = [];
const { PerformanceObserver, performance } = require('perf_hooks');

var rewire = require('rewire');

let app_internal = rewire('../calci')

let start_time = null
beforeEach(function () {
    start_time = performance.now()
});

describe('Test internal function', function () {
    describe('toggleSign', function () {
        it('positive number', function () {
            app_internal.__get__('toggleSign')('12423123').should.be.equal('-12423123')
        })
        it('negative number', function () {
            app_internal.__get__('toggleSign')('-9587373').should.be.equal('9587373')
        })
        it('zero number with negative sign', function () {
            app_internal.__get__('toggleSign')('-0000').should.be.equal('0000')
        })
        it('zero number with positive sign', function () {
            app_internal.__get__('toggleSign')('000000').should.be.equal('-000000')
        })
    })
    describe('normalize', function () {
        it('positive number', function () {
            app_internal.__get__('normalize')('+12423123 ').should.be.equal('12423123')
        })
        it('negative number #1', function () {
            app_internal.__get__('normalize')(' -12423123').should.be.equal('-12423123')
        })
        it('negative number #2', function () {
            app_internal.__get__('normalize')(' -00012423123 ').should.be.equal('-12423123')
        })
        it('zero number #1', function () {
            app_internal.__get__('normalize')('-000').should.be.equal('0')
        })
        it('zero number #2', function () {
            app_internal.__get__('normalize')('+000').should.be.equal('0')
        })
        it('zero number #3', function () {
            app_internal.__get__('normalize')('000').should.be.equal('0')
        })
        it('blank number #1', function () {
            app_internal.__get__('normalize')('').should.be.equal('0')
        })
        it('blank number #2', function () {
            app_internal.__get__('normalize')('  ').should.be.equal('0')
        })
        it('invalid number #1', function () {
            expect(() => app_internal.__get__('normalize')(' - ')).to.throw("Illegal number");
        })
        it('invalid number #2', function () {
            expect(() => app_internal.__get__('normalize')('12423dd123')).to.throw("Illegal number");
        })
    })
    describe('isNumber', function () {
        it('positive no with out sign #1', function () {
            app_internal.__get__('isNumber')('1231231').should.be.equal(true)
        })
        it('positive no with out sign #2', function () {
            app_internal.__get__('isNumber')('41431234002342342134234').should.be.equal(true)
        })
        it('positive no with out sign #3', function () {
            app_internal.__get__('isNumber')('  7867234745756  ').should.be.equal(true)
        })
        it('positive no with sign #1', function () {
            app_internal.__get__('isNumber')('+1231231').should.be.equal(true)
        })
        it('positive no with sign #2', function () {
            app_internal.__get__('isNumber')('+2345234523453').should.be.equal(true)
        })
        it('positive no with sign #3', function () {
            app_internal.__get__('isNumber')('  +925465672783565  ').should.be.equal(true)
        })

        it('invalid positive no with sign #1', function () {
            app_internal.__get__('isNumber')('  +8945645023423421q34234  ').should.be.equal(false)
        })
        it('invalid positive no with sign #2', function () {
            app_internal.__get__('isNumber')('s  +9754567575  a').should.be.equal(false)
        })
        it('not number #1', function () {
            app_internal.__get__('isNumber')('-+9754567575').should.be.equal(false)
        })
        it('check for zero #1', function () {
            app_internal.__get__('isNumber')('00000000').should.be.equal(true)
        })
        it('check for zero with negative sign #2', function () {
            app_internal.__get__('isNumber')('-00000000').should.be.equal(true)
        })
        it('check for zero with positive sign #3', function () {
            app_internal.__get__('isNumber')('+00000000').should.be.equal(true)
        })
        it('check for single digit zero #1', function () {
            app_internal.__get__('isNumber')('0').should.be.equal(true)
        })
        it('check for single digit zero with negative sign #2', function () {
            app_internal.__get__('isNumber')('-0').should.be.equal(true)
        })
        it('check for single digit zero with positive sign #3', function () {
            app_internal.__get__('isNumber')('+0').should.be.equal(true)
        })
    })
    describe('isZero', function () {
        it('check for zero #1', function () {
            app_internal.__get__('isZero')('23432').should.be.equal(false)
        })
        it('check for zero #2', function () {
            app_internal.__get__('isZero')('00').should.be.equal(true)
        })
        it('check for zero #3', function () {
            app_internal.__get__('isZero')('-0000').should.be.equal(true)
        })
        it('check for zero #4', function () {
            app_internal.__get__('isZero')('+000000').should.be.equal(true)
        })
        it('check for zero #5', function () {
            app_internal.__get__('isZero')('+435345').should.be.equal(false)
        })
        it('check for zero #6', function () {
            app_internal.__get__('isZero')('-5675435345').should.be.equal(false)
        })
    })
})


afterEach(function () {
    //console.log('timediff:' + (performance.now() - start_time))
    start_time = null
});