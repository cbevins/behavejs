const slope = {
    direction: 0,
    steepness: 0
}

const wind = {
    direction: 0,
    speed: 0,
}

export const site = {
    canopy: {
        fire: {},
        fuel: {},
    },
    observed: {
        fire: {},
        moisture: {...},
    }
    surface: {
        primary: {
            fire: {
                ros: 0,
                direction: 0,
                lwr: 1,
                flame: 0,
                hpua: 0,
            },
            fuel: {
                beta: 0,
                betaRatio : 0,
                savr: 1,
                source: 0,
                sink: 0,
                rxi: 0,
            }
        },
        secondary: {...primary}
    },
    moisture: {
        canopy: {
            foliar: 1,
        },
        dead: {
            tl1: 1,
            tl10: 1,
            tl100, 1,
        },
        live: {
            herb: 1,
            stem: 1,
        },
    },
}