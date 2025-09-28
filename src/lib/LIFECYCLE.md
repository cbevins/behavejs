# Wildland Fire Modeling System for Javascipt Life Cycle

## NOTES

## System Definition Phase

### 1 - Defining Available Configuration Parameters

Each `*Config.js` file defines a class representing a single WFMS **configuration** parameter.
    - unique string `key`,
    - array of possible `options`,
    - the `value` of its currently active option,
    - documentary `prompt`, array of option `prompts`, and usage `notes`, and
    - member variables defining each option's unique string key.

### 2 - Defining Available Modules and Their Nodes

Each `*.Module.js` file defines a class containing an `nodes` array of *node definitions*.
Each node definition consists of:
    - a unique string `key`,
    - a default `value`,
    - a `units` reference,
    - a `config` reference (see '1' above), and
    - an array of 1 or more *updater* `options`, one for each of the `config` options.
Each updater option is an array of:
    - the configuration instance key string that activates that option,
    - a reference to the `updater` method that is invoked to update the node value, and
    - an array of `supplier` keys that are provided as arguments to the `updater` method.

To this point in the life cycle, all nodes are identified by the unique string `key`,
so we don't have to deal with object instantiation order and dependency during the
definition phase.

## System Construction Phase

### 1 - Constructing the System Configuration Object

`WfmsConfig.js` class creates `config` object by instantiating the various
`*Config` classes of interest and arranging them into some convenient
hierarchical object structure.

### 2 - Constructing the System Node Definition Array

`WfmsModule.js` class instantiates the various `*Module` classes of interest,
passing each class a required references to its configuration objects.
It then catenates the module node definitions into a single `nodeDefs` array.

### 3 - Constructing the System Directed Acyclical Graph

`Wfms.js` class is the base class of the system. It:
- creates a `WfmsConfig` instance and stores a copy of the config object;
- creates a `WfmsModule` instance, passing it the configuration instance
- creates a `Dag` instance, passing it the WfmsModule.nodeDefs array.

The WFms has only only 2 props; `config` and `dag`.

`Dag.js` construction performs the following construction tasks:
1. converts each `nodeDef` array into a `node` object and stores it in its `nodeMap`;
2. resolves each node's option `supplier` keys into node references; and
3. calls `Dag.configure()`(see  below).

The code for all the above looks like this:
```
const wfms = new Wfms('My WFMS')
```

At this point the WFMS has a default configuration, nodes with default values
(usually 0, 1, or ''), and  no *selected* nodes.  Its time for the...

## System Customization Phase

### 1 - Set the Configuration as Desired

The client will usually need to change the configuration.  This can be done like:
```
const wfms = new Wfms('My Wfms')
const {surface} = wfms.config
surface.weighting.value = surface.weighting.primary
...
wfms.configure()
```
While you may change the `wfms.config` object as much as you like, it will not have any
effect until `wfms.configure()` is called.

`wfms.configure()` performs the following tasks:

1. Each node's props are initialized to: `updater`=null, `suppliers`=[], `consumers`=[].

2. Each node's configuration reference (if any) is used to select its current active
`updater` option.  (If no config reference, the first option is applied). Once determined:
- the node's active `cfgval` is stored;
- the node's `updater` is set to the option's `updater`;
- the node's `suppliers` are set to the option's `suppliers`; and
- the node adds itself to each suppliers `consumers` array. 

3. The set of all possible inputs under this configuration is determined
and stored in `Dag.allInputsSet`

### 2 - Select Output Node of Interest

The DAG maintains a Set() of all the currently selected nodes.
The `Dag.selectSet` is initially empty, and is modified by the following methods:

1. `Dag.select(node, ...)` adds the specified node(s) to the `Dag.selectSet`
and then calls `Dag._addSelect` on each one (see below).

2. `Dag.unselect(node, ...)` removes the specified node(s) from the `Dag.selectSet`
and then calls `Dag._reselect()`.

3. `Dag.clearSelect()` clears the `Dag.selectSet` then calls `Dag._reselect()`

4. `Dag._reselect()` is a private method that:
- sets each node's `status`='IGNORED' and `dirty`=*true*, and;
- calls `Dag._selectNode()` for each node in the `Dag.selectSet` (see above).

5. `Dag._selectNode()` is a private method that sets the node's status='LEAF',
then traverses all its `suppliers` nodes in depth-first-search order.
If the supplier `status` is:
- 'IGNORED', it is set to 'ACTIVE' and traversal continues to next level;
- 'ACTIVE' or 'SELECTED', traversal returns to the previous level;
- 'LEAF', it is set to 'SELECTED' and returns to previous level.

### 3 - Determining Active Input Nodes
