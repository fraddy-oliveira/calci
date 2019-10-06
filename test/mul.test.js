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

describe('multiply (mul)', function () {

    beforeEach(function () {
        start_time = performance.now()
    });

    afterEach(function () {
        //console.log('timediff:' + (performance.now() - start_time))   // print seconds required to execute each test case.
        start_time = null
    });

    describe('first number negative and second number positive', function () {

        it('#1', function () {
            calci.mul('-12', '12').should.be.equal('-144')
        })

        it('#2', function () {
            calci.mul('-000', '00001').should.be.equal('0')
        })

        it('#3', function () {
            calci.mul('-000', '0000').should.be.equal('0')
        })

        it('#4', function () {
            calci.mul('-100', '100').should.be.equal('-10000')
        })

        it('#5', function () {
            calci.mul('-872348723947324723947238947293847234732283478234783247893', '23489734892374932749237489503485094395555435439584390580').should.be.equal('-20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940')
        })

        it('#6', function () {
            calci.mul('-23489734892374932749237489503485094395555435439584390580', '872348723947324723947238947293847234732283478234783247893').should.be.equal('-20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940')
        })

        it('#7', function () {
            calci.mul('-1223489734892374932749237489503485094395555435439584390580', '32872348723947324723947238947293847234732283478234783247893').should.be.equal('-40218981225552011738355807513786710644956418114572074681342694602048367563738184734951914168924668336638437474047940')
        })

        it('#8', function () {
            calci.mul('-24213421342342134123412342134123423423333333333333312342421342342421342134234213412341234213412342342333333333333331234242134234', '242134213423421341234123421341234234233333333333333123424213423425435345345325325234534').should.be.equal('-5862897731017895563354347895515829861193226259556387249279481416948511964698067962133914423425726208677270449233028929459679293390385926573835444949407963387414322255794782327739020453173115175416370741420760436956')
        })

    })
    describe('both positive numbers', function () {

        let num_1 = 0, num_2 = 0

        beforeEach(function () {
            num_1 = parseInt(Math.random() * 100000)
            num_2 = parseInt(Math.random() * 1000)
        });

        afterEach(function () {
            num_1 = 0
            num_2 = 0
        });

        it('#1', function () {
            calci.mul(num_1, num_2).should.be.equal((num_1 * num_2).toString())
        })

        it('#2', function () {
            calci.mul(num_1, num_2).should.be.equal((num_1 * num_2).toString())
        })

        it('#3', function () {
            calci.mul(num_1, num_2).should.be.equal((num_1 * num_2).toString())
        })

        it('#4', function () {
            calci.mul(num_1, num_2).should.be.equal((num_1 * num_2).toString())
        })

    })

    describe('both numbers negative', function () {

        it('#1', function () {
            calci.mul('-12', '-12').should.be.equal('144')
        })

        it('#2', function () {
            calci.mul('-000', '-00001').should.be.equal('0')
        })

        it('#3', function () {
            calci.mul('-000', '-0000').should.be.equal('0')
        })

        it('#4', function () {
            calci.mul('-100', '-100').should.be.equal('10000')
        })

        it('#5', function () {
            calci.mul('-872348723947324723947238947293847234732283478234783247893', '-23489734892374932749237489503485094395555435439584390580').should.be.equal('20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940')
        })

        it('#6', function () {
            calci.mul('-23489734892374932749237489503485094395555435439584390580', '-872348723947324723947238947293847234732283478234783247893').should.be.equal('20491240259224221643521112922570942619904006623634285311094602048367563738184734951914168924668336638437474047940')
        })

        it('#7', function () {
            calci.mul('-1223489734892374932749237489503485094395555435439584390580', '-32872348723947324723947238947293847234732283478234783247893').should.be.equal('40218981225552011738355807513786710644956418114572074681342694602048367563738184734951914168924668336638437474047940')
        })

        it('#8', function () {
            calci.mul('-24213421342342134123412342134123423423333333333333312342421342342421342134234213412341234213412342342333333333333331234242134234', '-242134213423421341234123421341234234233333333333333123424213423425435345345325325234534').should.be.equal('5862897731017895563354347895515829861193226259556387249279481416948511964698067962133914423425726208677270449233028929459679293390385926573835444949407963387414322255794782327739020453173115175416370741420760436956')
        })

    })

})
