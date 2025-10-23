# Fire, Slope, and Wind Directions

slope.steep.degrees, ratio
slope.dir.aspect.fromNorth
slope.dir.upslope.fromNorth

wind.speed
wind.dir.origin.fromNorth
wind.dir.heading.fromNorth
wind.dir.heading.fromUpslope

## FireModule, RothermelFireModule, SurfaceFireModule
fire.dir
fire.dir.fromUpslope
fire.dir.fromNorth

fire.wind
fire.ignition

## FireEllipse
fire.head.dir.fromUpslope, fromNorth
fire.head.ros, flame, fli, scorch, mort, dist, x, y

fire.left.dir.fromUpslope, fromNorth
fire.left.ros, flame, fli, scorch, mort, dist, x, y

fire.right.dir.fromUpslope, fromNorth
fire.right.ros, flame, fli, scorch, mort, dist, x, y

fire.back.dir.fromUpslope, fromNorth
fire.back.ros, flame, fli, scorch, mort, dist, x, y

fire.vector.fromHead, fromNorth, fromUpslope

fire.vector.ignPt5.ros, fli, flame, scorch, mort, dist, x, y
fire.vector.ignPt6.ros, fli, flame, scorch, mort, dist, x, y
fire.vector.center.ros, fli, flame, scorch, mort, dist, x, y, mapDist, mapX, mapY

# FireCell
fire
    .cell
        .behavior
            .dir
                .fromUpslope*, .fromSlope*
            .ros*, .fli*, .flame*
        .fuel
            .bed (derived from fuel domain elements)
            .model (provided by each fuel domain)
                .depth*
                .dead
                    .mext*
                    .p1 ... p5
                        .load, .savr, .mois, .heat, .dens, .stot, .seff, .type, .life
                .live
                    .p1 ... p5
                        .load, .savr, .mois, .heat, .dens, .stot, .seff, .type, .life
            .moisture
                .dead
                .tl1*, .tl10*, .tl100*
                .live
        .slope
            .direction
                .aspect*, .upslope*
            .incline
                .degrees*, .ratio*
        .wind
            .midflame
                .speed*
                .reduction*
