import { Dag, L, U } from '../../modules/index.js'
import { NodeDef } from './NodeDef.js'

export class FuelMoisture extends NodeDef {
    constructor(prefix) {
        super(prefix)
    }

    individual() {
        this.dead = [0, U.mois, Dag.constant, []]
        this.dead1 = [  0, U.mois, Dag.input, []]
        this.dead10 = [ 0, U.mois, Dag.input, []]
        this.dead100 = [0, U.mois, Dag.input, []]
        this.live = [0, U.mois, Dag.constant, []]
        this.liveherb = [0, U.mois, Dag.input, []]
        this.livestem = [0, U.mois, Dag.input, []]
        return this.nodes()
    }
    category() {
        this.dead = [0, U.mois, Dag.input, []]
        this.dead1 = [  0, U.mois, Dag.assign, [this.dead]]
        this.dead10 = [ 0, U.mois, Dag.assign, [this.dead]]
        this.dead100 = [0, U.mois, Dag.assign, [this.dead]]
        this.live = [0, U.mois, Dag.input, []]
        this.liveherb = [0, U.mois, Dag.assign, [this.live]]
        this.livestem = [0, U.mois, Dag.assign, [this.live]]
        return this.nodes()
    }
    liveCategory() {
        this.dead = [0, U.mois, Dag.constant, []]
        this.dead1 = [  0, U.mois, Dag.input, []]
        this.dead10 = [ 0, U.mois, Dag.input, []]
        this.dead100 = [0, U.mois, Dag.input, []]
        this.live = [0, U.mois, Dag.input, []]
        this.live = [0, U.mois, Dag.input, []]
        this.liveherb = [0, U.mois, Dag.assign, [this.live]]
        this.livestem = [0, U.mois, Dag.assign, [this.live]]
        return this.nodes()
    }
}
