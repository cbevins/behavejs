/**
 * WfmsConfig creates all the *Config.js instances used by WFMS
 * and store them in both a Map() and a hierarchical object.
 */
import {Dag} from '../index.js'
import {Paths as P} from './Paths.js'

import {CanopyHeightConfig} from './CanopyHeightConfig.js'
import {DeadFuelMoistureConfig} from './DeadFuelMoistureConfig.js'
import {FireEffectiveWindLimitConfig} from './FireEffectiveWindLimitConfig.js'
import {FireEllipseLinkConfig} from './FireEllipseLinkConfig.js'
import {FireEllipseVectorConfig} from './FireEllipseVectorConfig.js'
import {LiveFuelCuringConfig} from './LiveFuelCuringConfig.js'
import {LiveFuelMoistureConfig} from './LiveFuelMoistureConfig.js'
import {MidflameWindSpeedConfig} from './MidflameWindSpeedConfig.js'
import {SlopeDirectionConfig} from './SlopeDirectionConfig.js'
import {SlopeSteepnessConfig} from './SlopeSteepnessConfig.js'
import {SurfaceFireWtgConfig} from './SurfaceFireWtgConfig.js'
import {SurfacePrimaryFuelConfig, SurfaceSecondaryFuelConfig} from './SurfaceFuelConfig.js'
import {SurfacePrimaryStandardConfig, SurfaceSecondaryStandardConfig} from './SurfaceStandardConfig.js'
import {WindDirectionConfig} from './WindDirectionConfig.js'
import {WindSpeedConfig} from './WindSpeedConfig.js'
import {WindSpeedReductionConfig} from './WindSpeedReductionConfig.js'

export class WfmsConfig {
    constructor() {
        this.configMap = new Map()
        this.configObj = {
            canopy: {
                height: this._set(new CanopyHeightConfig()),
            },
            ellipse: {
                link: this._set(new FireEllipseLinkConfig()),
                vector: this._set(new FireEllipseVectorConfig()),
            },
            moisture: {
                dead: this._set(new DeadFuelMoistureConfig()),
                live: this._set(new LiveFuelMoistureConfig()),
            },
            slope: {
                direction: this._set(new SlopeDirectionConfig()),
                steepness: this._set(new SlopeSteepnessConfig()),
            },
            surface: {
                curing: this._set(new LiveFuelCuringConfig()),
                midflame: this._set(new MidflameWindSpeedConfig()),
                primary: {
                    fuel: this._set(new SurfacePrimaryFuelConfig()),
                    standard: this._set(new SurfacePrimaryStandardConfig()),
                },
                secondary: {
                    fuel: this._set(new SurfaceSecondaryFuelConfig()),
                    standard: this._set(new SurfaceSecondaryStandardConfig()),
                },
                weighting: this._set(new SurfaceFireWtgConfig()),
                windLimit: this._set(new FireEffectiveWindLimitConfig()),
                wsrf: this._set(new WindSpeedReductionConfig()),
            },
            wind: {
                direction: this._set(new WindDirectionConfig()),
                speed: this._set(new WindSpeedConfig()),
            }
        }
    }
    _set(cfg) {
        this.configMap.set(cfg.key, cfg)
        return cfg
    }
}