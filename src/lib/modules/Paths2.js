class Zpaths {
    static paths = {
        crown: {
            canopy: {
                fuel: {load: 0, heat: 8000, hpua: 0},
                moisture: {foliar: 1},
                structure: {base: 0, total: 0, legnth: 0, ratio: 0,
                    cover: 0, fill: 0, volume: 0},
                wind: {shelters: false, wrsf: 1},
            },
            fire: {
                active: {
                    // similar structure to surface/primary and surface/secondary
                    // but fixed to FM10, no slope
                    fm10: {
                        fire: {ros: 0, fli: 0, flame: 0, hpua: 0, heading: 0, lwr: 1},
                        fuel: {
                            bed: {  // for FM 10
                                dead: {},
                                live: {},
                            },
                            model: {
                                standard: {},
                            },
                        },
                        moisture: { // bound to site.moisture
                            dead: {tl1: 1, tl10: 1, tl100: 1},
                            live: {herb: 1, stem: 1},
                        },
                        slope: {
                            direction: {upslope: 0},  // constant
                            steepness: {ratio: 0},    // constant
                        },
                    },
                    ellipse: {
                        size: {length: 0, width: 0, perimeter: 0, area: 0},
                        map: {length: 0, width: 0, perimeter: 0, area: 0},
                    },
                    wind: {speed: {at20ft: 0}}, // bound to site
                },
                final: {
                    ellipse: {
                        size: {length: 0, width: 0, perimeter: 0, area: 0},
                        map: {length: 0, width: 0, perimeter: 0, area: 0},
                    },
                },
            },
        },
        site: {
            moisture: {
                dead: {tl1: 1, tl10: 1, tl100: 1, duff: 1},
                live: {herb: 1, stem: 1},
            },
            slope: {
                direction: {upslope: 0, downslope: 180},
                steepness: {ratio: 0, degrees: 0},
            },
            wind: {
                speed: {at20ft: 0, at10m: 0},
            },
        },
        surface: {
            final: {
                fire: {ros: 0, fli: 0, flame: 0, hpua: 0, heading: 0, lwr: 1},
                ellipse: {
                    size: {length: 0, width: 0, perimeter: 0, area: 0},
                    map: {length: 0, width: 0, perimeter: 0, area: 0},
                    head: {ros: 0, fli: 0, flame: 0, scorch: 0, dist: 0, map: 0, x: 0, y: 0, mort: 0},
                    back: {ros: 0, fli: 0, flame: 0, scorch: 0, dist: 0, map: 0, x: 0, y: 0, mort: 0},
                    flank: {ros: 0, fli: 0, flame: 0, scorch: 0, dist: 0, map: 0, x: 0, y: 0, mort: 0},
                    beta: {ros: 0, fli: 0, flame: 0, scorch: 0, dist: 0, map: 0, x: 0, y: 0, mort: 0},
                    beta5: {ros: 0, fli: 0, flame: 0, scorch: 0, dist: 0, map: 0, x: 0, y: 0, mort: 0},
                    psi: {ros: 0, fli: 0, flame: 0, scorch: 0, dist: 0, map: 0, x: 0, y: 0, mort: 0},
                },
            },
            primary: {
                fuel: {
                    bed: {
                        dead: {},
                        live: {},
                    },
                    model: {
                        standard: {},
                        chaparral: {},
                        palmetto: {},
                        aspen: {},
                    },
                },
                fire: {ros: 0, fli: 0, flame: 0, hpua: 0, heading: 0, lwr: 1},
                moisture: { // bound to site.moisture
                    dead: {tl1: 1, tl10: 1, tl100: 1},
                    live: {herb: 1, stem: 1},
                },
                slope: {    // bound to site slope
                    direction: {upslope: 0},
                    steepness: {ratio: 0},
                },
                wind: {
                    direction: {fromNorth: 0},
                    speed: {wrsf: 1, midflame: 0},
                },
            },
            secondary: {},  // same as primary
        },
    },
}


class XPaths {
    static paths = {
        crown: {
            canopy: {
                height: {},
                fuel: {},
                moisture: {foliar: {}},
                wind: {speed:{reduction:{}}},
            },
            fire: {
                rothermelActive: {
                    fire: {},       // produces headRos, headDir, headFlame, lwr
                    bed: {},
                    ellipse: {},    // uses *crown/fire/rothermelActive* headRos, headDir, headFlame, lwr; also needs elapsedTime
                    time: {ignition: 0, elapsed: 0}
                },
                scottReinhardt: {
                    ellipse: {},    // uses *crown/fire/scottReinhardt* headRos, headDir, headFlame, lwr
                },
            },
        },
        site: {
            fire: {},       // provides input for headRos, headDir, headFlame, and lwr
            ellipse: {},    // uses *site* headRos, headDir, headFlame, lwr
            moisture: {},
            slope: {},
            temperature: {},
            wind: {},
        },
        surface: {
            ellipse: {},    // uses *weighted* headRos, headDir, headFlame, lwr
            primary: {
                bed: {},
                fire: {},
                model: {},
                wind: {},
            },
            secondary: {
                bed: {},
                fire: {firep1: {}, firep2: {}, firep7: {}},
                model: {},
                wind: {},
            },
            weighted: {
                fire: {},
            }
        }
    }
}
class AltPaths {
    static paths = {
        canopy: {
            crown: {},
            fire: {},
            fuel: {},
            wind: {speed:{reduction:{}}},
        },
        constants:{},
        ellipse: {
            axis: {},
            backing: {},
            beta: {},
            beta5: {},
            flanking: {},
            heading: {},
            map: {},
            psi: {},
            size: {},
            temperature: {},
            time: {},
            vector: {},
            wind:{speed:{midflame:{}}},
        },
        crown: {
            bed: {},
            fire: {},

        },
        map: {
            contour: {},
            scale: {},
            slope: {},
        },
        primary: {
            bed: {
                dead: {
                    d1:{}, d2:{}, d3:{}, d4:{}, d5:{},
                },
                live: {
                    l1:{}, l2:{}, l3:{}, l4:{}, l5:{},
                },
                beta: {},
                rxi: {},
                wind: {speed:{reduction:{}}},   // 1
            },
            fire: {
                f1:{}, f2:{}, f3:{}, f4:{}, f5:{}, f6:{}, f7:{},
                effective: {},
                heading: {},
                slope: {},
                wind: {
                    factor: {},
                    speed: {midflame: {}},  // 0  IS THIS USED??
                },
            },
            model: {
                standard: {},
                chaparral: {},
                palmetto: {},
                aspen: {},
            },
            wind: {speed: {
                midflame: {}, // 880
                reduction: {factor: {midflame:{}}}, // 1
            }}
        },
        secondary: {},  // same as 'primary'
        terrain: {
            slope: {
                direction: {},
                steepness: {},
            },
        },
        weather: {
            curing: {fraction: {}},
            moisture: {
                canopy: {},
                dead: {},
                live: {},
            },
            wind: {
                direction: {},
                speed: {},
            },
        },
        weighted: {
            fire: {
                cover: {},
                effectiveWind: {speed:{}},
                heading: {},
                ros: {},
            }
        },
    }
}