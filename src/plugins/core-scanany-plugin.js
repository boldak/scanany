/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { get, set, isString, isArray, extend } = require("lodash")
const _ = require("lodash")

/**
 * Recursive object extending.
 * @module deep-extend
 * @see {@link https://www.npmjs.com/package/deep-extend|deep-extend - npm}
*/
const deepExtend = require("deep-extend")


let scraperInstance

/**
 * @exports module - instance with {@link Scrapper}
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules: [

		/**
		 * logging rule
		 * @memberof rules
		*/
		{
			name:["log"],
			_execute: async (command, context) => {

				command = (isArray(command)) ? command : [command]
				let values = []
				
				for( let i=0; i < command.length; i++ ){
					let value = scraperInstance.resolveValue(command[i], context)
					if( command[i].transform){
						let transform = scraperInstance.resolveValue(command[i].transform)
						value = await scraperInstance.executeOnce({transform:command[i].transform}, context, value)
					}
					values.push(value)	
				}
				
				console.log(...values)
				return context
			}
		},

		/**
		 * mapping rule
		 * @memberof rules
		*/
		{
			name:[
				"map",
				"core.map"
			],

			_execute: async (command, context, _value) => {
				
				command = (isArray(command)) ? command : [command] 
				
				for( let i=0; i<command.length; i++){
					
					let value = (command[i].$ref || command[i].$const) 
									? scraperInstance.resolveValue(command[i], context) 
									: _value
					
					if( command[i].transform){
						let transform = scraperInstance.resolveValue(command[i].transform)
						value = await scraperInstance.executeOnce({transform}, context, value)
					}
					let into = scraperInstance.resolveValue(command[i].into, context)
					await scraperInstance.executeOnce( {into}, context, value)
				}
				return context

			}
		},

		/**
		 * Scrapper transforming rule
		 * @memberof rules
		*/
		{
			name:[
				"transform",
				"core.transform"
			],

			_execute: async (command, context, value) => {
				
				const __executeApply = async (command, context, value) => {

					if(isString(command)){
						value = await scraperInstance.executeOnce(command, context, value)
					} else if (!command.apply){
						command.apply = command
					} 

					if(command.apply){
						let apply = scraperInstance.resolveValue(command.apply, value)
						apply = (isArray(apply)) ? apply : [apply]
					
						for(let i=0; i< apply.length; i++){
							value = await scraperInstance.executeOnce(apply[i], context, value)
						}
					} else if (command.$ref){
						command = scraperInstance.resolveValue(command, context)
						return __executeApply(command, context, value)
					}
					return value	
				}

				const res = await __executeApply(command, context, value) 
				return res
			}	
		},

		/**
		 * value returning rule
		 * @memberof rules
		*/
		{
			name: [
				"return",
				"core.return"
			],
			
			_execute: async (command, context) => {
				context = get(context, command)	
				return context
			}
		},

		/**
		 * setting rules "as", "info"
		 * @memberof rules
		*/
		{
			name: [
				"as",
				"into",
				"core.into"
			],

			_execute: async (command, context, value) => {
				set( context, command, value)
				return context
			}
		},

		/**
		 * executive rule "apply"
		 * @memberof rules
		*/
		{
			name:["apply"],
			_execute: async (command, context, value) => {
				
				command = (isArray(command)) ? command : [command]
				
				for(let i=0; i< command.length; i++){
					context = await scraperInstance.executeOnce(command[i], context, value)
				}

				return context
			}	
				
		},

		/**
		 * looping throuhg commands for execution
		 * @memberof rules
		*/
		{
			name: [
				"each",
				"core.each"
			],

			_execute: async (command, context) => {
				command.in = scraperInstance.resolveValue(command.in, context)
				command.as = scraperInstance.resolveValue(command.as, context) || "$item"
				command["indexed-by"] = scraperInstance.resolveValue(command["indexed-by"], context) || "$indexedBy"
				command.apply = scraperInstance.resolveValue(command.apply, context)				
				command.into = scraperInstance.resolveValue(command.into, context)

				let collection = command.in //await scraperInstance.executeOnce({in:command.in}, context)
				collection = (isArray(collection)) ? collection : [collection]
				
				command.apply = (isArray(command.apply)) ? command.apply : [command.apply]
				let mapped = []					
				
				for(let j=0; j < collection.length; j++){
					let item = collection[j]
					let value = {}
					for(let i=0; i< command.apply.length; i++){
						context[command.as] = item
						context[command["indexed-by"]] = j
						value = await scraperInstance.executeOnce(command.apply[i], context)
					}
					value = deepExtend({}, value)
					mapped.push(value)
					delete context.$item
					delete context.$index
				}
				if(command.into){
					context = await scraperInstance.executeOnce({into:command.into}, context, mapped)
				}
				
				return context
			}
		}
	]
}