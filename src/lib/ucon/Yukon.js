export class Yukon {
    constructor(uomDefs) {
        this.uomDefs = uomDefs
        this.uomMap = new Map()
        this._loadUomMap()
    }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------
    
    _compile(expression, sig, div=false) {
        const terms = this._parse(expression, div)
        for(let term of terms) {
            if (!this.uomMap.has(term.key)) throw new Error(`Map does not have a key '${term.key}'`)
            const units = this.uomMap.get(term.key)
            if (term.key === units.into) { // if this term key is a base units key
                sig[term.key] += term.div ? -term.dim : term.dim
            } else {
                for(let d=1; d<=term.dim; d++) {
                    sig.factor *= term.div ? (1/units.factor) : units.factor
                    this._compile(units.into, sig, term.div)
                }
            }
        }
        return sig
    }

    _loadUomMap() {
        for(let uomDef of this.uomDefs) {
            const {type, base, label, units} = uomDef
            for(let unit of units) {
                const [key, factor, into] = unit
                this.uomMap.set(key, {key, type, base, factor, into})
            }
        }
    }

    /**
     * Recognizes numerator/denomination, uom keys, and powers
     * @param {string} expression 
     * @param {bool} div If true, then starting in denominator, otherwise starting in numerator
     * @returns Array of {key, dim, div} objects
     */
    _parse(expression, div) {
        const terms = []
        let flipped = false
        // Uses regex where '\b\w+\b' matches a word characters and '[^\s]' matches whitespace
        const tokens = expression.match(/(\b\w+\b|[^\s])/g)
        for(let token of tokens) {
            // Each expression has only 1 num and 1 denom, regardless of number of '/' or 'per'
            if (token === '/' || token === 'per') {
                if (!flipped) div = !div
                flipped = true
            } else if (['1',' ', '.', '-', '*', '^', ''].includes(token)) {
                // ignore separators, the '1' catches expressions like '1/s' or '1/ft'
            } else {
                let key = token
                let dim = 1
                const last = token.charAt(token.length - 1)
                if (last === '1' || last === '2' || last === '3' || last==='4') {
                    key = token.slice(0, -1)
                    dim = parseInt(last)
                }
                const term = {key, dim, div}
                terms.push(term)
            }
        }
        return terms
    }

    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    compile(expression) {
        const sig = this.newSig()
        this._compile(expression, sig)
        return sig
    }

    convert(quant, fromUom, intoUom) {
        const fromSig = this.compile(fromUom)
        const intoSig = this.compile(intoUom)
        if (!Yukon.sameBase(fromSig, intoSig)) {
            const fromBase = this.sigUom(fromSig)
            const intoBase = this.sigUom(intoSig)
            throw new Error(
                `Source expression has base units '${fromBase}', while dest expression has base units '${intoBase}'`)
        }
        return quant * fromSig.factor / intoSig.factor
    }
        
    // Returns a new sig (signature) object
    newSig() {return {factor: 1, m: 0, kg: 0, s: 0, J: 0, oC: 0, A: 0, c: 0}}

    static sameBase(sig1, sig2) {
        for(let u of ['m', 'kg', 's', 'J', 'oC', 'A', 'c'])
            if (sig1[u] !== sig2[u]) return false
        return true
    }

    sigUom(sig, sep='-') {
        let num = []
        let den = []
        for(let u of ['m', 'kg', 's', 'J', 'oC', 'A', 'c']) {
            if (sig[u] > 0) {
                if (sig[u]===1) num.push(u)
                else num.push(u+sig[u])
            } else if (sig[u]<0) {
                if (sig[u] === -1) den.push(u)
                else den.push(u+Math.abs(sig[u]))
            }
        }
        let str = num.length ? num.join(sep) : 1
        if (den.length) {
            str += '/' + den.join(sep)
        }
        return str
    }
}
