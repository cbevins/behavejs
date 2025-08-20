const load = 'ovendry fuel load'
const fuelmois = 'fuel moisture content'
const windspeed = 'wind speed'

const _fp = {
    load: [0, 'ovendry fuel load'],
    savr: [1, 'surface area to volume ratio'],
}

const _life = {
    a : {..._fp},
    b : {..._fp},
}

const bed = {
    dead: {..._life},
    live: {..._life},
}

const site = {
    canopy: {},
    surface: {
        primary: {
            bed: {...bed},
        },
        secondary: {
            bed: {...bed},
        },
    },
    terrain: {},
    weather: {
        moisture: {
            dead: {
                h1: [0.1, fuelmois],
                h10: [0.15, fuelmois],
                h100: [0.2, fuelmois],
            },
            live: {
                herb: [1.0, fuelmois],
                stem: [2.0, fuelmois],
            },
        },
        wind: {
            speed: {
                at20ft: [0, windspeed],
                at10m: [0, windspeed],
            }
        },
    },
}

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function names(obj, pref='', abbr='', sep='/', d=0) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const id = pref + sep + key
            const ab = abbr + key[0]
            if (isPlainObject(obj[key])) {
                console.log(`${' '.padStart(4*d)}${key} (${id}) [${ab}]`)
                names(obj[key], id, ab, sep, d+1)
            } else {
                console.log(`${' '.padStart(4*d)}${key} (${id}) [${ab}]`, obj[key])
            }
        }
    }
}
names(site, 'site', 's',  '/')
console.log(site.surface.primary.bed.dead.a.load)