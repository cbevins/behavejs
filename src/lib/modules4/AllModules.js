import { Dag } from './Dag.js'
import { DagModule, NodeMap } from './DagItems.js'

import { CanopyModule } from './CanopyModule.js'
import { FireCellModule } from './FireCellModule.js'
import { FireEllipseModule } from './FireEllipseModule.js'
import { FirePointModule } from './FirePointModule.js'
import { FireVectorModule } from './FireVectorModule.js'
import { FuelCellModule } from './FuelCellModule.js'
import { FuelModelCatalogModule } from './FuelModelCatalogModule.js'
import { FuelMoistureModule } from './FuelMoistureModule.js'
import { MapModule } from './MapModule.js'
import { TerrainModule } from './TerrainModule.js'
import { WeightedFireModule } from './WeightedFireModule.js'
import { WeatherModule } from './WeatherModule.js'

export class AllModules {
    constructor(configs, root='root', name='Full Stack') {
        this.configs = configs
        this.name = name
        this.root = new DagModule(null, root)
        this._build()
        this.configure()
        this.dag = new Dag(NodeMap, name)
    }

    _build() {
        const root = this.root
        const configs = this.configs
        root.canopy = new CanopyModule(root, 'canopy', configs)
        root.ignition = new FirePointModule(root, 'ignition', configs)
        root.map = new MapModule(root, 'map', configs)
        root.moisture = new FuelMoistureModule(root, 'moisture', configs)
        root.terrain = new TerrainModule(root, 'terrain', configs)
        root.weather = new WeatherModule(root, 'weather', configs, root.terrain)

        const surface = root.surface = new DagModule(root, 'surface')
        const primary = surface.primary = new DagModule(surface, 'primary')
        primary.model = new DagModule(primary, 'model')
        primary.model.catalog = new FuelModelCatalogModule(primary.model, 'catalog',
            configs, root.moisture)
        // The following fuel domains are not yet implemented
        const custom = null
        const chaparral = null
        const palmetto = null
        const aspen = null

        primary.fuel = new FuelCellModule(primary, 'fuel', configs,
            primary.model.catalog, custom, chaparral, palmetto, aspen)
        primary.fire = new FireCellModule(primary, 'fire', configs,
            primary.fuel, root.weather, root.terrain, root.canopy)

        const secondary = surface.secondary = new DagModule(surface, 'secondary')
        secondary.model = new DagModule(secondary, 'model')
        secondary.model.catalog = new FuelModelCatalogModule(secondary.model, 'catalog',
            configs, root.moisture)
        secondary.fuel = new FuelCellModule(secondary, 'fuel', configs,
            secondary.model.catalog, custom, chaparral, palmetto, aspen)
        secondary.fire = new FireCellModule(secondary, 'fire', configs,
            secondary.fuel, root.weather, root.terrain, root.canopy)

        surface.weighted = new WeightedFireModule(surface, 'weighted', configs,
            primary.fire, secondary.fire)

        surface.ellipse = new FireEllipseModule(surface, 'ellipse', configs,
            surface.weighted, root.ignition, root.terrain, root.weather, root.map)
    }

    configure() {
        const root = this.root
        root.canopy.config()
        root.ignition.config()
        root.moisture.config()
        root.terrain.config()
        root.weather.config()

        root.surface.primary.model.catalog.config()
        root.surface.primary.fuel.config()
        root.surface.primary.fire.config()

        root.surface.secondary.model.catalog.config()
        root.surface.secondary.fuel.config()
        root.surface.secondary.fire.config()

        root.surface.weighted.config()
        root.surface.ellipse.config()
    }
}
