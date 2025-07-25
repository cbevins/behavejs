/**
 * Defines all the DagNodes for the BehavePlus Surface Model.
 * 
 * DagNode Naming Convention, Levels 0-2
 * Surface
 *      Weighted
 *          Fire
 *      Primary
 *          Fire
 *          Fuel
 *      Secondary
 *          Fire
 *          Fuel
 */
import {Dag} from '../dag/Dag.js'
import {DagNode} from '../dag/DagNode.js'

let pre = ''