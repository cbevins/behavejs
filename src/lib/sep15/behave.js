import { BehaveModule } from "./BehaveModule.js"
const behave = new BehaveModule()
console.log(`Behave has ${behave.nodeMap.size} nodes`)
behave.configure()