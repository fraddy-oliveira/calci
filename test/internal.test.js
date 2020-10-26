let path = require('path');
let chai_promised = require('chai-as-promised');
let chai = require("chai");
chai.use(chai_promised);
let should = chai.should();
let expect = chai.expect
let assert = require('chai').assert, foo = [];
const { PerformanceObserver, performance } = require('perf_hooks');

var rewire = require('rewire');

let app_internal = rewire('../src/calci')

let start_time = null

describe('Test internal function', function () {

    beforeEach(function () {
        start_time = performance.now()
    });

    afterEach(function () {
        //console.log('timediff:' + (performance.now() - start_time))   // print seconds required to execute each test case.
        start_time = null
    });

    describe('toggleSign', function () {

        describe('positive number', function () {

            it('#1', function () {
                app_internal.__get__('toggleSign')('12423123').should.be.equal('-12423123')
            })

        })

        describe('negative number', function () {

            it('#1', function () {
                app_internal.__get__('toggleSign')('-9587373').should.be.equal('9587373')
            })

        })

        describe('zero number with negative sign', function () {

            it('#1', function () {
                app_internal.__get__('toggleSign')('-0000').should.be.equal('0000')
            })

        })

        describe('zero number with positive sign', function () {

            it('#1', function () {
                app_internal.__get__('toggleSign')('000000').should.be.equal('-000000')
            })

        })

    })
    describe('normalize', function () {

        describe('positive number', function () {

            it('#1', function () {
                app_internal.__get__('normalize')('+12423123 ').should.be.equal('12423123')
            })

        })

        describe('negative number', function () {

            it('#1', function () {
                app_internal.__get__('normalize')(' -12423123').should.be.equal('-12423123')
            })

            it('#2', function () {
                app_internal.__get__('normalize')(' -00012423123 ').should.be.equal('-12423123')
            })

            it('#3', function () {
                app_internal.__get__('normalize')('-000').should.be.equal('0')
            })

            it('#4', function () {
                app_internal.__get__('normalize')('-00001').should.be.equal('-1')
            })

        })

        describe('zero number', function () {

            it('#1', function () {
                app_internal.__get__('normalize')('-000').should.be.equal('0')
            })

            it('#2', function () {
                app_internal.__get__('normalize')('+000').should.be.equal('0')
            })

            it('#3', function () {
                app_internal.__get__('normalize')('000').should.be.equal('0')
            })

        })

        describe('blank number', function () {

            it('#1', function () {
                app_internal.__get__('normalize')('').should.be.equal('0')
            })

            it('#2', function () {
                app_internal.__get__('normalize')('  ').should.be.equal('0')
            })

        })

        describe('invalid number', function () {

            it('#1', function () {
                expect(() => app_internal.__get__('normalize')(' - ')).to.throw("Illegal number");
            })

            it('#2', function () {
                expect(() => app_internal.__get__('normalize')('12423dd123')).to.throw("Illegal number");
            })

        })

    })
    describe('isNumber', function () {

        describe('positive no with out sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('1231231').should.be.equal(true)
            })

            it('#2', function () {
                app_internal.__get__('isNumber')('41431234002342342134234').should.be.equal(true)
            })

            it('#3', function () {
                app_internal.__get__('isNumber')('  7867234745756  ').should.be.equal(true)
            })

        })

        describe('positive no with sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('+1231231').should.be.equal(true)
            })

            it('#2', function () {
                app_internal.__get__('isNumber')('+2345234523453').should.be.equal(true)
            })

            it('#3', function () {
                app_internal.__get__('isNumber')('  +925465672783565  ').should.be.equal(true)
            })

        })

        describe('invalid positive no with sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('  +8945645023423421q34234  ').should.be.equal(false)
            })

            it('#2', function () {
                app_internal.__get__('isNumber')('s  +9754567575  a').should.be.equal(false)
            })

        })

        describe('not number', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('-+9754567575').should.be.equal(false)
            })

        })

        describe('check for zero', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('00000000').should.be.equal(true)
            })

        })

        describe('check for zero with positive sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('+00000000').should.be.equal(true)
            })

        })

        describe('check for zero with negative sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('-00000000').should.be.equal(true)
            })

        })

        describe('check for single digit zero', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('0').should.be.equal(true)
            })

        })

        describe('check for single digit zero with negative sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('-0').should.be.equal(true)
            })

        })

        describe('check for single digit zero with positive sign', function () {

            it('#1', function () {
                app_internal.__get__('isNumber')('+0').should.be.equal(true)
            })

        })

    })
    describe('isZero', function () {

        describe('check for zero', function () {

            it('#1', function () {
                app_internal.__get__('isZero')('23432').should.be.equal(false)
            })

            it('#2', function () {
                app_internal.__get__('isZero')('00').should.be.equal(true)
            })

            it('#3', function () {
                app_internal.__get__('isZero')('-0000').should.be.equal(true)
            })

            it('#4', function () {
                app_internal.__get__('isZero')('+000000').should.be.equal(true)
            })

            it('#5', function () {
                app_internal.__get__('isZero')('+435345').should.be.equal(false)
            })

            it('#6', function () {
                app_internal.__get__('isZero')('-5675435345').should.be.equal(false)
            })

        })

    })

})