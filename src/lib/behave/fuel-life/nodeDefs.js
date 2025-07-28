/**
 * @file Behave 'fuel/ldead' and '/fuel/live' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, DagNode} from '../index.js'
import {Equations as Eq} from './equations.js'

// 'life' must be 'dead' or 'live'
export function nodeTemplates(life='dead') {
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
        }