            // black: 30, red: 31, green 32, yellow 33, blue 34, magenta 35, cyan 36, white 37 (+10 for BG)
const black = '\x1b[30m'
const red   = '\x1b[31m'
const green = '\x1b[32m'
const yellow = '\x1b[33m'
const blue = '\x1b[34m'
const magenta = '\x1b[35m'
const cyan = '\x1b[36m'
const white = '\x1b[37m'

export class Assert {
    constructor(name='Assert') {
        this.reset(name)
    }

    that(desc, actual) {
        this.desc = desc
        this.actual = actual
        this.major++
        this.minor = 0
        return this
    }

    equals(expected) {
        this._startTest('equals', expected)
        if (this._isObject(expected)) this._testObject()
        else if (Array.isArray(expected)) this._testArray()
        else this._testEqual()
        this.tests.push(this.test)
        return this
    }

    failures() {
        const pass = this.tests.reduce((pass, test) => test.result==='OK' ? 1 : 0, 0)
        let str = `${this.name} Test Failures:\n`
        for(let t of this.tests) {
            const {major, minor, desc, actual, test, expected, result} = t
            if (result !== 'OK')
                str += `${major}.${minor} "${desc}" ${red}"${actual}"${red} ${test} ${green}"${expected}"${black} ${red}FAILED: ${result}${black}\n`
        }
        console.log(str)
        return this
    }

    report() {
        let str = `${this.name} Test Report:\n`
        for(let t of this.tests) {
            const {major, minor, desc, actual, test, expected, result} = t
            const pass = (result === 'OK') ? `${green}PASS${black}` : `${red}FAIL${black}`
            const why = (result === 'OK') ? `${green}OK${black}` : `${red}${result}${black}`
            str += `  ${major}.${minor} ${pass} "${desc}" actual "${actual}" ${test} expected "${expected}": ${why}\n`
        }
        console.log(str)
        return this
    }


    reset(name) {
        this.name = name
        this.desc = null
        this.actual = null
        this.major = 0
        this.minor = 0
        this.test = {}
        this.tests = []
        return this
    }

    summary() {
        let pass = 0
        let fail = 0
        for(let test of this.tests) {
            if(test.result==='OK') pass++
            else fail++
        }
        let str = `${this.name}: `
        if (fail)
            str += `${red}${fail} FAIL, ${green}${pass} PASS${black}`
        else
            str += `${green}${pass} PASS${black}`
        console.log(str)
        return this
    }

    //--------------------------------------------------------------------------
    _isObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value)
    }
    
    _startTest(name, expected) {
        this.test = {
            major: this.major,
            minor: ++this.minor,
            desc: this.desc,
            actual: this.actual,
            test: name,
            expected: expected,
            result: 'OK'
        }
    }

    _testArray() {
        const {desc, actual, expected} = this.test
        console.log('TEST ARRAY', actual, 'against expected', expected)
        if (! Array.isArray(actual)) {
            this.test.result = 'ACTUAL IS NOT AN ARRAY'
        } else if (actual.length !== expected.length) {
            this.test.result = `ACTUAL ARRAY LENGTH IS ${actual.length}, BUT EXPECTED ARRAY LENGTH IS ${expected.length}`
        } else {
            for(let i=0; i<expected.length; i++) {
                if (expected[i] !== actual[i]) {
                    this.test.result = `EXPECTED ELEMENT "${i}" TO BE "${expected[i]}", BUT ACTUAL WAS "${actual[i]}"`
                    break
                }
            }
        }
    }

    _testEqual() {
        const {desc, actual, expected} = this.test
        this.test.result = (expected === actual) ? 'OK' : `EXPECTED "${expected}", BUT ACTUAL WAS "${actual}"`
    }

    _testObject() {
        const {desc, actual, expected} = this.test
        if (! this._isObject(actual)) {
            this.test.result = 'ACTUAL IS NOT AN OBJECT'
        } else {
            for (const key of Object.keys(expected)) {
                if (! actual.hasOwnProperty(key)) {
                    this.test.result = `ACTUAL IS MISSING PROP "${key}"`
                } else if (actual[key] !== expected[key]) {
                    this.test.result = `EXPECTED PROP "${key}" TO BE "${expected[key]}", BUT ACTUAL WAS "${actual[key]}"`
                }
            }
        }
    }
}
