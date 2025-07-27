import {Calc} from '../Calc.js'
import {Dag} from '../../dag/Dag.js'
import {DagNode} from '../../dag/DagNode.js'
import {Equations as Eq} from './equations.js'

// 'prefix' will usually be like 'surface/primary'
// 'life' must be 'dead' or 'live'
export function createDagNodes(prefix, life='dead') {
    const other = life==='dead' ? 'live' : 'dead'
    const p = prefix + '/fuel/' + life
    const o = prefix + '/fuel/' + other

    const nodeTemplates = [
        [`${p}/surface area`, 0, 'fuel/surface area',
            Eq.surfaceArea, [
                `${p}/partice/class1/surface area`,
                `${p}/partice/class2/surface area`,
                `${p}/partice/class3/surface area`,
                `${p}/partice/class4/surface area`,
                `${p}/partice/class5/surface area`],
        ],
        [`${p}/surface area/weighting factor`, 0, 'fraction',
            Eq.surfaceAreaWeightingFactor, [
                `${p}/surface area`,
                `${o}/surface area`]
        ]
    ]
    ]
        }