import {Ehn, Savr} from './Variants.js'

/*******************************************************************************
 * Creating a variant with a constant value.
 * 
 * An example is assigning values to standard fuel model parameters.
 * 
 * Simply create the variant with the {value} prop set to the constant value.
 */
console.log('Case 1: Creating a Variant with Constant Value')
const standardSavr = new Savr('Standard Fuel Model Dead 1-h SAVR', 1234)
console.log(`- ${standardSavr.desc} initialized value is`, standardSavr.value)
standardSavr.logEdges()

/*******************************************************************************
 * Creating a variant whose value depends upon another variant
 * 
 * An example is effective heating coefficient, which depends on SAVR.
 * 
 * Create the variant with the {inputs} prop set to an array of references
 * to the required input variants.
 * NOTE THAT THE ORDER OF THE REFERENCES IS IMPORTANT!!
*/
console.log('\nCase 2: Creating a Variant whose value depends upon another Variant:')
const standardEhn = new Ehn('Standard Fuel Model Dead 1-h EHN', standardSavr)
standardSavr.logEdges()
standardEhn.logEdges()
console.log(`- ${standardEhn.desc} default value is`, standardEhn.value)
console.log(`- ${standardSavr.desc} current value is`, standardSavr.value)
standardEhn.update()
console.log(`- ${standardEhn.desc} updated value is`, standardEhn.value)

/*******************************************************************************
 * Linking a variant value to client input
 * 
 * An example is linking the primary surface fuel dead 1-h SAVR
 * to input from a client doing fuel modeling.
 */
console.log('\nCase: Linking a Variant Value to Client Input:')

// First, declare a variable to hold the input value and a method that returns that value:
let inputSavr = 2000
function getInputSavr() { return inputSavr }
const inputDesc = 'Input Dead 1-h SAVR'

// Second, create the dependent variant with a new update() method as follows:
const primarySavr = new Savr('Primary Surface Fuel Dead 1-h SAVR', 1234)
primarySavr.update = function () {primarySavr.set(getInputSavr())}
console.log(`- ${primarySavr.desc} default value is`, primarySavr.value)

// Now when update() is invoked, the variant's value is set to the input value
console.log(`- ${inputDesc} value is`, inputSavr)
primarySavr.update()
console.log(`- ${primarySavr.desc} update() value is now`, primarySavr.value)

// We can proceed to change the input value, and then update the varian'ts value:
inputSavr = 3000
console.log(`- ${inputDesc} input value changed to`, inputSavr)
primarySavr.update()
console.log(`- ${primarySavr.desc} update() value is now`, primarySavr.value)

/*******************************************************************************
 * Linking a variant value to the value of another (variable or constant) variant.
 * 
 * An example is linking the primary surface fuel dead 1-h SAVR
 * to the value from a standard fuel model.
 */
console.log('\nCase: Linking a Variant Value to Another Variant`s Value:')

// We already have a primary surface fuel dead 1-h SAVR,
// so just change its update() method to fetch the standard fuel model's value
primarySavr.update = function () {primarySavr.set(standardSavr.value)}
// and add to each others input and consumers array
// primarySavr.inputs = [standardSavr]
// standardSavr.consumers = [primarySavr]
console.log(`- ${primarySavr.desc} current value is`, primarySavr.value)
primarySavr.update()
console.log(`- ${primarySavr.desc} current updated linked value is`, primarySavr.value)
