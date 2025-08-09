/**
 * The purpose of the surface module it to produce fire spread rate and intensity values
 * that may subsequently serve as inputs to fire growth, crown fire, spotting distance,
 * and tree mortality modules.
 * 
 * The surface module requires inputs from fuel, moisture, wind, and terrain modules.
 * 
 * @param {string} id All nodes are prefaced with this id (i.e., 'surface/1/')
 * @param {string} fuelId Preface of the fuel model nodes to be applied (i.e, 'wind/')
 * @param {string} moisId Preface of the fuel moisture nodes to be applied (i.e., 'moisture/)
 * @param {string} windId Preface of the wind nodes to be applied
 * @param {string} slopeId Preface of the slope nodes to be applied
 * @param {string} cfgFuel 'standard catalog', 'standard input', 'chaparral', 'southern rough', 'western aspen', or 'none'
 * @returns Nodes for a single surface fuel bed
 */
import { surfaceBedNodes } from './surfaceBedNodes.js'
import { surfaceFireNodes } from './surfaceFireNodes.js'
import { surfaceLifeNodes } from './surfaceLifeNodes.js'
import { surfaceElementNodesFromStandard } from './surfaceElementNodesFromStandard.js'
import { standardModelCatalogNodes, standardModelInputNodes } from './standardModelCatalogNodes.js'

export function surfaceNodes(id, moisId, windId, slopeId, cfgFuel) {
    let fuelNodes, elNodes
    const fireId = id + 'fire/'
    const bedId = id + 'bed/'
    const fuelId = id + 'fuel/' + cfgFuel + '/'

    const bedNodes = surfaceBedNodes(fireId, bedId)
    const fireNodes = surfaceFireNodes(fireId)

    if (cfgFuel==='standard catalog') {
        fuelNodes = standardModelCatalogNodes(fuelId)
        elNodes = surfaceElementNodesFromStandard(bedId, fuelId, moisId)
    }
    else if (cfgFuel==='standard input') {
        fuelNodes = standardModelInputNodes(fuelId)
        elNodes = surfaceElementNodesFromStandard(bedId, fuelId, moisId)
    }
    else if (cfgFuel==='chaparral') {
        fuelNodes = chaparralModelNodes(fuelId)
        elNodes = surfaceElementNodesFromChaparral(bedId, fuelId, moisId)
    }
    else if (cfgFuel==='southern rough') {
        fuelNodes = southernRoughModelNodes(fuelId)
        elNodes = surfaceElementNodesFromSouthernRough(bedId, fuelId, moisId)
    }
    else if (cfgFuel==='western aspen') {
        fuelNodes = westernAspenModelNodes(fuelId)
        elNodes = surfaceElementNodesFromWesternAspen(bedId, fuelId, moisId)
    }
    else { // if (cfgFuel==='none') {
        fuelNodes = []
        elNodes = surfaceElementNodesNone(bedId)
    }
    const deadNodes = surfaceLifeNodes(bedId, 'dead', fuelId, moisId)
    const liveNodes = surfaceLifeNodes(bedId, 'live', fuelId, moisId)
    return [...fireNodes, ...bedNodes, ...fuelNodes, ...deadNodes, ...liveNodes, ...elNodes]
}
