import { BehaveLibrary as Lib } from "../modules/BehaveLibrary.js"

export const BehaveMaster = new Map([
["constants/fuel/life/dead category",
    {key: "constants/fuel/life/dead category", value: "dead", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["constants/fuel/life/live category",
    {key: "constants/fuel/life/live category", value: "live", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["constants/zero",
    {key: "constants/zero", value: 0, units: "", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["constants/one",
    {key: "constants/one", value: 1, units: "", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["constants/fuel/type/unused",
    {key: "constants/fuel/type/unused", value: "unused", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["canopy/coverage",
    {key: "canopy/coverage", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]}],
["canopy/fuel/bulk density",
    {key: "canopy/fuel/bulk density", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]}],
["canopy/fire/heat of combustion",
    {key: "canopy/fire/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]}],
["canopy/crown/base height",
    {key: "canopy/crown/base height", value: 0, units: "tree length dimensions", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.canopyBaseFromRatioHeight, args: ["canopy/crown/ratio","canopy/crown/total height"]},
        {cfgval: "ratio-base", updater: Lib.input, args: []},
        {cfgval: "ratio-length", updater: Lib.canopyBaseFromRatioLength, args: ["canopy/crown/ratio","canopy/crown/length"]},
        {cfgval: "height-length", updater: Lib.canopyBaseFromHeightLength, args: ["canopy/crown/total height","canopy/crown/length"]},
        {cfgval: "height-base", updater: Lib.input, args: []},
        {cfgval: "length-base", updater: Lib.input, args: []},
    ]}],
["canopy/crown/length",
    {key: "canopy/crown/length", value: 0, units: "tree length dimensions", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.crownLengthFromRatioHeight, args: ["canopy/crown/ratio","canopy/crown/total height"]},
        {cfgval: "ratio-base", updater: Lib.crownLengthFromRatioBase, args: ["canopy/crown/ratio","canopy/crown/base height"]},
        {cfgval: "ratio-length", updater: Lib.input, args: []},
        {cfgval: "height-length", updater: Lib.input, args: []},
        {cfgval: "height-base", updater: Lib.crownLengthFromHeightBase, args: ["canopy/crown/total height","canopy/crown/base height"]},
        {cfgval: "length-base", updater: Lib.input, args: []},
    ]}],
["canopy/crown/total height",
    {key: "canopy/crown/total height", value: 0, units: "tree length dimensions", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.input, args: []},
        {cfgval: "ratio-base", updater: Lib.canopyHeightFromRatioBase, args: ["canopy/crown/ratio","canopy/crown/base height"]},
        {cfgval: "ratio-length", updater: Lib.canopyHeightFromRatioLength, args: ["canopy/crown/ratio","canopy/crown/length"]},
        {cfgval: "height-length", updater: Lib.input, args: []},
        {cfgval: "height-base", updater: Lib.input, args: []},
        {cfgval: "length-base", updater: Lib.canopyHeightFromLengthBase, args: ["canopy/crown/length","canopy/crown/base height"]},
    ]}],
["canopy/crown/ratio",
    {key: "canopy/crown/ratio", value: 0, units: "fraction units", cfgkey: "canopyHeightInputs", options: [
        {cfgval: "ratio-height", updater: Lib.input, args: []},
        {cfgval: "ratio-base", updater: Lib.input, args: []},
        {cfgval: "ratio-length", updater: Lib.input, args: []},
        {cfgval: "height-length", updater: Lib.crownRatioFromHeightLength, args: ["canopy/crown/total height","canopy/crown/length"]},
        {cfgval: "height-base", updater: Lib.crownRatioFromHeightBase, args: ["canopy/crown/total height","canopy/crown/base height"]},
        {cfgval: "length-base", updater: Lib.crownRatioFromLengthBase, args: ["canopy/crown/length","canopy/crown/base height"]},
    ]}],
["canopy/fuel/volumetric fill ratio",
    {key: "canopy/fuel/volumetric fill ratio", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.crownFill, args: ["canopy/coverage","canopy/crown/ratio"]},
    ]}],
["canopy/fuel/ovendry load",
    {key: "canopy/fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopyFuelLoad, args: ["canopy/fuel/bulk density","canopy/crown/length"]},
    ]}],
["canopy/fire/heat per unit area",
    {key: "canopy/fire/heat per unit area", value: 0, units: "fire heat per unit area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopyHeatPerUnitArea, args: ["canopy/fuel/ovendry load","canopy/fire/heat of combustion"]},
    ]}],
["canopy/shelters fuel from wind",
    {key: "canopy/shelters fuel from wind", value: 0, units: "boolean", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopySheltersFuelFromWind, args: ["canopy/coverage","canopy/crown/total height","canopy/fuel/volumetric fill ratio"]},
    ]}],
["canopy/wind/speed/reduction/factor",
    {key: "canopy/wind/speed/reduction/factor", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.canopyWindSpeedAdjustmentFactor, args: ["canopy/coverage","canopy/crown/total height","canopy/fuel/volumetric fill ratio"]},
    ]}],
["weather/moisture/dead/category",
    {key: "weather/moisture/dead/category", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.constant, args: []},
        {cfgval: "category", updater: Lib.input, args: []},
    ]}],
["weather/moisture/dead/1-h",
    {key: "weather/moisture/dead/1-h", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/dead/category"]},
    ]}],
["weather/moisture/dead/10-h",
    {key: "weather/moisture/dead/10-h", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/dead/category"]},
    ]}],
["weather/moisture/dead/100-h",
    {key: "weather/moisture/dead/100-h", value: 0, units: "fuel moisture content units", cfgkey: "deadFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/dead/category"]},
    ]}],
["weather/moisture/live/category",
    {key: "weather/moisture/live/category", value: 0, units: "fuel moisture content units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.constant, args: []},
        {cfgval: "category", updater: Lib.input, args: []},
    ]}],
["weather/moisture/live/herb",
    {key: "weather/moisture/live/herb", value: 0, units: "fuel moisture content units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/live/category"]},
    ]}],
["weather/moisture/live/stem",
    {key: "weather/moisture/live/stem", value: 0, units: "fuel moisture content units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "particle", updater: Lib.input, args: []},
        {cfgval: "category", updater: Lib.assign, args: ["weather/moisture/live/category"]},
    ]}],
["weather/wind/speed/at 20-ft",
    {key: "weather/wind/speed/at 20-ft", value: 0, units: "wind speed units", cfgkey: "windSpeedInputs", options: [
        {cfgval: "at 20-ft", updater: Lib.input, args: []},
        {cfgval: "at 10-m", updater: Lib.windSpeedAt20ftFrom10m, args: ["weather/wind/speed/at 10-m"]},
    ]}],
["weather/wind/speed/at 10-m",
    {key: "weather/wind/speed/at 10-m", value: 0, units: "wind speed units", cfgkey: "windSpeedInputs", options: [
        {cfgval: "at 20-ft", updater: Lib.input, args: []},
        {cfgval: "at 10-m", updater: Lib.windSpeedAt10mFrom20ft, args: ["weather/wind/speed/at 20-ft"]},
    ]}],
["terrain/slope/steepness/ratio",
    {key: "terrain/slope/steepness/ratio", value: 0, units: "ratio units", cfgkey: "slopeSteepnessInputs", options: [
        {cfgval: "observed ratio of rise-to-reach", updater: Lib.input, args: []},
        {cfgval: "degrees", updater: Lib.compassSlopeRatio, args: ["terrain/slope/steepness/degrees"]},
    ]}],
["terrain/slope/steepness/degrees",
    {key: "terrain/slope/steepness/degrees", value: 0, units: "degrees", cfgkey: "slopeSteepnessInputs", options: [
        {cfgval: "observed ratio of rise-to-reach", updater: Lib.compassSlopeDegrees, args: ["terrain/slope/steepness/ratio"]},
        {cfgval: "degrees", updater: Lib.input, args: []},
    ]}],
["terrain/slope/direction/up-slope",
    {key: "terrain/slope/direction/up-slope", value: 0, units: "degrees", cfgkey: "slopeDirectionInputs", options: [
        {cfgval: "up-slope", updater: Lib.input, args: []},
        {cfgval: "down-slope", updater: Lib.compassOpposite, args: ["terrain/slope/direction/down-slope"]},
    ]}],
["terrain/slope/direction/down-slope",
    {key: "terrain/slope/direction/down-slope", value: 0, units: "degrees", cfgkey: "slopeDirectionInputs", options: [
        {cfgval: "up-slope", updater: Lib.compassOpposite, args: ["terrain/slope/direction/up-slope"]},
        {cfgval: "down-slope", updater: Lib.input, args: []},
    ]}],
["weather/wind/direction/heading/from up-slope",
    {key: "weather/wind/direction/heading/from up-slope", value: 0, units: "degrees", cfgkey: "windDirectionInputs", options: [
        {cfgval: "heading from up-slope", updater: Lib.input, args: []},
        {cfgval: "source from north", updater: Lib.compassDiff, args: ["weather/wind/direction/heading/from north","terrain/slope/direction/up-slope"]},
        {cfgval: "upslope", updater: Lib.constant, args: []},
    ]}],
["weather/wind/direction/source/from north",
    {key: "weather/wind/direction/source/from north", value: 0, units: "degrees", cfgkey: "windDirectionInputs", options: [
        {cfgval: "heading from up-slope", updater: Lib.compassOpposite, args: ["weather/wind/direction/heading/from north"]},
        {cfgval: "source from north", updater: Lib.input, args: []},
        {cfgval: "upslope", updater: Lib.compassOpposite, args: ["terrain/slope/direction/up-slope"]},
    ]}],
["weather/wind/direction/source/from up-slope",
    {key: "weather/wind/direction/source/from up-slope", value: 0, units: "degrees", cfgkey: "", options: [
        {cfgval: "", updater: Lib.compassOpposite, args: ["weather/wind/direction/heading/from up-slope"]},
    ]}],
["weather/wind/direction/heading/from north",
    {key: "weather/wind/direction/heading/from north", value: 0, units: "degrees", cfgkey: "windDirectionInputs", options: [
        {cfgval: "heading from up-slope", updater: Lib.compassSum, args: ["weather/wind/direction/heading/from up-slope","terrain/slope/direction/up-slope"]},
        {cfgval: "source from north", updater: Lib.compassOpposite, args: ["weather/wind/direction/source/from north"]},
        {cfgval: "upslope", updater: Lib.assign, args: ["terrain/slope/direction/up-slope"]},
    ]}],
["weather/curing/fraction/observed",
    {key: "weather/curing/fraction/observed", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.input, args: []},
    ]}],
["weather/curing/fraction/estimated",
    {key: "weather/curing/fraction/estimated", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.curedHerbFraction, args: ["weather/moisture/live/herb"]},
    ]}],
["weather/curing/fraction/applied",
    {key: "weather/curing/fraction/applied", value: 0, units: "fraction units", cfgkey: "liveFuelMoistureInputs", options: [
        {cfgval: "observed", updater: Lib.assign, args: ["weather/curing/fraction/observed"]},
        {cfgval: "estimated", updater: Lib.assign, args: ["weather/curing/fraction/estimated"]},
    ]}],
["primary/model/standard/key",
    {key: "primary/model/standard/key", value: "", units: "fuel key", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.input, args: []},
        {cfgval: "custom", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/info/number",
    {key: "primary/model/standard/info/number", value: 0, units: "standard fuel model number", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardNumber, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/info/code",
    {key: "primary/model/standard/info/code", value: "", units: "standard fuel model code", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardCode, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/info/label",
    {key: "primary/model/standard/info/label", value: "", units: "standard fuel model label", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardLabel, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/depth",
    {key: "primary/model/standard/depth", value: 1, units: "fuel depth units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardDepth, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/dead/extinction moisture content",
    {key: "primary/model/standard/dead/extinction moisture content", value: 0.25, units: "fuel moisture content units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardMext, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/dead/heat of combustion",
    {key: "primary/model/standard/dead/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardHeatDead, args: ["primary/model/standard/key"]},
    ]}],
["primary/model/standard/live/heat of combustion",
    {key: "primary/model/standard/live/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardHeatLive, args: ["primary/model/standard/key"]},
    ]}],
["primary/model/standard/fiber density",
    {key: "primary/model/standard/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardDens, args: ["primary/model/standard/key"]},
    ]}],
["primary/model/standard/mineral content/silica-free",
    {key: "primary/model/standard/mineral content/silica-free", value: 0, units: "mineral content", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardSeff, args: ["primary/model/standard/key"]},
    ]}],
["primary/model/standard/mineral content/total",
    {key: "primary/model/standard/mineral content/total", value: 0, units: "mineral content", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardStot, args: ["primary/model/standard/key"]},
    ]}],
["primary/model/standard/dead/1-h/ovendry fuel load",
    {key: "primary/model/standard/dead/1-h/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardLoad1, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/dead/1-h/moisture content",
    {key: "primary/model/standard/dead/1-h/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["weather/moisture/dead/1-h"]},
    ]}],
["primary/model/standard/dead/1-h/surface area-to-volume ratio",
    {key: "primary/model/standard/dead/1-h/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardSavr1, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/dead/1-h/fuel type",
    {key: "primary/model/standard/dead/1-h/fuel type", value: "dead & down", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/dead/10-h/ovendry fuel load",
    {key: "primary/model/standard/dead/10-h/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardLoad10, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/dead/10-h/moisture content",
    {key: "primary/model/standard/dead/10-h/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["weather/moisture/dead/10-h"]},
    ]}],
["primary/model/standard/dead/10-h/surface area-to-volume ratio",
    {key: "primary/model/standard/dead/10-h/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardSavr10, args: []},
    ]}],
["primary/model/standard/dead/10-h/fuel type",
    {key: "primary/model/standard/dead/10-h/fuel type", value: "dead & down", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/dead/100-h/ovendry fuel load",
    {key: "primary/model/standard/dead/100-h/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardLoad100, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/dead/100-h/moisture content",
    {key: "primary/model/standard/dead/100-h/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["weather/moisture/dead/100-h"]},
    ]}],
["primary/model/standard/dead/100-h/surface area-to-volume ratio",
    {key: "primary/model/standard/dead/100-h/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardSavr100, args: []},
    ]}],
["primary/model/standard/dead/100-h/fuel type",
    {key: "primary/model/standard/dead/100-h/fuel type", value: "dead & down", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/dead/herb/ovendry fuel load",
    {key: "primary/model/standard/dead/herb/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardLoadCured, args: ["primary/model/standard/key","weather/curing/fraction/applied"]},
    ]}],
["primary/model/standard/dead/herb/moisture content",
    {key: "primary/model/standard/dead/herb/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["weather/moisture/dead/1-h"]},
    ]}],
["primary/model/standard/dead/herb/surface area-to-volume ratio",
    {key: "primary/model/standard/dead/herb/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["primary/model/standard/total/herb/surface area-to-volume ratio"]},
    ]}],
["primary/model/standard/dead/herb/fuel type",
    {key: "primary/model/standard/dead/herb/fuel type", value: "cured herb", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/live/herb/ovendry fuel load",
    {key: "primary/model/standard/live/herb/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.standardLoadUncured, args: ["primary/model/standard/key","weather/curing/fraction/applied"]},
    ]}],
["primary/model/standard/live/herb/moisture content",
    {key: "primary/model/standard/live/herb/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["weather/moisture/live/herb"]},
    ]}],
["primary/model/standard/live/herb/surface area-to-volume ratio",
    {key: "primary/model/standard/live/herb/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["primary/model/standard/total/herb/surface area-to-volume ratio"]},
    ]}],
["primary/model/standard/live/herb/fuel type",
    {key: "primary/model/standard/live/herb/fuel type", value: "uncured herb", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/total/herb/ovendry fuel load",
    {key: "primary/model/standard/total/herb/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardLoadHerb, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/total/herb/surface area-to-volume ratio",
    {key: "primary/model/standard/total/herb/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardSavrHerb, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/total/herb/fuel type",
    {key: "primary/model/standard/total/herb/fuel type", value: "herb", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/model/standard/live/stem/ovendry fuel load",
    {key: "primary/model/standard/live/stem/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardLoadStem, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/live/stem/moisture content",
    {key: "primary/model/standard/live/stem/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["weather/moisture/live/stem"]},
    ]}],
["primary/model/standard/live/stem/surface area-to-volume ratio",
    {key: "primary/model/standard/live/stem/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primaryStandardModelInputs", options: [
        {cfgval: "catalog", updater: Lib.standardSavrStem, args: ["primary/model/standard/key"]},
        {cfgval: "custom", updater: Lib.input, args: []},
    ]}],
["primary/model/standard/live/stem/fuel type",
    {key: "primary/model/standard/live/stem/fuel type", value: "stem", units: "fuel type", cfgkey: "", options: [
        {cfgval: "", updater: Lib.constant, args: []},
    ]}],
["primary/bed/dead/1/life category",
    {key: "primary/bed/dead/1/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/dead category"]},
    ]}],
["primary/bed/dead/1/fuel type",
    {key: "primary/bed/dead/1/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/1-h/fuel type"]},
    ]}],
["primary/bed/dead/1/moisture content",
    {key: "primary/bed/dead/1/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/1-h/moisture content"]},
    ]}],
["primary/bed/dead/1/ovendry fuel load",
    {key: "primary/bed/dead/1/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/1-h/ovendry fuel load"]},
    ]}],
["primary/bed/dead/1/surface area-to-volume ratio",
    {key: "primary/bed/dead/1/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/1-h/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/1/heat of combustion",
    {key: "primary/bed/dead/1/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/heat of combustion"]},
    ]}],
["primary/bed/dead/1/fiber density",
    {key: "primary/bed/dead/1/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/dead/1/total mineral content",
    {key: "primary/bed/dead/1/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/dead/1/silica-free mineral content",
    {key: "primary/bed/dead/1/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/dead/2/life category",
    {key: "primary/bed/dead/2/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/dead category"]},
    ]}],
["primary/bed/dead/2/fuel type",
    {key: "primary/bed/dead/2/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/10-h/fuel type"]},
    ]}],
["primary/bed/dead/2/moisture content",
    {key: "primary/bed/dead/2/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/10-h/moisture content"]},
    ]}],
["primary/bed/dead/2/ovendry fuel load",
    {key: "primary/bed/dead/2/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/10-h/ovendry fuel load"]},
    ]}],
["primary/bed/dead/2/surface area-to-volume ratio",
    {key: "primary/bed/dead/2/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/10-h/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/2/heat of combustion",
    {key: "primary/bed/dead/2/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/heat of combustion"]},
    ]}],
["primary/bed/dead/2/fiber density",
    {key: "primary/bed/dead/2/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/dead/2/total mineral content",
    {key: "primary/bed/dead/2/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/dead/2/silica-free mineral content",
    {key: "primary/bed/dead/2/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/dead/3/life category",
    {key: "primary/bed/dead/3/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/dead category"]},
    ]}],
["primary/bed/dead/3/fuel type",
    {key: "primary/bed/dead/3/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/100-h/fuel type"]},
    ]}],
["primary/bed/dead/3/moisture content",
    {key: "primary/bed/dead/3/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/100-h/moisture content"]},
    ]}],
["primary/bed/dead/3/ovendry fuel load",
    {key: "primary/bed/dead/3/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/100-h/ovendry fuel load"]},
    ]}],
["primary/bed/dead/3/surface area-to-volume ratio",
    {key: "primary/bed/dead/3/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/100-h/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/3/heat of combustion",
    {key: "primary/bed/dead/3/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/heat of combustion"]},
    ]}],
["primary/bed/dead/3/fiber density",
    {key: "primary/bed/dead/3/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/dead/3/total mineral content",
    {key: "primary/bed/dead/3/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/dead/3/silica-free mineral content",
    {key: "primary/bed/dead/3/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/dead/4/life category",
    {key: "primary/bed/dead/4/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/dead category"]},
    ]}],
["primary/bed/dead/4/fuel type",
    {key: "primary/bed/dead/4/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/herb/fuel type"]},
    ]}],
["primary/bed/dead/4/moisture content",
    {key: "primary/bed/dead/4/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/herb/moisture content"]},
    ]}],
["primary/bed/dead/4/ovendry fuel load",
    {key: "primary/bed/dead/4/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/herb/ovendry fuel load"]},
    ]}],
["primary/bed/dead/4/surface area-to-volume ratio",
    {key: "primary/bed/dead/4/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/herb/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/4/heat of combustion",
    {key: "primary/bed/dead/4/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/heat of combustion"]},
    ]}],
["primary/bed/dead/4/fiber density",
    {key: "primary/bed/dead/4/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/dead/4/total mineral content",
    {key: "primary/bed/dead/4/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/dead/4/silica-free mineral content",
    {key: "primary/bed/dead/4/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/dead/5/life category",
    {key: "primary/bed/dead/5/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/dead category"]},
    ]}],
["primary/bed/dead/5/fuel type",
    {key: "primary/bed/dead/5/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/fuel/type/unused"]},
    ]}],
["primary/bed/dead/5/moisture content",
    {key: "primary/bed/dead/5/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/dead/5/ovendry fuel load",
    {key: "primary/bed/dead/5/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/dead/5/surface area-to-volume ratio",
    {key: "primary/bed/dead/5/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/dead/5/heat of combustion",
    {key: "primary/bed/dead/5/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/dead/5/fiber density",
    {key: "primary/bed/dead/5/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/dead/5/total mineral content",
    {key: "primary/bed/dead/5/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/dead/5/silica-free mineral content",
    {key: "primary/bed/dead/5/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/live/1/life category",
    {key: "primary/bed/live/1/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/live category"]},
    ]}],
["primary/bed/live/1/fuel type",
    {key: "primary/bed/live/1/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/herb/fuel type"]},
    ]}],
["primary/bed/live/1/moisture content",
    {key: "primary/bed/live/1/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/herb/moisture content"]},
    ]}],
["primary/bed/live/1/ovendry fuel load",
    {key: "primary/bed/live/1/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/herb/ovendry fuel load"]},
    ]}],
["primary/bed/live/1/surface area-to-volume ratio",
    {key: "primary/bed/live/1/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/herb/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/1/heat of combustion",
    {key: "primary/bed/live/1/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/heat of combustion"]},
    ]}],
["primary/bed/live/1/fiber density",
    {key: "primary/bed/live/1/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/live/1/total mineral content",
    {key: "primary/bed/live/1/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/live/1/silica-free mineral content",
    {key: "primary/bed/live/1/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/live/2/life category",
    {key: "primary/bed/live/2/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/live category"]},
    ]}],
["primary/bed/live/2/fuel type",
    {key: "primary/bed/live/2/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/stem/fuel type"]},
    ]}],
["primary/bed/live/2/moisture content",
    {key: "primary/bed/live/2/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/stem/moisture content"]},
    ]}],
["primary/bed/live/2/ovendry fuel load",
    {key: "primary/bed/live/2/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/stem/ovendry fuel load"]},
    ]}],
["primary/bed/live/2/surface area-to-volume ratio",
    {key: "primary/bed/live/2/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/stem/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/2/heat of combustion",
    {key: "primary/bed/live/2/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/live/heat of combustion"]},
    ]}],
["primary/bed/live/2/fiber density",
    {key: "primary/bed/live/2/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/live/2/total mineral content",
    {key: "primary/bed/live/2/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/live/2/silica-free mineral content",
    {key: "primary/bed/live/2/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/live/3/life category",
    {key: "primary/bed/live/3/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/live category"]},
    ]}],
["primary/bed/live/3/fuel type",
    {key: "primary/bed/live/3/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/fuel/type/unused"]},
    ]}],
["primary/bed/live/3/moisture content",
    {key: "primary/bed/live/3/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/3/ovendry fuel load",
    {key: "primary/bed/live/3/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/3/surface area-to-volume ratio",
    {key: "primary/bed/live/3/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/3/heat of combustion",
    {key: "primary/bed/live/3/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/3/fiber density",
    {key: "primary/bed/live/3/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/live/3/total mineral content",
    {key: "primary/bed/live/3/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/live/3/silica-free mineral content",
    {key: "primary/bed/live/3/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/live/4/life category",
    {key: "primary/bed/live/4/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/live category"]},
    ]}],
["primary/bed/live/4/fuel type",
    {key: "primary/bed/live/4/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/fuel/type/unused"]},
    ]}],
["primary/bed/live/4/moisture content",
    {key: "primary/bed/live/4/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/4/ovendry fuel load",
    {key: "primary/bed/live/4/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/4/surface area-to-volume ratio",
    {key: "primary/bed/live/4/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/4/heat of combustion",
    {key: "primary/bed/live/4/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/4/fiber density",
    {key: "primary/bed/live/4/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/live/4/total mineral content",
    {key: "primary/bed/live/4/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/live/4/silica-free mineral content",
    {key: "primary/bed/live/4/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/live/5/life category",
    {key: "primary/bed/live/5/life category", value: "", units: "fuel life categories", cfgkey: "", options: [
        {cfgval: "", updater: Lib.assign, args: ["constants/fuel/life/live category"]},
    ]}],
["primary/bed/live/5/fuel type",
    {key: "primary/bed/live/5/fuel type", value: "", units: "fuel type", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/fuel/type/unused"]},
    ]}],
["primary/bed/live/5/moisture content",
    {key: "primary/bed/live/5/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/5/ovendry fuel load",
    {key: "primary/bed/live/5/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/5/surface area-to-volume ratio",
    {key: "primary/bed/live/5/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/5/heat of combustion",
    {key: "primary/bed/live/5/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["constants/zero"]},
    ]}],
["primary/bed/live/5/fiber density",
    {key: "primary/bed/live/5/fiber density", value: 0, units: "fuel bulk and particle density units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/fiber density"]},
    ]}],
["primary/bed/live/5/total mineral content",
    {key: "primary/bed/live/5/total mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/total"]},
    ]}],
["primary/bed/live/5/silica-free mineral content",
    {key: "primary/bed/live/5/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/mineral content/silica-free"]},
    ]}],
["primary/bed/dead/1/effective heating number",
    {key: "primary/bed/dead/1/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/dead/1/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/1/effective fuel/ovendry load",
    {key: "primary/bed/dead/1/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/dead/1/surface area-to-volume ratio","primary/bed/dead/1/ovendry fuel load","primary/bed/dead/1/life category"]},
    ]}],
["primary/bed/dead/1/heat of pre-ignition",
    {key: "primary/bed/dead/1/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/dead/1/moisture content","primary/bed/dead/1/effective heating number"]},
    ]}],
["primary/bed/dead/1/net ovendry load",
    {key: "primary/bed/dead/1/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/dead/1/ovendry fuel load","primary/bed/dead/1/total mineral content"]},
    ]}],
["primary/bed/dead/1/size class",
    {key: "primary/bed/dead/1/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/dead/1/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/1/size class weighting factor",
    {key: "primary/bed/dead/1/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/dead/1/size class","primary/bed/dead/size class weighting array"]},
    ]}],
["primary/bed/dead/1/surface area",
    {key: "primary/bed/dead/1/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/dead/1/ovendry fuel load","primary/bed/dead/1/surface area-to-volume ratio","primary/bed/dead/1/fiber density"]},
    ]}],
["primary/bed/dead/1/surface area weighting factor",
    {key: "primary/bed/dead/1/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/dead/1/surface area","primary/bed/dead/surface area"]},
    ]}],
["primary/bed/dead/1/volume",
    {key: "primary/bed/dead/1/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/dead/1/ovendry fuel load","primary/bed/dead/1/fiber density"]},
    ]}],
["primary/bed/dead/1/effective fuel/water load",
    {key: "primary/bed/dead/1/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/dead/1/effective fuel/ovendry load","primary/bed/dead/1/moisture content"]},
    ]}],
["primary/bed/dead/1/cylindrical diameter",
    {key: "primary/bed/dead/1/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/dead/1/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/1/cylindrical length",
    {key: "primary/bed/dead/1/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/dead/1/cylindrical diameter","primary/bed/dead/1/volume"]},
    ]}],
["primary/bed/dead/2/effective heating number",
    {key: "primary/bed/dead/2/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/dead/2/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/2/effective fuel/ovendry load",
    {key: "primary/bed/dead/2/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/dead/2/surface area-to-volume ratio","primary/bed/dead/2/ovendry fuel load","primary/bed/dead/2/life category"]},
    ]}],
["primary/bed/dead/2/heat of pre-ignition",
    {key: "primary/bed/dead/2/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/dead/2/moisture content","primary/bed/dead/2/effective heating number"]},
    ]}],
["primary/bed/dead/2/net ovendry load",
    {key: "primary/bed/dead/2/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/dead/2/ovendry fuel load","primary/bed/dead/2/total mineral content"]},
    ]}],
["primary/bed/dead/2/size class",
    {key: "primary/bed/dead/2/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/dead/2/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/2/size class weighting factor",
    {key: "primary/bed/dead/2/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/dead/2/size class","primary/bed/dead/size class weighting array"]},
    ]}],
["primary/bed/dead/2/surface area",
    {key: "primary/bed/dead/2/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/dead/2/ovendry fuel load","primary/bed/dead/2/surface area-to-volume ratio","primary/bed/dead/2/fiber density"]},
    ]}],
["primary/bed/dead/2/surface area weighting factor",
    {key: "primary/bed/dead/2/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/dead/2/surface area","primary/bed/dead/surface area"]},
    ]}],
["primary/bed/dead/2/volume",
    {key: "primary/bed/dead/2/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/dead/2/ovendry fuel load","primary/bed/dead/2/fiber density"]},
    ]}],
["primary/bed/dead/2/effective fuel/water load",
    {key: "primary/bed/dead/2/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/dead/2/effective fuel/ovendry load","primary/bed/dead/2/moisture content"]},
    ]}],
["primary/bed/dead/2/cylindrical diameter",
    {key: "primary/bed/dead/2/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/dead/2/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/2/cylindrical length",
    {key: "primary/bed/dead/2/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/dead/2/cylindrical diameter","primary/bed/dead/2/volume"]},
    ]}],
["primary/bed/dead/3/effective heating number",
    {key: "primary/bed/dead/3/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/dead/3/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/3/effective fuel/ovendry load",
    {key: "primary/bed/dead/3/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/dead/3/surface area-to-volume ratio","primary/bed/dead/3/ovendry fuel load","primary/bed/dead/3/life category"]},
    ]}],
["primary/bed/dead/3/heat of pre-ignition",
    {key: "primary/bed/dead/3/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/dead/3/moisture content","primary/bed/dead/3/effective heating number"]},
    ]}],
["primary/bed/dead/3/net ovendry load",
    {key: "primary/bed/dead/3/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/dead/3/ovendry fuel load","primary/bed/dead/3/total mineral content"]},
    ]}],
["primary/bed/dead/3/size class",
    {key: "primary/bed/dead/3/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/dead/3/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/3/size class weighting factor",
    {key: "primary/bed/dead/3/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/dead/3/size class","primary/bed/dead/size class weighting array"]},
    ]}],
["primary/bed/dead/3/surface area",
    {key: "primary/bed/dead/3/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/dead/3/ovendry fuel load","primary/bed/dead/3/surface area-to-volume ratio","primary/bed/dead/3/fiber density"]},
    ]}],
["primary/bed/dead/3/surface area weighting factor",
    {key: "primary/bed/dead/3/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/dead/3/surface area","primary/bed/dead/surface area"]},
    ]}],
["primary/bed/dead/3/volume",
    {key: "primary/bed/dead/3/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/dead/3/ovendry fuel load","primary/bed/dead/3/fiber density"]},
    ]}],
["primary/bed/dead/3/effective fuel/water load",
    {key: "primary/bed/dead/3/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/dead/3/effective fuel/ovendry load","primary/bed/dead/3/moisture content"]},
    ]}],
["primary/bed/dead/3/cylindrical diameter",
    {key: "primary/bed/dead/3/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/dead/3/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/3/cylindrical length",
    {key: "primary/bed/dead/3/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/dead/3/cylindrical diameter","primary/bed/dead/3/volume"]},
    ]}],
["primary/bed/dead/4/effective heating number",
    {key: "primary/bed/dead/4/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/dead/4/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/4/effective fuel/ovendry load",
    {key: "primary/bed/dead/4/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/dead/4/surface area-to-volume ratio","primary/bed/dead/4/ovendry fuel load","primary/bed/dead/4/life category"]},
    ]}],
["primary/bed/dead/4/heat of pre-ignition",
    {key: "primary/bed/dead/4/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/dead/4/moisture content","primary/bed/dead/4/effective heating number"]},
    ]}],
["primary/bed/dead/4/net ovendry load",
    {key: "primary/bed/dead/4/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/dead/4/ovendry fuel load","primary/bed/dead/4/total mineral content"]},
    ]}],
["primary/bed/dead/4/size class",
    {key: "primary/bed/dead/4/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/dead/4/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/4/size class weighting factor",
    {key: "primary/bed/dead/4/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/dead/4/size class","primary/bed/dead/size class weighting array"]},
    ]}],
["primary/bed/dead/4/surface area",
    {key: "primary/bed/dead/4/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/dead/4/ovendry fuel load","primary/bed/dead/4/surface area-to-volume ratio","primary/bed/dead/4/fiber density"]},
    ]}],
["primary/bed/dead/4/surface area weighting factor",
    {key: "primary/bed/dead/4/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/dead/4/surface area","primary/bed/dead/surface area"]},
    ]}],
["primary/bed/dead/4/volume",
    {key: "primary/bed/dead/4/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/dead/4/ovendry fuel load","primary/bed/dead/4/fiber density"]},
    ]}],
["primary/bed/dead/4/effective fuel/water load",
    {key: "primary/bed/dead/4/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/dead/4/effective fuel/ovendry load","primary/bed/dead/4/moisture content"]},
    ]}],
["primary/bed/dead/4/cylindrical diameter",
    {key: "primary/bed/dead/4/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/dead/4/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/4/cylindrical length",
    {key: "primary/bed/dead/4/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/dead/4/cylindrical diameter","primary/bed/dead/4/volume"]},
    ]}],
["primary/bed/dead/5/effective heating number",
    {key: "primary/bed/dead/5/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/dead/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/5/effective fuel/ovendry load",
    {key: "primary/bed/dead/5/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/dead/5/surface area-to-volume ratio","primary/bed/dead/5/ovendry fuel load","primary/bed/dead/5/life category"]},
    ]}],
["primary/bed/dead/5/heat of pre-ignition",
    {key: "primary/bed/dead/5/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/dead/5/moisture content","primary/bed/dead/5/effective heating number"]},
    ]}],
["primary/bed/dead/5/net ovendry load",
    {key: "primary/bed/dead/5/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/dead/5/ovendry fuel load","primary/bed/dead/5/total mineral content"]},
    ]}],
["primary/bed/dead/5/size class",
    {key: "primary/bed/dead/5/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/dead/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/5/size class weighting factor",
    {key: "primary/bed/dead/5/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/dead/5/size class","primary/bed/dead/size class weighting array"]},
    ]}],
["primary/bed/dead/5/surface area",
    {key: "primary/bed/dead/5/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/dead/5/ovendry fuel load","primary/bed/dead/5/surface area-to-volume ratio","primary/bed/dead/5/fiber density"]},
    ]}],
["primary/bed/dead/5/surface area weighting factor",
    {key: "primary/bed/dead/5/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/dead/5/surface area","primary/bed/dead/surface area"]},
    ]}],
["primary/bed/dead/5/volume",
    {key: "primary/bed/dead/5/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/dead/5/ovendry fuel load","primary/bed/dead/5/fiber density"]},
    ]}],
["primary/bed/dead/5/effective fuel/water load",
    {key: "primary/bed/dead/5/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/dead/5/effective fuel/ovendry load","primary/bed/dead/5/moisture content"]},
    ]}],
["primary/bed/dead/5/cylindrical diameter",
    {key: "primary/bed/dead/5/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/dead/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/5/cylindrical length",
    {key: "primary/bed/dead/5/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/dead/5/cylindrical diameter","primary/bed/dead/5/volume"]},
    ]}],
["primary/bed/dead/size class weighting array",
    {key: "primary/bed/dead/size class weighting array", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactorArray, args: ["primary/bed/dead/1/surface area","primary/bed/dead/1/size class","primary/bed/dead/2/surface area","primary/bed/dead/2/size class","primary/bed/dead/3/surface area","primary/bed/dead/3/size class","primary/bed/dead/4/surface area","primary/bed/dead/4/size class","primary/bed/dead/5/surface area","primary/bed/dead/5/size class"]},
    ]}],
["primary/bed/dead/surface area",
    {key: "primary/bed/dead/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/1/surface area","primary/bed/dead/2/surface area","primary/bed/dead/3/surface area","primary/bed/dead/4/surface area","primary/bed/dead/5/surface area"]},
    ]}],
["primary/bed/dead/surface area weighting factor",
    {key: "primary/bed/dead/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.divide, args: ["primary/bed/dead/surface area","primary/bed/surface area"]},
    ]}],
["primary/bed/dead/mineral damping coefficient",
    {key: "primary/bed/dead/mineral damping coefficient", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.mineralDamping, args: ["primary/bed/dead/silica-free mineral content"]},
    ]}],
["primary/bed/dead/moisture damping coefficient",
    {key: "primary/bed/dead/moisture damping coefficient", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.moistureDamping, args: ["primary/bed/dead/moisture content","primary/bed/dead/extinction moisture content"]},
    ]}],
["primary/bed/dead/heat of combustion",
    {key: "primary/bed/dead/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/dead/1/surface area weighting factor","primary/bed/dead/2/surface area weighting factor","primary/bed/dead/3/surface area weighting factor","primary/bed/dead/4/surface area weighting factor","primary/bed/dead/5/surface area weighting factor","primary/bed/dead/1/heat of combustion","primary/bed/dead/2/heat of combustion","primary/bed/dead/3/heat of combustion","primary/bed/dead/4/heat of combustion","primary/bed/dead/5/heat of combustion"]},
    ]}],
["primary/bed/dead/ovendry fuel load",
    {key: "primary/bed/dead/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/1/ovendry fuel load","primary/bed/dead/2/ovendry fuel load","primary/bed/dead/3/ovendry fuel load","primary/bed/dead/4/ovendry fuel load","primary/bed/dead/5/ovendry fuel load"]},
    ]}],
["primary/bed/dead/effective fuel/ovendry load",
    {key: "primary/bed/dead/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/1/effective fuel/ovendry load","primary/bed/dead/2/effective fuel/ovendry load","primary/bed/dead/3/effective fuel/ovendry load","primary/bed/dead/4/effective fuel/ovendry load","primary/bed/dead/5/effective fuel/ovendry load"]},
    ]}],
["primary/bed/dead/moisture content",
    {key: "primary/bed/dead/moisture content", value: 1, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/dead/1/surface area weighting factor","primary/bed/dead/2/surface area weighting factor","primary/bed/dead/3/surface area weighting factor","primary/bed/dead/4/surface area weighting factor","primary/bed/dead/5/surface area weighting factor","primary/bed/dead/1/moisture content","primary/bed/dead/2/moisture content","primary/bed/dead/3/moisture content","primary/bed/dead/4/moisture content","primary/bed/dead/5/moisture content"]},
    ]}],
["primary/bed/dead/volume",
    {key: "primary/bed/dead/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/1/volume","primary/bed/dead/2/volume","primary/bed/dead/3/volume","primary/bed/dead/4/volume","primary/bed/dead/5/volume"]},
    ]}],
["primary/bed/dead/heat of pre-ignition",
    {key: "primary/bed/dead/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/dead/1/surface area weighting factor","primary/bed/dead/2/surface area weighting factor","primary/bed/dead/3/surface area weighting factor","primary/bed/dead/4/surface area weighting factor","primary/bed/dead/5/surface area weighting factor","primary/bed/dead/1/heat of pre-ignition","primary/bed/dead/2/heat of pre-ignition","primary/bed/dead/3/heat of pre-ignition","primary/bed/dead/4/heat of pre-ignition","primary/bed/dead/5/heat of pre-ignition"]},
    ]}],
["primary/bed/dead/reaction intensity",
    {key: "primary/bed/dead/reaction intensity", value: 0, units: "fire reaction intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.multiply, args: ["primary/bed/dead/dry reaction intensity","primary/bed/dead/moisture damping coefficient"]},
    ]}],
["primary/bed/dead/dry reaction intensity",
    {key: "primary/bed/dead/dry reaction intensity", value: 0, units: "fire reaction intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.dryFuelReactionIntensity, args: ["primary/bed/reaction intensity/optimum","primary/bed/dead/net ovendry load","primary/bed/dead/heat of combustion","primary/bed/dead/mineral damping coefficient"]},
    ]}],
["primary/bed/dead/surface area-to-volume ratio",
    {key: "primary/bed/dead/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/dead/1/surface area weighting factor","primary/bed/dead/2/surface area weighting factor","primary/bed/dead/3/surface area weighting factor","primary/bed/dead/4/surface area weighting factor","primary/bed/dead/5/surface area weighting factor","primary/bed/dead/1/surface area-to-volume ratio","primary/bed/dead/2/surface area-to-volume ratio","primary/bed/dead/3/surface area-to-volume ratio","primary/bed/dead/4/surface area-to-volume ratio","primary/bed/dead/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/dead/silica-free mineral content",
    {key: "primary/bed/dead/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/dead/1/surface area weighting factor","primary/bed/dead/2/surface area weighting factor","primary/bed/dead/3/surface area weighting factor","primary/bed/dead/4/surface area weighting factor","primary/bed/dead/5/surface area weighting factor","primary/bed/dead/1/silica-free mineral content","primary/bed/dead/2/silica-free mineral content","primary/bed/dead/3/silica-free mineral content","primary/bed/dead/4/silica-free mineral content","primary/bed/dead/5/silica-free mineral content"]},
    ]}],
["primary/bed/dead/net ovendry load",
    {key: "primary/bed/dead/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/dead/1/size class weighting factor","primary/bed/dead/2/size class weighting factor","primary/bed/dead/3/size class weighting factor","primary/bed/dead/4/size class weighting factor","primary/bed/dead/5/size class weighting factor","primary/bed/dead/1/net ovendry load","primary/bed/dead/2/net ovendry load","primary/bed/dead/3/net ovendry load","primary/bed/dead/4/net ovendry load","primary/bed/dead/5/net ovendry load"]},
    ]}],
["primary/bed/live/1/effective heating number",
    {key: "primary/bed/live/1/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/live/1/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/1/effective fuel/ovendry load",
    {key: "primary/bed/live/1/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/live/1/surface area-to-volume ratio","primary/bed/live/1/ovendry fuel load","primary/bed/live/1/life category"]},
    ]}],
["primary/bed/live/1/heat of pre-ignition",
    {key: "primary/bed/live/1/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/live/1/moisture content","primary/bed/live/1/effective heating number"]},
    ]}],
["primary/bed/live/1/net ovendry load",
    {key: "primary/bed/live/1/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/live/1/ovendry fuel load","primary/bed/live/1/total mineral content"]},
    ]}],
["primary/bed/live/1/size class",
    {key: "primary/bed/live/1/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/live/1/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/1/size class weighting factor",
    {key: "primary/bed/live/1/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/live/1/size class","primary/bed/live/size class weighting array"]},
    ]}],
["primary/bed/live/1/surface area",
    {key: "primary/bed/live/1/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/live/1/ovendry fuel load","primary/bed/live/1/surface area-to-volume ratio","primary/bed/live/1/fiber density"]},
    ]}],
["primary/bed/live/1/surface area weighting factor",
    {key: "primary/bed/live/1/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/live/1/surface area","primary/bed/live/surface area"]},
    ]}],
["primary/bed/live/1/volume",
    {key: "primary/bed/live/1/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/live/1/ovendry fuel load","primary/bed/live/1/fiber density"]},
    ]}],
["primary/bed/live/1/effective fuel/water load",
    {key: "primary/bed/live/1/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/live/1/effective fuel/ovendry load","primary/bed/live/1/moisture content"]},
    ]}],
["primary/bed/live/1/cylindrical diameter",
    {key: "primary/bed/live/1/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/live/1/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/1/cylindrical length",
    {key: "primary/bed/live/1/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/live/1/cylindrical diameter","primary/bed/live/1/volume"]},
    ]}],
["primary/bed/live/2/effective heating number",
    {key: "primary/bed/live/2/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/live/2/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/2/effective fuel/ovendry load",
    {key: "primary/bed/live/2/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/live/2/surface area-to-volume ratio","primary/bed/live/2/ovendry fuel load","primary/bed/live/2/life category"]},
    ]}],
["primary/bed/live/2/heat of pre-ignition",
    {key: "primary/bed/live/2/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/live/2/moisture content","primary/bed/live/2/effective heating number"]},
    ]}],
["primary/bed/live/2/net ovendry load",
    {key: "primary/bed/live/2/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/live/2/ovendry fuel load","primary/bed/live/2/total mineral content"]},
    ]}],
["primary/bed/live/2/size class",
    {key: "primary/bed/live/2/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/live/2/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/2/size class weighting factor",
    {key: "primary/bed/live/2/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/live/2/size class","primary/bed/live/size class weighting array"]},
    ]}],
["primary/bed/live/2/surface area",
    {key: "primary/bed/live/2/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/live/2/ovendry fuel load","primary/bed/live/2/surface area-to-volume ratio","primary/bed/live/2/fiber density"]},
    ]}],
["primary/bed/live/2/surface area weighting factor",
    {key: "primary/bed/live/2/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/live/2/surface area","primary/bed/live/surface area"]},
    ]}],
["primary/bed/live/2/volume",
    {key: "primary/bed/live/2/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/live/2/ovendry fuel load","primary/bed/live/2/fiber density"]},
    ]}],
["primary/bed/live/2/effective fuel/water load",
    {key: "primary/bed/live/2/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/live/2/effective fuel/ovendry load","primary/bed/live/2/moisture content"]},
    ]}],
["primary/bed/live/2/cylindrical diameter",
    {key: "primary/bed/live/2/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/live/2/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/2/cylindrical length",
    {key: "primary/bed/live/2/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/live/2/cylindrical diameter","primary/bed/live/2/volume"]},
    ]}],
["primary/bed/live/3/effective heating number",
    {key: "primary/bed/live/3/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/live/3/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/3/effective fuel/ovendry load",
    {key: "primary/bed/live/3/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/live/3/surface area-to-volume ratio","primary/bed/live/3/ovendry fuel load","primary/bed/live/3/life category"]},
    ]}],
["primary/bed/live/3/heat of pre-ignition",
    {key: "primary/bed/live/3/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/live/3/moisture content","primary/bed/live/3/effective heating number"]},
    ]}],
["primary/bed/live/3/net ovendry load",
    {key: "primary/bed/live/3/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/live/3/ovendry fuel load","primary/bed/live/3/total mineral content"]},
    ]}],
["primary/bed/live/3/size class",
    {key: "primary/bed/live/3/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/live/3/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/3/size class weighting factor",
    {key: "primary/bed/live/3/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/live/3/size class","primary/bed/live/size class weighting array"]},
    ]}],
["primary/bed/live/3/surface area",
    {key: "primary/bed/live/3/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/live/3/ovendry fuel load","primary/bed/live/3/surface area-to-volume ratio","primary/bed/live/3/fiber density"]},
    ]}],
["primary/bed/live/3/surface area weighting factor",
    {key: "primary/bed/live/3/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/live/3/surface area","primary/bed/live/surface area"]},
    ]}],
["primary/bed/live/3/volume",
    {key: "primary/bed/live/3/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/live/3/ovendry fuel load","primary/bed/live/3/fiber density"]},
    ]}],
["primary/bed/live/3/effective fuel/water load",
    {key: "primary/bed/live/3/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/live/3/effective fuel/ovendry load","primary/bed/live/3/moisture content"]},
    ]}],
["primary/bed/live/3/cylindrical diameter",
    {key: "primary/bed/live/3/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/live/3/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/3/cylindrical length",
    {key: "primary/bed/live/3/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/live/3/cylindrical diameter","primary/bed/live/3/volume"]},
    ]}],
["primary/bed/live/4/effective heating number",
    {key: "primary/bed/live/4/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/live/4/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/4/effective fuel/ovendry load",
    {key: "primary/bed/live/4/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/live/4/surface area-to-volume ratio","primary/bed/live/4/ovendry fuel load","primary/bed/live/4/life category"]},
    ]}],
["primary/bed/live/4/heat of pre-ignition",
    {key: "primary/bed/live/4/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/live/4/moisture content","primary/bed/live/4/effective heating number"]},
    ]}],
["primary/bed/live/4/net ovendry load",
    {key: "primary/bed/live/4/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/live/4/ovendry fuel load","primary/bed/live/4/total mineral content"]},
    ]}],
["primary/bed/live/4/size class",
    {key: "primary/bed/live/4/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/live/4/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/4/size class weighting factor",
    {key: "primary/bed/live/4/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/live/4/size class","primary/bed/live/size class weighting array"]},
    ]}],
["primary/bed/live/4/surface area",
    {key: "primary/bed/live/4/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/live/4/ovendry fuel load","primary/bed/live/4/surface area-to-volume ratio","primary/bed/live/4/fiber density"]},
    ]}],
["primary/bed/live/4/surface area weighting factor",
    {key: "primary/bed/live/4/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/live/4/surface area","primary/bed/live/surface area"]},
    ]}],
["primary/bed/live/4/volume",
    {key: "primary/bed/live/4/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/live/4/ovendry fuel load","primary/bed/live/4/fiber density"]},
    ]}],
["primary/bed/live/4/effective fuel/water load",
    {key: "primary/bed/live/4/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/live/4/effective fuel/ovendry load","primary/bed/live/4/moisture content"]},
    ]}],
["primary/bed/live/4/cylindrical diameter",
    {key: "primary/bed/live/4/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/live/4/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/4/cylindrical length",
    {key: "primary/bed/live/4/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/live/4/cylindrical diameter","primary/bed/live/4/volume"]},
    ]}],
["primary/bed/live/5/effective heating number",
    {key: "primary/bed/live/5/effective heating number", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveHeatingNumber, args: ["primary/bed/live/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/5/effective fuel/ovendry load",
    {key: "primary/bed/live/5/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelLoad, args: ["primary/bed/live/5/surface area-to-volume ratio","primary/bed/live/5/ovendry fuel load","primary/bed/live/5/life category"]},
    ]}],
["primary/bed/live/5/heat of pre-ignition",
    {key: "primary/bed/live/5/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatOfPreignition, args: ["primary/bed/live/5/moisture content","primary/bed/live/5/effective heating number"]},
    ]}],
["primary/bed/live/5/net ovendry load",
    {key: "primary/bed/live/5/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.netOvendryLoad, args: ["primary/bed/live/5/ovendry fuel load","primary/bed/live/5/total mineral content"]},
    ]}],
["primary/bed/live/5/size class",
    {key: "primary/bed/live/5/size class", value: 0, units: "fuel size class", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClass, args: ["primary/bed/live/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/5/size class weighting factor",
    {key: "primary/bed/live/5/size class weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactor, args: ["primary/bed/live/5/size class","primary/bed/live/size class weighting array"]},
    ]}],
["primary/bed/live/5/surface area",
    {key: "primary/bed/live/5/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceArea, args: ["primary/bed/live/5/ovendry fuel load","primary/bed/live/5/surface area-to-volume ratio","primary/bed/live/5/fiber density"]},
    ]}],
["primary/bed/live/5/surface area weighting factor",
    {key: "primary/bed/live/5/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.surfaceAreaWeightingFactor, args: ["primary/bed/live/5/surface area","primary/bed/live/surface area"]},
    ]}],
["primary/bed/live/5/volume",
    {key: "primary/bed/live/5/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.volume, args: ["primary/bed/live/5/ovendry fuel load","primary/bed/live/5/fiber density"]},
    ]}],
["primary/bed/live/5/effective fuel/water load",
    {key: "primary/bed/live/5/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveFuelWaterLoad, args: ["primary/bed/live/5/effective fuel/ovendry load","primary/bed/live/5/moisture content"]},
    ]}],
["primary/bed/live/5/cylindrical diameter",
    {key: "primary/bed/live/5/cylindrical diameter", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalDiameter, args: ["primary/bed/live/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/5/cylindrical length",
    {key: "primary/bed/live/5/cylindrical length", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.cylindricalLength, args: ["primary/bed/live/5/cylindrical diameter","primary/bed/live/5/volume"]},
    ]}],
["primary/bed/live/size class weighting array",
    {key: "primary/bed/live/size class weighting array", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sizeClassWeightingFactorArray, args: ["primary/bed/live/1/surface area","primary/bed/live/1/size class","primary/bed/live/2/surface area","primary/bed/live/2/size class","primary/bed/live/3/surface area","primary/bed/live/3/size class","primary/bed/live/4/surface area","primary/bed/live/4/size class","primary/bed/live/5/surface area","primary/bed/live/5/size class"]},
    ]}],
["primary/bed/live/surface area",
    {key: "primary/bed/live/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/live/1/surface area","primary/bed/live/2/surface area","primary/bed/live/3/surface area","primary/bed/live/4/surface area","primary/bed/live/5/surface area"]},
    ]}],
["primary/bed/live/surface area weighting factor",
    {key: "primary/bed/live/surface area weighting factor", value: 0, units: "fuel weighting factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.divide, args: ["primary/bed/live/surface area","primary/bed/surface area"]},
    ]}],
["primary/bed/live/mineral damping coefficient",
    {key: "primary/bed/live/mineral damping coefficient", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.mineralDamping, args: ["primary/bed/live/silica-free mineral content"]},
    ]}],
["primary/bed/live/moisture damping coefficient",
    {key: "primary/bed/live/moisture damping coefficient", value: 0, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.moistureDamping, args: ["primary/bed/live/moisture content","primary/bed/live/extinction moisture content"]},
    ]}],
["primary/bed/live/heat of combustion",
    {key: "primary/bed/live/heat of combustion", value: 0, units: "fuel heat of combustion units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/live/1/surface area weighting factor","primary/bed/live/2/surface area weighting factor","primary/bed/live/3/surface area weighting factor","primary/bed/live/4/surface area weighting factor","primary/bed/live/5/surface area weighting factor","primary/bed/live/1/heat of combustion","primary/bed/live/2/heat of combustion","primary/bed/live/3/heat of combustion","primary/bed/live/4/heat of combustion","primary/bed/live/5/heat of combustion"]},
    ]}],
["primary/bed/live/ovendry fuel load",
    {key: "primary/bed/live/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/live/1/ovendry fuel load","primary/bed/live/2/ovendry fuel load","primary/bed/live/3/ovendry fuel load","primary/bed/live/4/ovendry fuel load","primary/bed/live/5/ovendry fuel load"]},
    ]}],
["primary/bed/live/effective fuel/ovendry load",
    {key: "primary/bed/live/effective fuel/ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/live/1/effective fuel/ovendry load","primary/bed/live/2/effective fuel/ovendry load","primary/bed/live/3/effective fuel/ovendry load","primary/bed/live/4/effective fuel/ovendry load","primary/bed/live/5/effective fuel/ovendry load"]},
    ]}],
["primary/bed/live/moisture content",
    {key: "primary/bed/live/moisture content", value: 1, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/live/1/surface area weighting factor","primary/bed/live/2/surface area weighting factor","primary/bed/live/3/surface area weighting factor","primary/bed/live/4/surface area weighting factor","primary/bed/live/5/surface area weighting factor","primary/bed/live/1/moisture content","primary/bed/live/2/moisture content","primary/bed/live/3/moisture content","primary/bed/live/4/moisture content","primary/bed/live/5/moisture content"]},
    ]}],
["primary/bed/live/volume",
    {key: "primary/bed/live/volume", value: 0, units: "fuel volume units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/live/1/volume","primary/bed/live/2/volume","primary/bed/live/3/volume","primary/bed/live/4/volume","primary/bed/live/5/volume"]},
    ]}],
["primary/bed/live/heat of pre-ignition",
    {key: "primary/bed/live/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/live/1/surface area weighting factor","primary/bed/live/2/surface area weighting factor","primary/bed/live/3/surface area weighting factor","primary/bed/live/4/surface area weighting factor","primary/bed/live/5/surface area weighting factor","primary/bed/live/1/heat of pre-ignition","primary/bed/live/2/heat of pre-ignition","primary/bed/live/3/heat of pre-ignition","primary/bed/live/4/heat of pre-ignition","primary/bed/live/5/heat of pre-ignition"]},
    ]}],
["primary/bed/live/reaction intensity",
    {key: "primary/bed/live/reaction intensity", value: 0, units: "fire reaction intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.multiply, args: ["primary/bed/live/dry reaction intensity","primary/bed/live/moisture damping coefficient"]},
    ]}],
["primary/bed/live/dry reaction intensity",
    {key: "primary/bed/live/dry reaction intensity", value: 0, units: "fire reaction intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.dryFuelReactionIntensity, args: ["primary/bed/reaction intensity/optimum","primary/bed/live/net ovendry load","primary/bed/live/heat of combustion","primary/bed/live/mineral damping coefficient"]},
    ]}],
["primary/bed/live/surface area-to-volume ratio",
    {key: "primary/bed/live/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/live/1/surface area weighting factor","primary/bed/live/2/surface area weighting factor","primary/bed/live/3/surface area weighting factor","primary/bed/live/4/surface area weighting factor","primary/bed/live/5/surface area weighting factor","primary/bed/live/1/surface area-to-volume ratio","primary/bed/live/2/surface area-to-volume ratio","primary/bed/live/3/surface area-to-volume ratio","primary/bed/live/4/surface area-to-volume ratio","primary/bed/live/5/surface area-to-volume ratio"]},
    ]}],
["primary/bed/live/silica-free mineral content",
    {key: "primary/bed/live/silica-free mineral content", value: 0, units: "fuel portion units [0..1]", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/live/1/surface area weighting factor","primary/bed/live/2/surface area weighting factor","primary/bed/live/3/surface area weighting factor","primary/bed/live/4/surface area weighting factor","primary/bed/live/5/surface area weighting factor","primary/bed/live/1/silica-free mineral content","primary/bed/live/2/silica-free mineral content","primary/bed/live/3/silica-free mineral content","primary/bed/live/4/silica-free mineral content","primary/bed/live/5/silica-free mineral content"]},
    ]}],
["primary/bed/live/net ovendry load",
    {key: "primary/bed/live/net ovendry load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sumOfProducts, args: ["primary/bed/live/1/size class weighting factor","primary/bed/live/2/size class weighting factor","primary/bed/live/3/size class weighting factor","primary/bed/live/4/size class weighting factor","primary/bed/live/5/size class weighting factor","primary/bed/live/1/net ovendry load","primary/bed/live/2/net ovendry load","primary/bed/live/3/net ovendry load","primary/bed/live/4/net ovendry load","primary/bed/live/5/net ovendry load"]},
    ]}],
["primary/bed/dead/extinction moisture content",
    {key: "primary/bed/dead/extinction moisture content", value: 0, units: "fuel moisture content units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/dead/extinction moisture content"]},
    ]}],
["primary/bed/dead/effective fuel/water load",
    {key: "primary/bed/dead/effective fuel/water load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/1/effective fuel/water load","primary/bed/dead/2/effective fuel/water load","primary/bed/dead/3/effective fuel/water load","primary/bed/dead/4/effective fuel/water load","primary/bed/dead/5/effective fuel/water load"]},
    ]}],
["primary/bed/dead/effective fuel/moisture content",
    {key: "primary/bed/dead/effective fuel/moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.divide, args: ["primary/bed/dead/effective fuel/water load","primary/bed/dead/effective fuel/ovendry load"]},
    ]}],
["primary/bed/live/extinction moisture content/factor",
    {key: "primary/bed/live/extinction moisture content/factor", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.liveFuelExtinctionMoistureContentFactor, args: ["primary/bed/dead/effective fuel/ovendry load","primary/bed/live/effective fuel/ovendry load"]},
    ]}],
["primary/bed/live/extinction moisture content",
    {key: "primary/bed/live/extinction moisture content", value: 0, units: "fuel moisture content units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.liveFuelExtinctionMoistureContent, args: ["primary/bed/live/extinction moisture content/factor","primary/bed/dead/effective fuel/moisture content","primary/bed/dead/extinction moisture content"]},
    ]}],
["primary/bed/depth",
    {key: "primary/bed/depth", value: 0, units: "fuel diameter, depth, and length units", cfgkey: "primarySurfaceFuelDomain", options: [
        {cfgval: "standard", updater: Lib.assign, args: ["primary/model/standard/depth"]},
    ]}],
["primary/bed/bulk density",
    {key: "primary/bed/bulk density", value: 0, units: "fuel bulk density", cfgkey: "", options: [
        {cfgval: "", updater: Lib.bulkDensity, args: ["primary/bed/ovendry fuel load","primary/bed/depth"]},
    ]}],
["primary/bed/ovendry fuel load",
    {key: "primary/bed/ovendry fuel load", value: 0, units: "fuel load units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/ovendry fuel load","primary/bed/live/ovendry fuel load"]},
    ]}],
["primary/bed/surface area",
    {key: "primary/bed/surface area", value: 0, units: "fuel surface area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.sum, args: ["primary/bed/dead/surface area","primary/bed/live/surface area"]},
    ]}],
["primary/bed/surface area-to-volume ratio",
    {key: "primary/bed/surface area-to-volume ratio", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.weightedSavr, args: ["primary/bed/dead/surface area weighting factor","primary/bed/dead/surface area-to-volume ratio","primary/bed/live/surface area weighting factor","primary/bed/live/surface area-to-volume ratio"]},
    ]}],
["primary/bed/heat of pre-ignition",
    {key: "primary/bed/heat of pre-ignition", value: 0, units: "fuel heat of pre-ignition units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.weightedHeatOfPreIgnition, args: ["primary/bed/dead/surface area weighting factor","primary/bed/dead/heat of pre-ignition","primary/bed/live/surface area weighting factor","primary/bed/live/heat of pre-ignition"]},
    ]}],
["primary/bed/packing ratio",
    {key: "primary/bed/packing ratio", value: 0, units: "ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.packingRatio, args: ["primary/bed/dead/volume","primary/bed/live/volume","primary/bed/depth"]},
    ]}],
["primary/bed/packing ratio/optimum",
    {key: "primary/bed/packing ratio/optimum", value: 0, units: "ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.optimumPackingRatio, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/bed/packing ratio/ratio",
    {key: "primary/bed/packing ratio/ratio", value: 0, units: "ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.packingRatioRatio, args: ["primary/bed/packing ratio","primary/bed/packing ratio/optimum"]},
    ]}],
["primary/bed/propagating flux ratio",
    {key: "primary/bed/propagating flux ratio", value: 0, units: "ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.propagatingFluxRatio, args: ["primary/bed/surface area-to-volume ratio","primary/bed/packing ratio"]},
    ]}],
["primary/bed/reaction intensity/exponent",
    {key: "primary/bed/reaction intensity/exponent", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.reactionVelocityExponent, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/bed/reaction intensity/maximum",
    {key: "primary/bed/reaction intensity/maximum", value: 0, units: "reaction velocity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.reactionVelocityMaximum, args: ["primary/bed/surface area-to-volume ratio/**1.5"]},
    ]}],
["primary/bed/reaction intensity/optimum",
    {key: "primary/bed/reaction intensity/optimum", value: 0, units: "reaction velocity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.reactionVelocityOptimum, args: ["primary/bed/packing ratio/ratio","primary/bed/reaction intensity/maximum","primary/bed/reaction intensity/exponent"]},
    ]}],
["primary/bed/surface area-to-volume ratio/**1.5",
    {key: "primary/bed/surface area-to-volume ratio/**1.5", value: 1, units: "fuel surface area-to-volume ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.savr15, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/bed/heat sink",
    {key: "primary/bed/heat sink", value: 0, units: "fuel heat sink", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatSink, args: ["primary/bed/bulk density","primary/bed/heat of pre-ignition"]},
    ]}],
["primary/bed/reaction intensity",
    {key: "primary/bed/reaction intensity", value: 0, units: "fire reaction intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.reactionIntensity, args: ["primary/bed/dead/reaction intensity","primary/bed/live/reaction intensity"]},
    ]}],
["primary/bed/heat source",
    {key: "primary/bed/heat source", value: 0, units: "fire reaction intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatSource, args: ["primary/bed/reaction intensity","primary/bed/propagating flux ratio"]},
    ]}],
["primary/bed/wind/speed/reduction/factor/",
    {key: "primary/bed/wind/speed/reduction/factor/", value: 1, units: "fraction units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.openWindSpeedAdjustmentFactor, args: ["primary/bed/depth"]},
    ]}],
["primary/wind/speed/reduction/factor/midflame",
    {key: "primary/wind/speed/reduction/factor/midflame", value: 1, units: "fraction units", cfgkey: "windSpeedReductionInputs", options: [
        {cfgval: "observed", updater: Lib.input, args: []},
        {cfgval: "estimated", updater: Lib.windSpeedAdjustmentFactor, args: ["canopy/shelters fuel from wind","canopy/wind/speed/reduction/factor","primary/bed/wind/speed/reduction/factor/"]},
    ]}],
["primary/wind/speed/midflame",
    {key: "primary/wind/speed/midflame", value: 0, units: "wind speed units", cfgkey: "midflameInputs", options: [
        {cfgval: "observed", updater: Lib.input, args: []},
        {cfgval: "estimated", updater: Lib.multiply, args: ["weather/wind/speed/at 20-ft","primary/wind/speed/reduction/factor/midflame"]},
    ]}],
["primary/fire/slope/factor/K",
    {key: "primary/fire/slope/factor/K", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.slopeK, args: ["primary/bed/packing ratio"]},
    ]}],
["primary/fire/wind/factor/B",
    {key: "primary/fire/wind/factor/B", value: 1, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.windB, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/fire/wind/factor/C",
    {key: "primary/fire/wind/factor/C", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.windC, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/fire/wind/factor/E",
    {key: "primary/fire/wind/factor/E", value: 1, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.windE, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/fire/wind/factor/I",
    {key: "primary/fire/wind/factor/I", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.windI, args: ["primary/bed/packing ratio/ratio","primary/fire/wind/factor/E","primary/fire/wind/factor/C"]},
    ]}],
["primary/fire/wind/factor/K",
    {key: "primary/fire/wind/factor/K", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.windK, args: ["primary/bed/packing ratio/ratio","primary/fire/wind/factor/E","primary/fire/wind/factor/C"]},
    ]}],
["primary/fire/1 no-wind no-slope/spread rate coefficient/wind",
    {key: "primary/fire/1 no-wind no-slope/spread rate coefficient/wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.phiWind, args: ["primary/wind/speed/midflame","primary/fire/wind/factor/B","primary/fire/wind/factor/K"]},
    ]}],
["primary/fire/1 no-wind no-slope/spread rate coefficient/slope",
    {key: "primary/fire/1 no-wind no-slope/spread rate coefficient/slope", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.phiSlope, args: ["terrain/slope/steepness/ratio","primary/fire/slope/factor/K"]},
    ]}],
["primary/fire/1 no-wind no-slope/spread rate",
    {key: "primary/fire/1 no-wind no-slope/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.noWindNoSlopeSpreadRate, args: ["primary/bed/heat source","primary/bed/heat sink"]},
    ]}],
["primary/fire/1 no-wind no-slope/spread rate coefficient/effective wind",
    {key: "primary/fire/1 no-wind no-slope/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeedCoefficient, args: ["primary/fire/1 no-wind no-slope/spread rate coefficient/wind","primary/fire/1 no-wind no-slope/spread rate coefficient/slope"]},
    ]}],
["primary/fire/1 no-wind no-slope/effective wind/speed",
    {key: "primary/fire/1 no-wind no-slope/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeed, args: ["primary/fire/1 no-wind no-slope/spread rate coefficient/effective wind","primary/fire/wind/factor/B","primary/fire/wind/factor/I"]},
    ]}],
["primary/fire/2 wind-slope additional/spread rate/slope only",
    {key: "primary/fire/2 wind-slope additional/spread rate/slope only", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.maximumDirectionSlopeSpreadRate, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/1 no-wind no-slope/spread rate coefficient/slope"]},
    ]}],
["primary/fire/2 wind-slope additional/spread rate/wind only",
    {key: "primary/fire/2 wind-slope additional/spread rate/wind only", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.maximumDirectionWindSpreadRate, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/1 no-wind no-slope/spread rate coefficient/wind"]},
    ]}],
["primary/fire/2 wind-slope additional/spread rate/x component",
    {key: "primary/fire/2 wind-slope additional/spread rate/x component", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.maximumDirectionXComponent, args: ["primary/fire/2 wind-slope additional/spread rate/wind only","primary/fire/2 wind-slope additional/spread rate/slope only","weather/wind/direction/source/from up-slope"]},
    ]}],
["primary/fire/2 wind-slope additional/spread rate/y component",
    {key: "primary/fire/2 wind-slope additional/spread rate/y component", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.maximumDirectionYComponent, args: ["primary/fire/2 wind-slope additional/spread rate/wind only","weather/wind/direction/source/from up-slope"]},
    ]}],
["primary/fire/2 wind-slope additional/spread rate",
    {key: "primary/fire/2 wind-slope additional/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.maximumDirectionSpreadRate, args: ["primary/fire/2 wind-slope additional/spread rate/x component","primary/fire/2 wind-slope additional/spread rate/y component"]},
    ]}],
["primary/fire/3 cross-slope wind/spread rate",
    {key: "primary/fire/3 cross-slope wind/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.spreadRateWithCrossSlopeWind, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/2 wind-slope additional/spread rate"]},
    ]}],
["primary/fire/3 cross-slope wind/spread rate coefficient/effective wind",
    {key: "primary/fire/3 cross-slope wind/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeedCoefficientInferred, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/3 cross-slope wind/spread rate"]},
    ]}],
["primary/fire/3 cross-slope wind/effective wind/speed",
    {key: "primary/fire/3 cross-slope wind/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeed, args: ["primary/fire/3 cross-slope wind/spread rate coefficient/effective wind","primary/fire/wind/factor/B","primary/fire/wind/factor/I"]},
    ]}],
["primary/fire/4 effective limit/effective wind/speed",
    {key: "primary/fire/4 effective limit/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeedLimit, args: ["primary/bed/reaction intensity"]},
    ]}],
["primary/fire/4 effective limit/spread rate coefficient/effective wind",
    {key: "primary/fire/4 effective limit/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.phiEwFromEws, args: ["primary/fire/4 effective limit/effective wind/speed","primary/fire/wind/factor/B","primary/fire/wind/factor/K"]},
    ]}],
["primary/fire/4 effective limit/spread rate",
    {key: "primary/fire/4 effective limit/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.maximumSpreadRate, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/4 effective limit/spread rate coefficient/effective wind"]},
    ]}],
["primary/fire/5 eff wind limit applied/effective wind/speed",
    {key: "primary/fire/5 eff wind limit applied/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.min, args: ["primary/fire/3 cross-slope wind/effective wind/speed","primary/fire/4 effective limit/effective wind/speed"]},
    ]}],
["primary/fire/5 eff wind limit applied/spread rate coefficient/effective wind",
    {key: "primary/fire/5 eff wind limit applied/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.min, args: ["primary/fire/3 cross-slope wind/spread rate coefficient/effective wind","primary/fire/4 effective limit/spread rate coefficient/effective wind"]},
    ]}],
["primary/fire/5 eff wind limit applied/spread rate",
    {key: "primary/fire/5 eff wind limit applied/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.min, args: ["primary/fire/3 cross-slope wind/spread rate","primary/fire/4 effective limit/spread rate"]},
    ]}],
["primary/fire/6 ros limit applied/spread rate",
    {key: "primary/fire/6 ros limit applied/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.spreadRateWithRosLimitApplied, args: ["primary/fire/3 cross-slope wind/spread rate","primary/fire/3 cross-slope wind/effective wind/speed"]},
    ]}],
["primary/fire/6 ros limit applied/spread rate coefficient/effective wind",
    {key: "primary/fire/6 ros limit applied/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeedCoefficientInferred, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/6 ros limit applied/spread rate"]},
    ]}],
["primary/fire/6 ros limit applied/effective wind/speed",
    {key: "primary/fire/6 ros limit applied/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeed, args: ["primary/fire/6 ros limit applied/spread rate coefficient/effective wind","primary/fire/wind/factor/B","primary/fire/wind/factor/I"]},
    ]}],
["primary/fire/7 both limits applied/spread rate",
    {key: "primary/fire/7 both limits applied/spread rate", value: 0, units: "fire spread rate units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.spreadRateWithRosLimitApplied, args: ["primary/fire/5 eff wind limit applied/spread rate","primary/fire/5 eff wind limit applied/effective wind/speed"]},
    ]}],
["primary/fire/7 both limits applied/spread rate coefficient/effective wind",
    {key: "primary/fire/7 both limits applied/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeedCoefficientInferred, args: ["primary/fire/1 no-wind no-slope/spread rate","primary/fire/7 both limits applied/spread rate"]},
    ]}],
["primary/fire/7 both limits applied/effective wind/speed",
    {key: "primary/fire/7 both limits applied/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.effectiveWindSpeed, args: ["primary/fire/7 both limits applied/spread rate coefficient/effective wind","primary/fire/wind/factor/B","primary/fire/wind/factor/I"]},
    ]}],
["primary/fire/heading/spread rate",
    {key: "primary/fire/heading/spread rate", value: 0, units: "fire spread rate units", cfgkey: "primarySurfaceFireLimit", options: [
        {cfgval: "applied", updater: Lib.assign, args: ["primary/fire/7 both limits applied/spread rate"]},
        {cfgval: "not applied", updater: Lib.assign, args: ["primary/fire/6 ros limit applied/spread rate"]},
    ]}],
["primary/fire/spread rate coefficient/effective wind",
    {key: "primary/fire/spread rate coefficient/effective wind", value: 0, units: "factor units", cfgkey: "primarySurfaceFireLimit", options: [
        {cfgval: "applied", updater: Lib.assign, args: ["primary/fire/7 both limits applied/spread rate coefficient/effective wind"]},
        {cfgval: "not applied", updater: Lib.assign, args: ["primary/fire/6 ros limit applied/spread rate coefficient/effective wind"]},
    ]}],
["primary/fire/effective wind/speed",
    {key: "primary/fire/effective wind/speed", value: 0, units: "wind speed units", cfgkey: "primarySurfaceFireLimit", options: [
        {cfgval: "applied", updater: Lib.assign, args: ["primary/fire/7 both limits applied/effective wind/speed"]},
        {cfgval: "not applied", updater: Lib.assign, args: ["primary/fire/6 ros limit applied/effective wind/speed"]},
    ]}],
["primary/fire/heading/direction/from up-slope",
    {key: "primary/fire/heading/direction/from up-slope", value: 0, units: "degrees", cfgkey: "", options: [
        {cfgval: "", updater: Lib.spreadDirectionFromUpslope, args: ["primary/fire/2 wind-slope additional/spread rate/x component","primary/fire/2 wind-slope additional/spread rate/y component","primary/fire/2 wind-slope additional/spread rate"]},
    ]}],
["primary/fire/heading/direction/from north",
    {key: "primary/fire/heading/direction/from north", value: 0, units: "degrees", cfgkey: "", options: [
        {cfgval: "", updater: Lib.compassSum, args: ["terrain/slope/direction/up-slope","primary/fire/heading/direction/from up-slope"]},
    ]}],
["primary/fire/residence time",
    {key: "primary/fire/residence time", value: 0, units: "fire residence time units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.fireResidenceTime, args: ["primary/bed/surface area-to-volume ratio"]},
    ]}],
["primary/fire/heat per unit area",
    {key: "primary/fire/heat per unit area", value: 0, units: "fire heat per unit area units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.heatPerUnitArea, args: ["primary/bed/reaction intensity","primary/fire/residence time"]},
    ]}],
["primary/fire/length-to-width ratio",
    {key: "primary/fire/length-to-width ratio", value: 1, units: "ratio units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.lengthToWidthRatio, args: ["primary/fire/effective wind/speed"]},
    ]}],
["primary/fire/heading/fireline intensity",
    {key: "primary/fire/heading/fireline intensity", value: 0, units: "fireline intensity units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.firelineIntensity, args: ["primary/fire/heading/spread rate","primary/bed/reaction intensity","primary/fire/residence time"]},
    ]}],
["primary/fire/heading/flame length",
    {key: "primary/fire/heading/flame length", value: 0, units: "fire flame length units", cfgkey: "", options: [
        {cfgval: "", updater: Lib.flameLength, args: ["primary/fire/heading/fireline intensity"]},
    ]}],
])
