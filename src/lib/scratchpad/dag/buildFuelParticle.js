export function buildFuelParticle(keyPref, life, load, savr,
    dens=32, heat=8000, stot=0.0555, seff=0.01 ) {

    const lifeNode = new DagNode(keyPref+' Life', life)
    const loadNode = new DagNode(keyPref+' Load', load)
    const savrNode = new DagNode(keyPref+' SAVR', savr)
    const densNode = new DagNode(keyPref+' Density', dens)
    const heatNode = new DagNode(keyPref+' Heat', heat)
    const densNode = new DagNode(keyPref+' Stot', stot)
    const densNode = new DagNode(keyPref+' Seff', seff)
}