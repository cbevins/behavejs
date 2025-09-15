export const BehaveMap = new Map([
["canopy/coverage", {key: "canopy/coverage", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.input, args: []},
    ]}],
["canopy/crown/base height", {key: "canopy/crown/base height", value: 0, units: "tree length dimensions", opt: 3, options: [
    {cfg: "ratio-height", updater: Function.baseFromRatioHeight, args: []},
    {cfg: "ratio-base", updater: Function.input, args: []},
    {cfg: undefined, updater: Function.baseFromRatioLength, args: []},
    {cfg: "height-length", updater: Function.baseFromHeightLength, args: []},
    {cfg: "height-base", updater: Function.input, args: []},
    {cfg: "length-base", updater: Function.input, args: []},
    ]}],
["canopy/crown/length", {key: "canopy/crown/length", value: 0, units: "tree length dimensions", opt: 3, options: [
    {cfg: "ratio-height", updater: Function.lengthFromRatioHeight, args: []},
    {cfg: "ratio-base", updater: Function.lengthFromRatioBase, args: []},
    {cfg: undefined, updater: Function.input, args: []},
    {cfg: "height-length", updater: Function.input, args: []},
    {cfg: "height-base", updater: Function.lengthFromHeightBase, args: []},
    {cfg: "length-base", updater: Function.input, args: []},
    ]}],
["canopy/crown/ratio", {key: "canopy/crown/ratio", value: 0, units: "fraction units", opt: 3, options: [
    {cfg: "ratio-height", updater: Function.input, args: []},
    {cfg: "ratio-base", updater: Function.input, args: []},
    {cfg: undefined, updater: Function.input, args: []},
    {cfg: "height-length", updater: Function.ratioFromHeightLength, args: []},
    {cfg: "height-base", updater: Function.ratioFromHeightBase, args: []},
    {cfg: "length-base", updater: Function.ratioFromLengthBase, args: []},
    ]}],
["canopy/crown/total height", {key: "canopy/crown/total height", value: 0, units: "tree length dimensions", opt: 3, options: [
    {cfg: "ratio-height", updater: Function.input, args: []},
    {cfg: "ratio-base", updater: Function.heightFromRatioBase, args: []},
    {cfg: undefined, updater: Function.heightFromRatioLength, args: []},
    {cfg: "height-length", updater: Function.input, args: []},
    {cfg: "height-base", updater: Function.input, args: []},
    {cfg: "length-base", updater: Function.heightFromLengthBase, args: []},
    ]}],
["canopy/fire/heat of combustion", {key: "canopy/fire/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "*", updater: Function.input, args: []},
    ]}],
["canopy/fire/heat per unit area", {key: "canopy/fire/heat per unit area", value: 0, units: "fire heat per unit area units", opt: 0, options: [
    {cfg: "*", updater: Function.canopyHeatPerUnitArea, args: []},
    ]}],
["canopy/fuel/bulk density", {key: "canopy/fuel/bulk density", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.input, args: []},
    ]}],
["canopy/fuel/ovendry load", {key: "canopy/fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.canopyFuelLoad, args: []},
    ]}],
["canopy/fuel/volumetric fill ratio", {key: "canopy/fuel/volumetric fill ratio", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.crownFill, args: []},
    ]}],
["canopy/shelters fuel from wind", {key: "canopy/shelters fuel from wind", value: 0, units: "yes or no", opt: 0, options: [
    {cfg: "*", updater: Function.sheltersFuelFromWind, args: []},
    ]}],
["canopy/wind/speed/reduction/factor", {key: "canopy/wind/speed/reduction/factor", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.canopyWindSpeedAdjustmentFactor, args: []},
    ]}],
["constants/fuel/life/dead category", {key: "constants/fuel/life/dead category", value: "dead", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["constants/fuel/life/live category", {key: "constants/fuel/life/live category", value: "live", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["constants/fuel/type/unused", {key: "constants/fuel/type/unused", value: "unused", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["constants/one", {key: "constants/one", value: 1, units: "", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["constants/zero", {key: "constants/zero", value: 0, units: "", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/bed/bulk density", {key: "primary/surface/bed/bulk density", value: 0, units: "fuel bulk density", opt: 0, options: [
    {cfg: "*", updater: Function.bulkDensity, args: []},
    ]}],
["primary/surface/bed/dead/1/cylindrical diameter", {key: "primary/surface/bed/dead/1/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/dead/1/cylindrical length", {key: "primary/surface/bed/dead/1/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/dead/1/effective fuel/ovendry load", {key: "primary/surface/bed/dead/1/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/dead/1/effective fuel/water load", {key: "primary/surface/bed/dead/1/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/dead/1/effective heating number", {key: "primary/surface/bed/dead/1/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/dead/1/fiber density", {key: "primary/surface/bed/dead/1/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/fuel type", {key: "primary/surface/bed/dead/1/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/heat of combustion", {key: "primary/surface/bed/dead/1/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/heat of pre-ignition", {key: "primary/surface/bed/dead/1/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/dead/1/life category", {key: "primary/surface/bed/dead/1/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/moisture content", {key: "primary/surface/bed/dead/1/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/net ovendry load", {key: "primary/surface/bed/dead/1/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/dead/1/ovendry fuel load", {key: "primary/surface/bed/dead/1/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/silica-free mineral content", {key: "primary/surface/bed/dead/1/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/size class weighting factor", {key: "primary/surface/bed/dead/1/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/1/size class", {key: "primary/surface/bed/dead/1/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/dead/1/surface area weighting factor", {key: "primary/surface/bed/dead/1/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/1/surface area", {key: "primary/surface/bed/dead/1/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/dead/1/surface area-to-volume ratio", {key: "primary/surface/bed/dead/1/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/total mineral content", {key: "primary/surface/bed/dead/1/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/1/volume", {key: "primary/surface/bed/dead/1/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/dead/2/cylindrical diameter", {key: "primary/surface/bed/dead/2/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/dead/2/cylindrical length", {key: "primary/surface/bed/dead/2/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/dead/2/effective fuel/ovendry load", {key: "primary/surface/bed/dead/2/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/dead/2/effective fuel/water load", {key: "primary/surface/bed/dead/2/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/dead/2/effective heating number", {key: "primary/surface/bed/dead/2/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/dead/2/fiber density", {key: "primary/surface/bed/dead/2/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/fuel type", {key: "primary/surface/bed/dead/2/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/heat of combustion", {key: "primary/surface/bed/dead/2/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/heat of pre-ignition", {key: "primary/surface/bed/dead/2/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/dead/2/life category", {key: "primary/surface/bed/dead/2/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/moisture content", {key: "primary/surface/bed/dead/2/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/net ovendry load", {key: "primary/surface/bed/dead/2/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/dead/2/ovendry fuel load", {key: "primary/surface/bed/dead/2/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/silica-free mineral content", {key: "primary/surface/bed/dead/2/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/size class weighting factor", {key: "primary/surface/bed/dead/2/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/2/size class", {key: "primary/surface/bed/dead/2/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/dead/2/surface area weighting factor", {key: "primary/surface/bed/dead/2/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/2/surface area", {key: "primary/surface/bed/dead/2/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/dead/2/surface area-to-volume ratio", {key: "primary/surface/bed/dead/2/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/total mineral content", {key: "primary/surface/bed/dead/2/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/2/volume", {key: "primary/surface/bed/dead/2/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/dead/3/cylindrical diameter", {key: "primary/surface/bed/dead/3/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/dead/3/cylindrical length", {key: "primary/surface/bed/dead/3/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/dead/3/effective fuel/ovendry load", {key: "primary/surface/bed/dead/3/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/dead/3/effective fuel/water load", {key: "primary/surface/bed/dead/3/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/dead/3/effective heating number", {key: "primary/surface/bed/dead/3/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/dead/3/fiber density", {key: "primary/surface/bed/dead/3/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/fuel type", {key: "primary/surface/bed/dead/3/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/heat of combustion", {key: "primary/surface/bed/dead/3/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/heat of pre-ignition", {key: "primary/surface/bed/dead/3/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/dead/3/life category", {key: "primary/surface/bed/dead/3/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/moisture content", {key: "primary/surface/bed/dead/3/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/net ovendry load", {key: "primary/surface/bed/dead/3/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/dead/3/ovendry fuel load", {key: "primary/surface/bed/dead/3/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/silica-free mineral content", {key: "primary/surface/bed/dead/3/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/size class weighting factor", {key: "primary/surface/bed/dead/3/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/3/size class", {key: "primary/surface/bed/dead/3/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/dead/3/surface area weighting factor", {key: "primary/surface/bed/dead/3/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/3/surface area", {key: "primary/surface/bed/dead/3/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/dead/3/surface area-to-volume ratio", {key: "primary/surface/bed/dead/3/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/total mineral content", {key: "primary/surface/bed/dead/3/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/3/volume", {key: "primary/surface/bed/dead/3/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/dead/4/cylindrical diameter", {key: "primary/surface/bed/dead/4/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/dead/4/cylindrical length", {key: "primary/surface/bed/dead/4/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/dead/4/effective fuel/ovendry load", {key: "primary/surface/bed/dead/4/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/dead/4/effective fuel/water load", {key: "primary/surface/bed/dead/4/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/dead/4/effective heating number", {key: "primary/surface/bed/dead/4/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/dead/4/fiber density", {key: "primary/surface/bed/dead/4/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/fuel type", {key: "primary/surface/bed/dead/4/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/heat of combustion", {key: "primary/surface/bed/dead/4/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/heat of pre-ignition", {key: "primary/surface/bed/dead/4/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/dead/4/life category", {key: "primary/surface/bed/dead/4/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/moisture content", {key: "primary/surface/bed/dead/4/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/net ovendry load", {key: "primary/surface/bed/dead/4/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/dead/4/ovendry fuel load", {key: "primary/surface/bed/dead/4/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/silica-free mineral content", {key: "primary/surface/bed/dead/4/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/size class weighting factor", {key: "primary/surface/bed/dead/4/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/4/size class", {key: "primary/surface/bed/dead/4/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/dead/4/surface area weighting factor", {key: "primary/surface/bed/dead/4/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/4/surface area", {key: "primary/surface/bed/dead/4/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/dead/4/surface area-to-volume ratio", {key: "primary/surface/bed/dead/4/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/total mineral content", {key: "primary/surface/bed/dead/4/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/4/volume", {key: "primary/surface/bed/dead/4/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/dead/5/cylindrical diameter", {key: "primary/surface/bed/dead/5/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/dead/5/cylindrical length", {key: "primary/surface/bed/dead/5/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/dead/5/effective fuel/ovendry load", {key: "primary/surface/bed/dead/5/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/dead/5/effective fuel/water load", {key: "primary/surface/bed/dead/5/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/dead/5/effective heating number", {key: "primary/surface/bed/dead/5/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/dead/5/fiber density", {key: "primary/surface/bed/dead/5/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/fuel type", {key: "primary/surface/bed/dead/5/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/heat of combustion", {key: "primary/surface/bed/dead/5/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/heat of pre-ignition", {key: "primary/surface/bed/dead/5/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/dead/5/life category", {key: "primary/surface/bed/dead/5/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/moisture content", {key: "primary/surface/bed/dead/5/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/net ovendry load", {key: "primary/surface/bed/dead/5/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/dead/5/ovendry fuel load", {key: "primary/surface/bed/dead/5/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/silica-free mineral content", {key: "primary/surface/bed/dead/5/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/size class weighting factor", {key: "primary/surface/bed/dead/5/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/5/size class", {key: "primary/surface/bed/dead/5/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/dead/5/surface area weighting factor", {key: "primary/surface/bed/dead/5/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/dead/5/surface area", {key: "primary/surface/bed/dead/5/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/dead/5/surface area-to-volume ratio", {key: "primary/surface/bed/dead/5/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/total mineral content", {key: "primary/surface/bed/dead/5/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/5/volume", {key: "primary/surface/bed/dead/5/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/dead/dry reaction intensity", {key: "primary/surface/bed/dead/dry reaction intensity", value: 0, units: "fire reaction intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.dryFuelReactionIntensity, args: []},
    ]}],
["primary/surface/bed/dead/effective fuel/moisture content", {key: "primary/surface/bed/dead/effective fuel/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.divide, args: []},
    ]}],
["primary/surface/bed/dead/effective fuel/ovendry load", {key: "primary/surface/bed/dead/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/dead/effective fuel/water load", {key: "primary/surface/bed/dead/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/dead/extinction moisture content", {key: "primary/surface/bed/dead/extinction moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/dead/heat of combustion", {key: "primary/surface/bed/dead/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/dead/heat of pre-ignition", {key: "primary/surface/bed/dead/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/dead/mineral damping coefficient", {key: "primary/surface/bed/dead/mineral damping coefficient", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.mineralDamping, args: []},
    ]}],
["primary/surface/bed/dead/moisture content", {key: "primary/surface/bed/dead/moisture content", value: 1, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/dead/moisture damping coefficient", {key: "primary/surface/bed/dead/moisture damping coefficient", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.moistureDamping, args: []},
    ]}],
["primary/surface/bed/dead/net ovendry load", {key: "primary/surface/bed/dead/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/dead/ovendry fuel load", {key: "primary/surface/bed/dead/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/dead/reaction intensity", {key: "primary/surface/bed/dead/reaction intensity", value: 0, units: "fire reaction intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.multiply, args: []},
    ]}],
["primary/surface/bed/dead/silica-free mineral content", {key: "primary/surface/bed/dead/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/dead/size class weighting array", {key: "primary/surface/bed/dead/size class weighting array", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactorArray, args: []},
    ]}],
["primary/surface/bed/dead/surface area weighting factor", {key: "primary/surface/bed/dead/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.divide, args: []},
    ]}],
["primary/surface/bed/dead/surface area", {key: "primary/surface/bed/dead/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/dead/surface area-to-volume ratio", {key: "primary/surface/bed/dead/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/dead/volume", {key: "primary/surface/bed/dead/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/depth", {key: "primary/surface/bed/depth", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/heat of pre-ignition", {key: "primary/surface/bed/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.weightedHeatOfPreIgnition, args: []},
    ]}],
["primary/surface/bed/heat sink", {key: "primary/surface/bed/heat sink", value: 0, units: "fuel heat sink", opt: 0, options: [
    {cfg: "*", updater: Function.heatSink, args: []},
    ]}],
["primary/surface/bed/heat source", {key: "primary/surface/bed/heat source", value: 0, units: "fire reaction intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.heatSource, args: []},
    ]}],
["primary/surface/bed/live/1/cylindrical diameter", {key: "primary/surface/bed/live/1/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/live/1/cylindrical length", {key: "primary/surface/bed/live/1/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/live/1/effective fuel/ovendry load", {key: "primary/surface/bed/live/1/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/live/1/effective fuel/water load", {key: "primary/surface/bed/live/1/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/live/1/effective heating number", {key: "primary/surface/bed/live/1/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/live/1/fiber density", {key: "primary/surface/bed/live/1/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/fuel type", {key: "primary/surface/bed/live/1/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/heat of combustion", {key: "primary/surface/bed/live/1/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/heat of pre-ignition", {key: "primary/surface/bed/live/1/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/live/1/life category", {key: "primary/surface/bed/live/1/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/moisture content", {key: "primary/surface/bed/live/1/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/net ovendry load", {key: "primary/surface/bed/live/1/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/live/1/ovendry fuel load", {key: "primary/surface/bed/live/1/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/silica-free mineral content", {key: "primary/surface/bed/live/1/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/size class weighting factor", {key: "primary/surface/bed/live/1/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/1/size class", {key: "primary/surface/bed/live/1/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/live/1/surface area weighting factor", {key: "primary/surface/bed/live/1/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/1/surface area", {key: "primary/surface/bed/live/1/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/live/1/surface area-to-volume ratio", {key: "primary/surface/bed/live/1/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/total mineral content", {key: "primary/surface/bed/live/1/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/1/volume", {key: "primary/surface/bed/live/1/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/live/2/cylindrical diameter", {key: "primary/surface/bed/live/2/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/live/2/cylindrical length", {key: "primary/surface/bed/live/2/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/live/2/effective fuel/ovendry load", {key: "primary/surface/bed/live/2/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/live/2/effective fuel/water load", {key: "primary/surface/bed/live/2/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/live/2/effective heating number", {key: "primary/surface/bed/live/2/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/live/2/fiber density", {key: "primary/surface/bed/live/2/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/fuel type", {key: "primary/surface/bed/live/2/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/heat of combustion", {key: "primary/surface/bed/live/2/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/heat of pre-ignition", {key: "primary/surface/bed/live/2/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/live/2/life category", {key: "primary/surface/bed/live/2/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/moisture content", {key: "primary/surface/bed/live/2/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/net ovendry load", {key: "primary/surface/bed/live/2/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/live/2/ovendry fuel load", {key: "primary/surface/bed/live/2/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/silica-free mineral content", {key: "primary/surface/bed/live/2/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/size class weighting factor", {key: "primary/surface/bed/live/2/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/2/size class", {key: "primary/surface/bed/live/2/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/live/2/surface area weighting factor", {key: "primary/surface/bed/live/2/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/2/surface area", {key: "primary/surface/bed/live/2/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/live/2/surface area-to-volume ratio", {key: "primary/surface/bed/live/2/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/total mineral content", {key: "primary/surface/bed/live/2/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/2/volume", {key: "primary/surface/bed/live/2/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/live/3/cylindrical diameter", {key: "primary/surface/bed/live/3/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/live/3/cylindrical length", {key: "primary/surface/bed/live/3/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/live/3/effective fuel/ovendry load", {key: "primary/surface/bed/live/3/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/live/3/effective fuel/water load", {key: "primary/surface/bed/live/3/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/live/3/effective heating number", {key: "primary/surface/bed/live/3/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/live/3/fiber density", {key: "primary/surface/bed/live/3/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/fuel type", {key: "primary/surface/bed/live/3/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/heat of combustion", {key: "primary/surface/bed/live/3/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/heat of pre-ignition", {key: "primary/surface/bed/live/3/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/live/3/life category", {key: "primary/surface/bed/live/3/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/moisture content", {key: "primary/surface/bed/live/3/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/net ovendry load", {key: "primary/surface/bed/live/3/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/live/3/ovendry fuel load", {key: "primary/surface/bed/live/3/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/silica-free mineral content", {key: "primary/surface/bed/live/3/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/size class weighting factor", {key: "primary/surface/bed/live/3/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/3/size class", {key: "primary/surface/bed/live/3/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/live/3/surface area weighting factor", {key: "primary/surface/bed/live/3/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/3/surface area", {key: "primary/surface/bed/live/3/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/live/3/surface area-to-volume ratio", {key: "primary/surface/bed/live/3/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/total mineral content", {key: "primary/surface/bed/live/3/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/3/volume", {key: "primary/surface/bed/live/3/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/live/4/cylindrical diameter", {key: "primary/surface/bed/live/4/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/live/4/cylindrical length", {key: "primary/surface/bed/live/4/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/live/4/effective fuel/ovendry load", {key: "primary/surface/bed/live/4/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/live/4/effective fuel/water load", {key: "primary/surface/bed/live/4/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/live/4/effective heating number", {key: "primary/surface/bed/live/4/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/live/4/fiber density", {key: "primary/surface/bed/live/4/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/fuel type", {key: "primary/surface/bed/live/4/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/heat of combustion", {key: "primary/surface/bed/live/4/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/heat of pre-ignition", {key: "primary/surface/bed/live/4/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/live/4/life category", {key: "primary/surface/bed/live/4/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/moisture content", {key: "primary/surface/bed/live/4/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/net ovendry load", {key: "primary/surface/bed/live/4/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/live/4/ovendry fuel load", {key: "primary/surface/bed/live/4/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/silica-free mineral content", {key: "primary/surface/bed/live/4/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/size class weighting factor", {key: "primary/surface/bed/live/4/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/4/size class", {key: "primary/surface/bed/live/4/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/live/4/surface area weighting factor", {key: "primary/surface/bed/live/4/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/4/surface area", {key: "primary/surface/bed/live/4/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/live/4/surface area-to-volume ratio", {key: "primary/surface/bed/live/4/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/total mineral content", {key: "primary/surface/bed/live/4/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/4/volume", {key: "primary/surface/bed/live/4/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/live/5/cylindrical diameter", {key: "primary/surface/bed/live/5/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalDiameter, args: []},
    ]}],
["primary/surface/bed/live/5/cylindrical length", {key: "primary/surface/bed/live/5/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", opt: 0, options: [
    {cfg: "*", updater: Function.cylindricalLength, args: []},
    ]}],
["primary/surface/bed/live/5/effective fuel/ovendry load", {key: "primary/surface/bed/live/5/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelLoad, args: []},
    ]}],
["primary/surface/bed/live/5/effective fuel/water load", {key: "primary/surface/bed/live/5/effective fuel/water load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveFuelWaterLoad, args: []},
    ]}],
["primary/surface/bed/live/5/effective heating number", {key: "primary/surface/bed/live/5/effective heating number", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveHeatingNumber, args: []},
    ]}],
["primary/surface/bed/live/5/fiber density", {key: "primary/surface/bed/live/5/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/fuel type", {key: "primary/surface/bed/live/5/fuel type", value: "", units: "fuel type", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/heat of combustion", {key: "primary/surface/bed/live/5/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/heat of pre-ignition", {key: "primary/surface/bed/live/5/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.heatOfPreignition, args: []},
    ]}],
["primary/surface/bed/live/5/life category", {key: "primary/surface/bed/live/5/life category", value: "", units: "fuel life categories", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/moisture content", {key: "primary/surface/bed/live/5/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/net ovendry load", {key: "primary/surface/bed/live/5/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.netOvendryLoad, args: []},
    ]}],
["primary/surface/bed/live/5/ovendry fuel load", {key: "primary/surface/bed/live/5/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/silica-free mineral content", {key: "primary/surface/bed/live/5/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/size class weighting factor", {key: "primary/surface/bed/live/5/size class weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/5/size class", {key: "primary/surface/bed/live/5/size class", value: 0, units: "fuel size class", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClass, args: []},
    ]}],
["primary/surface/bed/live/5/surface area weighting factor", {key: "primary/surface/bed/live/5/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceAreaWeightingFactor, args: []},
    ]}],
["primary/surface/bed/live/5/surface area", {key: "primary/surface/bed/live/5/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.surfaceArea, args: []},
    ]}],
["primary/surface/bed/live/5/surface area-to-volume ratio", {key: "primary/surface/bed/live/5/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/total mineral content", {key: "primary/surface/bed/live/5/total mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "standard", updater: Function.assign, args: []},
    ]}],
["primary/surface/bed/live/5/volume", {key: "primary/surface/bed/live/5/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.volume, args: []},
    ]}],
["primary/surface/bed/live/dry reaction intensity", {key: "primary/surface/bed/live/dry reaction intensity", value: 0, units: "fire reaction intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.dryFuelReactionIntensity, args: []},
    ]}],
["primary/surface/bed/live/effective fuel/ovendry load", {key: "primary/surface/bed/live/effective fuel/ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/live/extinction moisture content", {key: "primary/surface/bed/live/extinction moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.liveFuelExtinctionMoistureContent, args: []},
    ]}],
["primary/surface/bed/live/extinction moisture content/factor", {key: "primary/surface/bed/live/extinction moisture content/factor", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.liveFuelExtinctionMoistureContentFactor, args: []},
    ]}],
["primary/surface/bed/live/heat of combustion", {key: "primary/surface/bed/live/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/live/heat of pre-ignition", {key: "primary/surface/bed/live/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/live/mineral damping coefficient", {key: "primary/surface/bed/live/mineral damping coefficient", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.mineralDamping, args: []},
    ]}],
["primary/surface/bed/live/moisture content", {key: "primary/surface/bed/live/moisture content", value: 1, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/live/moisture damping coefficient", {key: "primary/surface/bed/live/moisture damping coefficient", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.moistureDamping, args: []},
    ]}],
["primary/surface/bed/live/net ovendry load", {key: "primary/surface/bed/live/net ovendry load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/live/ovendry fuel load", {key: "primary/surface/bed/live/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/live/reaction intensity", {key: "primary/surface/bed/live/reaction intensity", value: 0, units: "fire reaction intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.multiply, args: []},
    ]}],
["primary/surface/bed/live/silica-free mineral content", {key: "primary/surface/bed/live/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/live/size class weighting array", {key: "primary/surface/bed/live/size class weighting array", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.sizeClassWeightingFactorArray, args: []},
    ]}],
["primary/surface/bed/live/surface area weighting factor", {key: "primary/surface/bed/live/surface area weighting factor", value: 0, units: "fuel weighting factor units", opt: 0, options: [
    {cfg: "*", updater: Function.divide, args: []},
    ]}],
["primary/surface/bed/live/surface area", {key: "primary/surface/bed/live/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/live/surface area-to-volume ratio", {key: "primary/surface/bed/live/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.sumOfProducts, args: []},
    ]}],
["primary/surface/bed/live/volume", {key: "primary/surface/bed/live/volume", value: 0, units: "fuel volume units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/ovendry fuel load", {key: "primary/surface/bed/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/packing ratio", {key: "primary/surface/bed/packing ratio", value: 0, units: "ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.packingRatio, args: []},
    ]}],
["primary/surface/bed/packing ratio/optimum", {key: "primary/surface/bed/packing ratio/optimum", value: 0, units: "ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.optimumPackingRatio, args: []},
    ]}],
["primary/surface/bed/packing ratio/ratio", {key: "primary/surface/bed/packing ratio/ratio", value: 0, units: "ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.packingRatioRatio, args: []},
    ]}],
["primary/surface/bed/propagating flux ratio", {key: "primary/surface/bed/propagating flux ratio", value: 0, units: "ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.propagatingFluxRatio, args: []},
    ]}],
["primary/surface/bed/reaction intensity", {key: "primary/surface/bed/reaction intensity", value: 0, units: "fire reaction intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.reactionIntensity, args: []},
    ]}],
["primary/surface/bed/reaction velocity/exponent", {key: "primary/surface/bed/reaction velocity/exponent", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.reactionVelocityExponent, args: []},
    ]}],
["primary/surface/bed/reaction velocity/maximum", {key: "primary/surface/bed/reaction velocity/maximum", value: 0, units: "reaction velocity units", opt: 0, options: [
    {cfg: "*", updater: Function.reactionVelocityMaximum, args: []},
    ]}],
["primary/surface/bed/reaction velocity/optimum", {key: "primary/surface/bed/reaction velocity/optimum", value: 0, units: "reaction velocity units", opt: 0, options: [
    {cfg: "*", updater: Function.reactionVelocityOptimum, args: []},
    ]}],
["primary/surface/bed/surface area", {key: "primary/surface/bed/surface area", value: 0, units: "fuel surface area units", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/bed/surface area-to-volume ratio", {key: "primary/surface/bed/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.weightedSavr, args: []},
    ]}],
["primary/surface/bed/surface area-to-volume ratio/**1.5", {key: "primary/surface/bed/surface area-to-volume ratio/**1.5", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.savr15, args: []},
    ]}],
["primary/surface/bed/wind speed reduction factor/fuel", {key: "primary/surface/bed/wind speed reduction factor/fuel", value: 1, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.openWindSpeedAdjustmentFactor, args: []},
    ]}],
["primary/surface/fire/1 no-wind no-slope/effective wind/coefficient", {key: "primary/surface/fire/1 no-wind no-slope/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeedCoefficient, args: []},
    ]}],
["primary/surface/fire/1 no-wind no-slope/effective wind/speed", {key: "primary/surface/fire/1 no-wind no-slope/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeed, args: []},
    ]}],
["primary/surface/fire/1 no-wind no-slope/spread rate coefficient/slope", {key: "primary/surface/fire/1 no-wind no-slope/spread rate coefficient/slope", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.phiSlope, args: []},
    ]}],
["primary/surface/fire/1 no-wind no-slope/spread rate coefficient/wind", {key: "primary/surface/fire/1 no-wind no-slope/spread rate coefficient/wind", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.phiWind, args: []},
    ]}],
["primary/surface/fire/1 no-wind no-slope/spread rate", {key: "primary/surface/fire/1 no-wind no-slope/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.noWindNoSlopeSpreadRate, args: []},
    ]}],
["primary/surface/fire/2 wind-slope additional/spread rate", {key: "primary/surface/fire/2 wind-slope additional/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.maximumDirectionSpreadRate, args: []},
    ]}],
["primary/surface/fire/2 wind-slope additional/spread rate/slope only", {key: "primary/surface/fire/2 wind-slope additional/spread rate/slope only", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.maximumDirectionSlopeSpreadRate, args: []},
    ]}],
["primary/surface/fire/2 wind-slope additional/spread rate/wind only", {key: "primary/surface/fire/2 wind-slope additional/spread rate/wind only", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.maximumDirectionWindSpreadRate, args: []},
    ]}],
["primary/surface/fire/2 wind-slope additional/spread rate/x component", {key: "primary/surface/fire/2 wind-slope additional/spread rate/x component", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.maximumDirectionXComponent, args: []},
    ]}],
["primary/surface/fire/2 wind-slope additional/spread rate/y component", {key: "primary/surface/fire/2 wind-slope additional/spread rate/y component", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.maximumDirectionYComponent, args: []},
    ]}],
["primary/surface/fire/3 cross-slope wind/effective wind/coefficient", {key: "primary/surface/fire/3 cross-slope wind/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeedCoefficientInferred, args: []},
    ]}],
["primary/surface/fire/3 cross-slope wind/effective wind/speed", {key: "primary/surface/fire/3 cross-slope wind/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeed, args: []},
    ]}],
["primary/surface/fire/3 cross-slope wind/spread rate", {key: "primary/surface/fire/3 cross-slope wind/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.spreadRateWithCrossSlopeWind, args: []},
    ]}],
["primary/surface/fire/4 effective limit/effective wind/coefficient", {key: "primary/surface/fire/4 effective limit/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.phiEwFromEws, args: []},
    ]}],
["primary/surface/fire/4 effective limit/effective wind/speed", {key: "primary/surface/fire/4 effective limit/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeedLimit, args: []},
    ]}],
["primary/surface/fire/4 effective limit/spread rate", {key: "primary/surface/fire/4 effective limit/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.maximumSpreadRate, args: []},
    ]}],
["primary/surface/fire/5 eff wind limit applied/effective wind/coefficient", {key: "primary/surface/fire/5 eff wind limit applied/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.min, args: []},
    ]}],
["primary/surface/fire/5 eff wind limit applied/effective wind/speed", {key: "primary/surface/fire/5 eff wind limit applied/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "*", updater: Function.min, args: []},
    ]}],
["primary/surface/fire/5 eff wind limit applied/spread rate", {key: "primary/surface/fire/5 eff wind limit applied/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.min, args: []},
    ]}],
["primary/surface/fire/6 ros limit applied/effective wind/coefficient", {key: "primary/surface/fire/6 ros limit applied/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeedCoefficientInferred, args: []},
    ]}],
["primary/surface/fire/6 ros limit applied/effective wind/speed", {key: "primary/surface/fire/6 ros limit applied/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeed, args: []},
    ]}],
["primary/surface/fire/6 ros limit applied/spread rate", {key: "primary/surface/fire/6 ros limit applied/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.spreadRateWithRosLimitApplied, args: []},
    ]}],
["primary/surface/fire/7 both limits applied/effective wind/coefficient", {key: "primary/surface/fire/7 both limits applied/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeedCoefficientInferred, args: []},
    ]}],
["primary/surface/fire/7 both limits applied/effective wind/speed", {key: "primary/surface/fire/7 both limits applied/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "*", updater: Function.effectiveWindSpeed, args: []},
    ]}],
["primary/surface/fire/7 both limits applied/spread rate", {key: "primary/surface/fire/7 both limits applied/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "*", updater: Function.spreadRateWithRosLimitApplied, args: []},
    ]}],
["primary/surface/fire/effective wind/coefficient", {key: "primary/surface/fire/effective wind/coefficient", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "applied", updater: Function.assign, args: []},
    {cfg: "not applied", updater: Function.assign, args: []},
    ]}],
["primary/surface/fire/effective wind/speed", {key: "primary/surface/fire/effective wind/speed", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "applied", updater: Function.assign, args: []},
    {cfg: "not applied", updater: Function.assign, args: []},
    ]}],
["primary/surface/fire/heading/direction/from north", {key: "primary/surface/fire/heading/direction/from north", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "*", updater: Function.sum, args: []},
    ]}],
["primary/surface/fire/heading/direction/from up-slope", {key: "primary/surface/fire/heading/direction/from up-slope", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "*", updater: Function.spreadDirectionFromUpslope, args: []},
    ]}],
["primary/surface/fire/heading/fireline intensity", {key: "primary/surface/fire/heading/fireline intensity", value: 0, units: "fireline intensity units", opt: 0, options: [
    {cfg: "*", updater: Function.firelineIntensity, args: []},
    ]}],
["primary/surface/fire/heading/flame length", {key: "primary/surface/fire/heading/flame length", value: 0, units: "fire flame length units", opt: 0, options: [
    {cfg: "*", updater: Function.flameLength, args: []},
    ]}],
["primary/surface/fire/heading/spread rate", {key: "primary/surface/fire/heading/spread rate", value: 0, units: "fire spread rate units", opt: 0, options: [
    {cfg: "applied", updater: Function.assign, args: []},
    {cfg: "not applied", updater: Function.assign, args: []},
    ]}],
["primary/surface/fire/heat per unit area", {key: "primary/surface/fire/heat per unit area", value: 0, units: "fire heat per unit area units", opt: 0, options: [
    {cfg: "*", updater: Function.heatPerUnitArea, args: []},
    ]}],
["primary/surface/fire/length-to-width ratio", {key: "primary/surface/fire/length-to-width ratio", value: 1, units: "ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.lengthToWidthRatio, args: []},
    ]}],
["primary/surface/fire/residence time", {key: "primary/surface/fire/residence time", value: 0, units: "fire residence time units", opt: 0, options: [
    {cfg: "*", updater: Function.fireResidenceTime, args: []},
    ]}],
["primary/surface/fire/slope/factor K", {key: "primary/surface/fire/slope/factor K", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.slopeK, args: []},
    ]}],
["primary/surface/fire/wind/factor B", {key: "primary/surface/fire/wind/factor B", value: 1, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.windB, args: []},
    ]}],
["primary/surface/fire/wind/factor C", {key: "primary/surface/fire/wind/factor C", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.windC, args: []},
    ]}],
["primary/surface/fire/wind/factor E", {key: "primary/surface/fire/wind/factor E", value: 1, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.windE, args: []},
    ]}],
["primary/surface/fire/wind/factor I", {key: "primary/surface/fire/wind/factor I", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.windI, args: []},
    ]}],
["primary/surface/fire/wind/factor K", {key: "primary/surface/fire/wind/factor K", value: 0, units: "factor units", opt: 0, options: [
    {cfg: "*", updater: Function.windK, args: []},
    ]}],
["primary/surface/model/standard/curing/fraction/applied", {key: "primary/surface/model/standard/curing/fraction/applied", value: 0, units: "fraction units", opt: 1, options: [
    {cfg: "observed", updater: Function.assign, args: []},
    {cfg: "estimated", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/curing/fraction/estimated", {key: "primary/surface/model/standard/curing/fraction/estimated", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.curedHerbFraction, args: []},
    ]}],
["primary/surface/model/standard/curing/fraction/observed", {key: "primary/surface/model/standard/curing/fraction/observed", value: 0, units: "fraction units", opt: 0, options: [
    {cfg: "*", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/dead/1-h/fuel type", {key: "primary/surface/model/standard/dead/1-h/fuel type", value: "dead & down", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/dead/1-h/moisture content", {key: "primary/surface/model/standard/dead/1-h/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/dead/1-h/ovendry fuel load", {key: "primary/surface/model/standard/dead/1-h/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "catalog", updater: Function.load1, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/dead/1-h/surface area-to-volume ratio", {key: "primary/surface/model/standard/dead/1-h/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "catalog", updater: Function.savr1, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/dead/10-h/fuel type", {key: "primary/surface/model/standard/dead/10-h/fuel type", value: "dead & down", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/dead/10-h/moisture content", {key: "primary/surface/model/standard/dead/10-h/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/dead/10-h/ovendry fuel load", {key: "primary/surface/model/standard/dead/10-h/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "catalog", updater: Function.load10, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/dead/10-h/surface area-to-volume ratio", {key: "primary/surface/model/standard/dead/10-h/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.savr10, args: []},
    ]}],
["primary/surface/model/standard/dead/100-h/fuel type", {key: "primary/surface/model/standard/dead/100-h/fuel type", value: "dead & down", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/dead/100-h/moisture content", {key: "primary/surface/model/standard/dead/100-h/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/dead/100-h/ovendry fuel load", {key: "primary/surface/model/standard/dead/100-h/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "catalog", updater: Function.load100, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/dead/100-h/surface area-to-volume ratio", {key: "primary/surface/model/standard/dead/100-h/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.savr100, args: []},
    ]}],
["primary/surface/model/standard/dead/extinction moisture content", {key: "primary/surface/model/standard/dead/extinction moisture content", value: 0.25, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "catalog", updater: Function.mext, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/dead/heat of combustion", {key: "primary/surface/model/standard/dead/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "*", updater: Function.heatDead, args: []},
    ]}],
["primary/surface/model/standard/dead/herb/fuel type", {key: "primary/surface/model/standard/dead/herb/fuel type", value: "cured herb", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/dead/herb/moisture content", {key: "primary/surface/model/standard/dead/herb/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/dead/herb/ovendry fuel load", {key: "primary/surface/model/standard/dead/herb/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.loadCured, args: []},
    ]}],
["primary/surface/model/standard/dead/herb/surface area-to-volume ratio", {key: "primary/surface/model/standard/dead/herb/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/depth", {key: "primary/surface/model/standard/depth", value: 1, units: "fuel depth units", opt: 0, options: [
    {cfg: "catalog", updater: Function.depth, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/fiber density", {key: "primary/surface/model/standard/fiber density", value: 0, units: "fuel bulk and particle density units", opt: 0, options: [
    {cfg: "*", updater: Function.dens, args: []},
    ]}],
["primary/surface/model/standard/info/code", {key: "primary/surface/model/standard/info/code", value: "", units: "standard fuel model code", opt: 0, options: [
    {cfg: "catalog", updater: Function.code, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/info/label", {key: "primary/surface/model/standard/info/label", value: "", units: "standard fuel model label", opt: 0, options: [
    {cfg: "catalog", updater: Function.label, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/info/number", {key: "primary/surface/model/standard/info/number", value: 0, units: "standard fuel model number", opt: 0, options: [
    {cfg: "catalog", updater: Function.number, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/key", {key: "primary/surface/model/standard/key", value: "", units: "fuel key", opt: 0, options: [
    {cfg: "catalog", updater: Function.input, args: []},
    {cfg: "custom", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/live/heat of combustion", {key: "primary/surface/model/standard/live/heat of combustion", value: 0, units: "fuel heat of combustion units", opt: 0, options: [
    {cfg: "*", updater: Function.heatLive, args: []},
    ]}],
["primary/surface/model/standard/live/herb/fuel type", {key: "primary/surface/model/standard/live/herb/fuel type", value: "uncured herb", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/live/herb/moisture content", {key: "primary/surface/model/standard/live/herb/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/live/herb/ovendry fuel load", {key: "primary/surface/model/standard/live/herb/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "*", updater: Function.loadUncured, args: []},
    ]}],
["primary/surface/model/standard/live/herb/surface area-to-volume ratio", {key: "primary/surface/model/standard/live/herb/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/live/stem/fuel type", {key: "primary/surface/model/standard/live/stem/fuel type", value: "stem", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/live/stem/moisture content", {key: "primary/surface/model/standard/live/stem/moisture content", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "*", updater: Function.assign, args: []},
    ]}],
["primary/surface/model/standard/live/stem/ovendry fuel load", {key: "primary/surface/model/standard/live/stem/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "catalog", updater: Function.loadStem, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/live/stem/surface area-to-volume ratio", {key: "primary/surface/model/standard/live/stem/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "catalog", updater: Function.savrStem, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/mineral content/silica-free", {key: "primary/surface/model/standard/mineral content/silica-free", value: 0, units: "mineral content", opt: 0, options: [
    {cfg: "*", updater: Function.seff, args: []},
    ]}],
["primary/surface/model/standard/mineral content/total", {key: "primary/surface/model/standard/mineral content/total", value: 0, units: "mineral content", opt: 0, options: [
    {cfg: "*", updater: Function.stot, args: []},
    ]}],
["primary/surface/model/standard/total/herb/fuel type", {key: "primary/surface/model/standard/total/herb/fuel type", value: "herb", units: "fuel type", opt: 0, options: [
    {cfg: "*", updater: Function.constant, args: []},
    ]}],
["primary/surface/model/standard/total/herb/ovendry fuel load", {key: "primary/surface/model/standard/total/herb/ovendry fuel load", value: 0, units: "fuel load units", opt: 0, options: [
    {cfg: "catalog", updater: Function.loadHerb, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/model/standard/total/herb/surface area-to-volume ratio", {key: "primary/surface/model/standard/total/herb/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", opt: 0, options: [
    {cfg: "catalog", updater: Function.savrHerb, args: []},
    {cfg: "custom", updater: Function.input, args: []},
    ]}],
["primary/surface/wind speed reduction factor/midflame", {key: "primary/surface/wind speed reduction factor/midflame", value: 1, units: "fraction units", opt: 0, options: [
    {cfg: "observed", updater: Function.input, args: []},
    {cfg: "estimated", updater: Function.min, args: []},
    ]}],
["primary/surface/wind/speed/midflame", {key: "primary/surface/wind/speed/midflame", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "observed", updater: Function.input, args: []},
    {cfg: "estimated", updater: Function.multiply, args: []},
    ]}],
["terrain/slope/direction/down-slope", {key: "terrain/slope/direction/down-slope", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "up-slope", updater: Function.opposite, args: []},
    {cfg: "down-slope", updater: Function.input, args: []},
    ]}],
["terrain/slope/direction/up-slope", {key: "terrain/slope/direction/up-slope", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "up-slope", updater: Function.input, args: []},
    {cfg: "down-slope", updater: Function.opposite, args: []},
    ]}],
["terrain/slope/steepness/degrees", {key: "terrain/slope/steepness/degrees", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "observed ratio of rise-to-reach", updater: Function.slopeDegrees, args: []},
    {cfg: "degrees", updater: Function.input, args: []},
    ]}],
["terrain/slope/steepness/ratio", {key: "terrain/slope/steepness/ratio", value: 0, units: "ratio units", opt: 0, options: [
    {cfg: "observed ratio of rise-to-reach", updater: Function.input, args: []},
    {cfg: "degrees", updater: Function.slopeRatio, args: []},
    ]}],
["weather/moisture/dead/1-h", {key: "weather/moisture/dead/1-h", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.input, args: []},
    {cfg: "category", updater: Function.assign, args: []},
    ]}],
["weather/moisture/dead/10-h", {key: "weather/moisture/dead/10-h", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.input, args: []},
    {cfg: "category", updater: Function.assign, args: []},
    ]}],
["weather/moisture/dead/100-h", {key: "weather/moisture/dead/100-h", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.input, args: []},
    {cfg: "category", updater: Function.assign, args: []},
    ]}],
["weather/moisture/dead/category", {key: "weather/moisture/dead/category", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.constant, args: []},
    {cfg: "category", updater: Function.input, args: []},
    ]}],
["weather/moisture/live/category", {key: "weather/moisture/live/category", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.constant, args: []},
    {cfg: "category", updater: Function.input, args: []},
    ]}],
["weather/moisture/live/herb", {key: "weather/moisture/live/herb", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.input, args: []},
    {cfg: "category", updater: Function.assign, args: []},
    ]}],
["weather/moisture/live/stem", {key: "weather/moisture/live/stem", value: 0, units: "fuel moisture content units", opt: 0, options: [
    {cfg: "particle", updater: Function.input, args: []},
    {cfg: "category", updater: Function.assign, args: []},
    ]}],
["weather/wind/direction/heading/from north", {key: "weather/wind/direction/heading/from north", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "heading from up-slope", updater: Function.sum, args: []},
    {cfg: "source from north", updater: Function.opposite, args: []},
    {cfg: undefined, updater: Function.assign, args: []},
    ]}],
["weather/wind/direction/heading/from up-slope", {key: "weather/wind/direction/heading/from up-slope", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "heading from up-slope", updater: Function.input, args: []},
    {cfg: "source from north", updater: Function.diff, args: []},
    {cfg: undefined, updater: Function.constant, args: []},
    ]}],
["weather/wind/direction/source/from north", {key: "weather/wind/direction/source/from north", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "heading from up-slope", updater: Function.opposite, args: []},
    {cfg: "source from north", updater: Function.input, args: []},
    {cfg: undefined, updater: Function.opposite, args: []},
    ]}],
["weather/wind/direction/source/from up-slope", {key: "weather/wind/direction/source/from up-slope", value: 0, units: "degrees", opt: 0, options: [
    {cfg: "*", updater: Function.opposite, args: []},
    ]}],
["weather/wind/speed/at 10-m", {key: "weather/wind/speed/at 10-m", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "at 20-ft", updater: Function.input, args: []},
    {cfg: "at 10-m", updater: Function.at10mFrom20ft, args: []},
    ]}],
["weather/wind/speed/at 20-ft", {key: "weather/wind/speed/at 20-ft", value: 0, units: "wind speed units", opt: 0, options: [
    {cfg: "at 20-ft", updater: Function.input, args: []},
    {cfg: "at 10-m", updater: Function.at20ftFrom10m, args: []},
    ]}],
])
