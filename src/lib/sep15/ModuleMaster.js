import { BehaveLibrary as Lib } from "../modules/BehaveLibrary.js"
export const ModuleMaster = [
    {key: "canopy/coverage", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]},
    {key: "canopy/fuel/bulk density", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]},
    {key: "canopy/fire/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]},
    {key: "canopy/crown/base height", value: 0, units: "tree length dimensions", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.canopyBaseFromRatioHeight, args: ["canopy/crown/ratio","canopy/crown/total height"]},
        {cfgval: "ratio-base", updater: Lib.input, args: []},
        {cfgval: "ratio-length", updater: Lib.canopyBaseFromRatioLength, args: ["canopy/crown/ratio","canopy/crown/length"]},
        {cfgval: "height-length", updater: Lib.canopyBaseFromHeightLength, args: ["canopy/crown/total height","canopy/crown/length"]},
        {cfgval: "height-base", updater: Lib.input, args: []},
        {cfgval: "length-base", updater: Lib.input, args: []},
    ]},
    {key: "canopy/crown/length", value: 0, units: "tree length dimensions", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.crownLengthFromRatioHeight, args: ["canopy/crown/ratio","canopy/crown/total height"]},
        {cfgval: "ratio-base", updater: Lib.crownLengthFromRatioBase, args: ["canopy/crown/ratio","canopy/crown/base height"]},
        {cfgval: "ratio-length", updater: Lib.input, args: []},
        {cfgval: "height-length", updater: Lib.input, args: []},
        {cfgval: "height-base", updater: Lib.crownLengthFromHeightBase, args: ["canopy/crown/total height","canopy/crown/base height"]},
        {cfgval: "length-base", updater: Lib.input, args: []},
    ]},
    {key: "canopy/crown/total height", value: 0, units: "tree length dimensions", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.input, args: []},
        {cfgval: "ratio-base", updater: Lib.canopyHeightFromRatioBase, args: ["canopy/crown/ratio","canopy/crown/base height"]},
        {cfgval: "ratio-length", updater: Lib.canopyHeightFromRatioLength, args: ["canopy/crown/ratio","canopy/crown/length"]},
        {cfgval: "height-length", updater: Lib.input, args: []},
        {cfgval: "height-base", updater: Lib.input, args: []},
        {cfgval: "length-base", updater: Lib.canopyHeightFromLengthBase, args: ["canopy/crown/length","canopy/crown/base height"]},
    ]},
    {key: "canopy/crown/ratio", value: 0, units: "fraction units", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.input, args: []},
        {cfgval: "ratio-base", updater: Lib.input, args: []},
        {cfgval: "ratio-length", updater: Lib.input, args: []},
        {cfgval: "height-length", updater: Lib.crownRatioFromHeightLength, args: ["canopy/crown/total height","canopy/crown/length"]},
        {cfgval: "height-base", updater: Lib.crownRatioFromHeightBase, args: ["canopy/crown/total height","canopy/crown/base height"]},
        {cfgval: "length-base", updater: Lib.crownRatioFromLengthBase, args: ["canopy/crown/length","canopy/crown/base height"]},
    ]},
    {key: "canopy/fuel/volumetric fill ratio", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.crownFill, args: ["canopy/coverage","canopy/crown/ratio"]},
    ]},
    {key: "canopy/fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopyFuelLoad, args: ["canopy/fuel/bulk density","canopy/crown/length"]},
    ]},
    {key: "canopy/fire/heat per unit area", value: 0, units: "fire heat per unit area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopyHeatPerUnitArea, args: ["canopy/fuel/ovendry load","canopy/fire/heat of combustion"]},
    ]},
    {key: "canopy/shelters fuel from wind", value: 0, units: "boolean", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopySheltersFuelFromWind, args: ["canopy/coverage","canopy/crown/total height","canopy/fuel/volumetric fill ratio"]},
    ]},
    {key: "canopy/wind/speed/reduction/factor", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopyWindSpeedAdjustmentFactor, args: ["canopy/coverage","canopy/crown/total height","canopy/fuel/volumetric fill ratio"]},
    ]},
    {key: "constants/fuel/life/dead category", value: "dead", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]},
    {key: "constants/fuel/life/live category", value: "live", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]},
    {key: "constants/zero", value: 0, units: "", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]},
    {key: "constants/one", value: 1, units: "", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]},
    {key: "constants/fuel/type/unused", value: "unused", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]},
    {key: "weather/moisture/dead/category", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.constant, args: []},
        {cfgval: "category", updater: Lib.input, args: []},
    ]},
    {key: "weather/moisture/dead/1-h", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/dead/category"]},
    ]},
    {key: "weather/moisture/dead/10-h", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/dead/category"]},
    ]},
    {key: "weather/moisture/dead/100-h", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/dead/category"]},
    ]},
    {key: "weather/moisture/livecategory", value: 0, units: "fuel moisture content units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.constant, args: []},
        {cfgval: "category", updater: Lib.input, args: []},
    ]},
    {key: "weather/moisture/liveherb", value: 0, units: "fuel moisture content units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/livecategory"]},
    ]},
    {key: "weather/moisture/livestem", value: 0, units: "fuel moisture content units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/livecategory"]},
    ]},
    {key: "weather/curing/fraction/observed", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]},
    {key: "weather/curing/fraction/estimated", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.curedHerbFraction, args: ["weather/moisture/liveherb"]},
    ]},
    {key: "weather/curing/fraction/applied", value: 0, units: "fraction units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "observed", updater: Lib.assign, args: ["weather/curing/fraction/observed"]},
        {cfgval: "estimated", updater: Lib.assign, args: ["weather/curing/fraction/estimated"]},
    ]},
    {key: "weather/wind/speed/at 20-ft", value: 0, units: "wind speed units", cfgkey: "windSpeedInputs", options: [
        {cfgval: "at 20-ft", updater: Lib.input, args: []},
        {cfgval: "at 10-m", updater: Lib.windSpeedAt20ftFrom10m, args: ["weather/wind/speed/at 10-m"]},
    ]},
    {key: "weather/wind/speed/at 10-m", value: 0, units: "wind speed units", cfgkey: "windSpeedInputs", options: [
        {cfgval: "at 20-ft", updater: Lib.input, args: []},
        {cfgval: "at 10-m", updater: Lib.windSpeedAt10mFrom20ft, args: ["weather/wind/speed/at 20-ft"]},
    ]},
    {key: "weather/wind/speed/at 20-ft", value: 0, units: "wind speed units", cfgkey: "windDiretcionInputs", options: [
        {cfgval: "at 20-ft", updater: Lib.input, args: []},
        {cfgval: "at 10-m", updater: Lib.windSpeedAt20ftFrom10m, args: ["weather/wind/speed/at 10-m"]},
    ]},
    {key: "weather/wind/speed/at 10-m", value: 0, units: "wind speed units", cfgkey: "windDiretcionInputs", options: [
        {cfgval: "at 20-ft", updater: Lib.input, args: []},
        {cfgval: "at 10-m", updater: Lib.windSpeedAt10mFrom20ft, args: ["weather/wind/speed/at 20-ft"]},
    ]},
]
