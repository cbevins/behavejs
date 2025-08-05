export class Expect {
    constructor(name, verbose=true) {
        this.name = name
        this.verbose = verbose
        this.results = []
        this.pass = 0
        this.fail = 0
        this._title()
    }

    alike(desc, expected, actual) {
        let result = 'OK'
        if (! Array.isArray(actual)) {
            result = 'ACTUAL IS NOT AN ARRAY'
        } else if (actual.length !== expected.length) {
            result = `EXPECTED ARRAY LENGTH IS "${expected.length}", BUT ACTUAL ARRAY LENGTH IS "${actual.length}"`
        } else {
            for(let i=0; i<expected.length; i++) {
                if (!actual.includes(expected[i])) {
                    result = `EXPECTED ELEMENT "${i}" VALUE "${expected[i]}" IS NOT PRESENT IN ACTUAL ARRAY`
                    break
                }
            }
        }
        this._store(desc, expected, actual, result)
        return this
    }

    equal(desc, expected, actual) {
        if (this._isObject(expected)) this._expectObject(desc, expected, actual)
        else if (Array.isArray(expected)) this._expectArray(desc, expected, actual)
        else this._expectEqual(desc, expected, actual)
        return this
    }

    summary() {
        // black: 30, red: 31, green 32, yellow 33, blue 34, magenta 35, cyan 36, white 37 (+10 for BG)
        if (this.fail) {
            console.log(`\x1b[31m ${this.fail} FAILED TESTS\x1b[0m`)
            console.log(`\x1b[32m ${this.pass} PASSED TESTS\x1b[0m`)
        } else {
            console.log(`\x1b[32mALL ${this.pass} TESTS PASSED\x1b[0m`)
        }
        return this
    }

    //--------------------------------------------------------------------------

    _title() {
        console.log(`\n\x1b[36m${'-'.padStart(this.name.length, '-')}\x1b[0m`)
        console.log(`\x1b[36m${this.name}\x1b[0m`)
        console.log(`\x1b[36m${'-'.padStart(this.name.length, '-')}\x1b[0m`)
    }

    _expectArray(desc, expected, actual) {
        let result = 'OK'
        if (! Array.isArray(actual)) {
            result = 'ACTUAL IS NOT AN ARRAY'
        } else {
            for(let i=0; i<expected.length; i++) {
                if (expected[i] !== actual[i]) {
                    result = `EXPECTED ELEMENT "${i}" TO BE "${expected[i]}", BUT ACTUAL WAS "${actual[i]}"`
                    break
                }
            }
        }
        this._store(desc, expected, actual, result)
        return this
    }

    _expectEqual(desc, expected, actual) {
        let result = (expected === actual) ? 'OK' : `EXPECTED "${expected}", BUT ACTUAL WAS "${actual}"`
        this._store(desc, expected, actual, result)
        return this
    }

    _expectObject(desc, expected, actual) {
        let result = "OK"
        if (! this._isObject(actual)) {
            result = 'ACTUAL IS NOT AN OBJECT'
        } else {
            for (const key of Object.keys(expected)) {
                if (! actual.hasOwnProperty(key)) {
                    result = `ACTUAL IS MISSING PROP "${key}"`
                } else if (actual[key] !== expected[key]) {
                    result = `EXPECTED PROP "${key}" TO BE "${expected[key]}", BUT ACTUAL WAS "${actual[key]}"`
                }
            }
        }
        this._store(desc, expected, actual, result)
        return this
    }

    _isObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
    
    _store(desc, expected, actual, result) {
        this.results.push([desc, expected, actual, result])
        if (result === 'OK') this.pass++
        else this.fail++
        if (this.verbose) {
            // black: 30, red: 31, green 32, yellow 33, blue 34, magenta 35, cyan 36, white 37 (+10 for BG)
            const c1 = (result === 'OK') ? '\x1b[32m' : '\x1b[31m'
            console.log(`\x1b[36mTest ${this.results.length}: ${desc}\x1b[0m\n    EXPECTED: "${expected}"\n    ACTUAL: "${actual}"\n    ${c1}RESULT: ${result}\x1b[0m`)
        }
    }
}
