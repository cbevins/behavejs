import {Calc, Dag, StandardFuelModels as Eq, K, Util} from '../index.js'

/**
 * Returns nodes for a single surface fire & fuel bed
 * 
 * @param {config} cfg Configuration object
 * @param {string} id All nodes are prefaced with this id (i.e., 'surface/1/')
 * @param {string} fuelId Preface of the fuel model nodes to be applied (i.e, 'wind/')
 * @param {string} moisId Preface of the fuel moisture nodes to be applied (i.e., 'moisture/)
 * @param {string} windId Preface of the wind nodes to be applied
 * @param {string} terrId Preface of the terrain nodes to be applied
 */
function surfaceFireNodes(cfg, id, fuelId, moisId, windId, terrId) {
    const fireId = id + 'fire/'
    const bedId = id + 'bed/'
    const deadNodes = surfaceLifeNodes(bedId, 'dead', fuelId, moisId, cfg)
    const liveNodes = surfaceLifeNodes(bedId, 'live', fuelId, moisId, cfg)

    // Fuel element nodes are derived here
    let elementNodes = []
    if (cfg.surface.fuel==='standard catalog') {
        elementNodes = surfaceElementFromStandardCatalog(bedId, fuelId, moisId, cfg)
    } else if (cfg.surface.fuel==='standard input') {
    } else if (cfg.surface.fuel==='chaparral') {
    } else if (cfg.surface.fuel==='southern rough') {
    } else if (cfg.surface.fuel==='western aspen') {
    }
    const nodes = [...deadNodes, ...liveNodes, ...elementNodes]
    return nodes
}

function surfaceLifeNodes(bedId, lcatId, fuelId, moisId, cfg) {
}
function moistureNodes(id, cfg) {
    return [
        [id+'/module', 'fuel moisture', K._text, Dag.constant, []],
        [id+'/version', '1', K._text, Dag.constant, []],
        [id+'/dead/h-1'+K/mois, 1, K._mois, Dag.input, []],
        [id+'/dead/h-10'+K.mois, 1, K._mois, Dag.input, []],
        [id+'/dead/h-100'+K.mois, 1, K._mois, Dag.input, []],
        [id+'/live/stem'+K.mois, 3, K._load, Dag.input, []],
        [id+'/live/herb'+K.mois, 3, K._load, Dag.input, []],
    ]
}

function standardModelNodes(id, cfg) {
    return (cfg === 'catalog') ? standardModelCatalogNodes(id) : standardModelInputNodes()
}
