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

describe('test internal function', function () {
    describe.skip('toggleSign', function () {
        it('positive number', function () {
            sci_calci.test.toggleSign('12423123').should.be.equal('-12423123')
        })
        it('negative number', function () {
            sci_calci.test.toggleSign('-9587373').should.be.equal('9587373')
        })
        it('zero number with negative sign', function () {
            sci_calci.test.toggleSign('-0000').should.be.equal('0000')
        })
        it('zero number with positive sign', function () {
            sci_calci.test.toggleSign('000000').should.be.equal('-000000')
        })
    })
    describe.skip('normalize', function () {
        it('positive number', function () {
            sci_calci.test.normalize('+12423123 ').should.be.equal('12423123')
        })
        it('negative number #1', function () {
            sci_calci.test.normalize(' -12423123').should.be.equal('-12423123')
        })
        it('negative number #2', function () {
            sci_calci.test.normalize(' -00012423123 ').should.be.equal('-12423123')
        })
        it('zero number #1', function () {
            sci_calci.test.normalize('-000').should.be.equal('0')
        })
        it('zero number #2', function () {
            sci_calci.test.normalize('+000').should.be.equal('0')
        })
        it('zero number #3', function () {
            sci_calci.test.normalize('000').should.be.equal('0')
        })
        it('blank number #1', function () {
            sci_calci.test.normalize('').should.be.equal('0')
        })
        it('blank number #2', function () {
            sci_calci.test.normalize('  ').should.be.equal('0')
        })
        it('invalid number #1', function () {
            expect(() => sci_calci.test.normalize(' - ')).to.throw("Illegal number");
        })
        it('invalid number #2', function () {
            expect(() => sci_calci.test.normalize('12423dd123')).to.throw("Illegal number");
        })
    })
    describe.skip('isNumber', function () {
        it('positive no with out sign #1', function () {
            sci_calci.isNumber('1231231').should.be.equal(true)
        })
        it('positive no with out sign #2', function () {
            sci_calci.isNumber('41431234002342342134234').should.be.equal(true)
        })
        it('positive no with out sign #3', function () {
            sci_calci.isNumber('  7867234745756  ').should.be.equal(true)
        })
        it('positive no with sign #1', function () {
            sci_calci.isNumber('+1231231').should.be.equal(true)
        })
        it('positive no with sign #2', function () {
            sci_calci.isNumber('+2345234523453').should.be.equal(true)
        })
        it('positive no with sign #3', function () {
            sci_calci.isNumber('  +925465672783565  ').should.be.equal(true)
        })

        it('invalid positive no with sign #1', function () {
            sci_calci.isNumber('  +8945645023423421q34234  ').should.be.equal(false)
        })
        it('invalid positive no with sign #2', function () {
            sci_calci.isNumber('s  +9754567575  a').should.be.equal(false)
        })
        it('check for zero #1', function () {
            sci_calci.isNumber('00000000').should.be.equal(true)
        })
        it('check for zero with negative sign #2', function () {
            sci_calci.isNumber('-00000000').should.be.equal(true)
        })
        it('check for zero with positive sign #3', function () {
            sci_calci.isNumber('+00000000').should.be.equal(true)
        })
        it('check for single digit zero #1', function () {
            sci_calci.isNumber('0').should.be.equal(true)
        })
        it('check for single digit zero with negative sign #2', function () {
            sci_calci.isNumber('-0').should.be.equal(true)
        })
        it('check for single digit zero with positive sign #3', function () {
            sci_calci.isNumber('+0').should.be.equal(true)
        })
    })
    describe('isZero',function(){
        it('check for zero #1',function(){
            sci_calci.test.isZero('23432').should.be.equal(false)
        })
        it('check for zero #2',function(){
            sci_calci.test.isZero('00').should.be.equal(true)
        })
        it('check for zero #3',function(){
            sci_calci.test.isZero('-0000').should.be.equal(true)
        })
        it('check for zero #4',function(){
            sci_calci.test.isZero('+000000').should.be.equal(true)
        })
        it('check for zero #5',function(){
            sci_calci.test.isZero('+435345').should.be.equal(false)
        })
        it('check for zero #6',function(){
            sci_calci.test.isZero('-5675435345').should.be.equal(false)
        })
    })
})

afterEach(function () {
    //console.log('timediff:' + (performance.now() - start_time))
    start_time = null
});