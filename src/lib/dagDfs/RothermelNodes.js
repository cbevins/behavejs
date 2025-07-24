import {Dag} from '../dag/Dag.js'
import {DagNode} from '../dag/DagNode.js'
import {Calc} from '../dag/Calc.js'
import {RothermelEquations as R} from './RothermelEquations.js'

const dag = new Dag('Rothermel')

// [key, value, updater, [array, of, supplier, keys]]
const nodeDefs = [
    // ['Spread Rate at Head', 0, rosHead, ['Spread Rate', 'Wind Factor', 'Slope Factor']],
    ['Spread Rate', 0, rosNoWindNoSlope, ['Heat Source', 'Heat Sink']],
    ['Heat Source', 0, R.heatSource, ['Reaction Intensity', 'Propagating Flux Ratio']],
    ['Heat Sink', 1, R.heatSink, ['bulkDens', 'ehn', 'Qig']],
    ['Reaction Intensity', 0, rxIntensity, ['Reaction Velocity Optimum', 'Net Fuel Load', 'Heat Content',
        'Moisture Damping', 'Mineral Damping']],
    // ['Reaction Intensity Optimum', 0, rxIntensityOpt,
    //     ['Reaction Velocity Maximum', 'Fuel Packing Ratio', 'Optimum Fuel Packing Ratio', 'Reaction Intensity A']],
]

for(let nodeDef of nodeDefs) {
    const [key, value, updater, suppliers] = nodeDef
    const node = dag.add(new DagNode(key, value))
    node.depends(updater, suppliers)
}

console.log('Dag node count is', dag.nodes.length)
