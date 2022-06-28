/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { extend, isArray, keys, isString, get, isFunction, flatten, isObject } = require("lodash")

const corePlugin = require("./plugins/core-scanany-plugin")
const castPlugin = require("./plugins/cast-scanany-plugin")

/**
	* Object with plugin pares name:path
	* @constant {Object.<string, string>}
*/
const pluginsNames = {
	"cheerio-plugin"		: "./plugins/cheerio-scanany-plugin",
	"js-plugin"					: "./plugins/js-scanany-plugin",
	"pdf-plugin"				: "./plugins/pdf-scanany-plugin",
	"docx-plugin"				: "./plugins/docx-scanany-plugin",
	"xlsx-plugin"				: "./plugins/xlsx-scanany-plugin",
	"file-plugin"				: "./plugins/file-scanany-plugin",
	"mongodb-plugin"		: "./plugins/mongodb-scanany-plugin",
	"mysql-plugin"			: "./plugins/mysql-scanany-plugin",
	"transform-plugin"	: "./plugins/transform-scanany-plugin",
	"rss-plugin"				: "./plugins/rss-scanany-plugin",
	"puppeteer-plugin"	: "./plugins/puppeteer-scanany-plugin",
	"axios-plugin"			: "./plugins/axios-scanany-plugin",
	"core-plugin"				: "./plugins/core-scanany-plugin",
	"cast-plugin"				: "./plugins/cast-scanany-plugin"
}

/**
 * Resolve path to plugin
 * @function resolvePluginPath
 * @param {string} plugin - plugin name
 * @return {string} - path to plugin
 * @default {string} plugin - plugin name
*/
const resolvePluginPath = plugin => pluginsNames[plugin] || plugin

/**
 * Class representing the Scrapper
 * @class Scraper
 * @property {array} plugins - private plugins
 * @property {array} rules - private named exacution rules
 * @property {array} commandPath - private command pathes
*/
const Scraper = class {
	/** Scrapper private fields */
	#plugins
	#rules
	#commandPath

	/**
	 * Create a Scrapper
	 * @constructor
	 * @memberof Scraper
	*/
	constructor(){
		this.#plugins = []
		/** register the rule with name and execution function */
		this.#rules = [
			{
				name:["use","core.use"],
				_execute: async (command, context) => {
					command = (isArray(command)) ? command : [command]
					this.use(command)
					return context
				}
			}
		]
		this.use([
			"core-plugin",
			"cast-plugin"
		])
	}

	/**
	 * Add plugin to Scrapper
	 * @memberof Scraper
	 * @method use
	 * @param {string|string[]} plugins - to add plugin names
	*/
	use(plugins){
		/** if plugins is not array -> create array from it */
		plugins = (isArray(plugins)) ? plugins : [plugins]
		plugins.forEach( plugin => {
			/**
			 * Resolve path to received plugins
			 * see resolvePluginPath
			*/
			plugin = resolvePluginPath(plugin)
			/** if current received plugin doesn't exist -> add it to private plugins property and register in {@link Scrapper} */
			if(!this.#plugins.includes(plugin)) {
				this.#plugins.push(plugin)
				this.register(require(plugin))
			}	
		})
	}

	/**
	 * Register plugin in Scrapper
	 * @memberof Scraper
	 * @method register
	 * @param {string|string[]} plugins - plugin names to register plugins
	*/
	register(plugins){
		/** if plugins is not array -> create array from it */
		plugins = (isArray(plugins)) ? plugins : [plugins]
		/** register each pligin in instance of {@link Scrapper} */
		plugins.forEach( plugin => {
			if (plugin.register) plugin.register(this)
			this.#rules = this.#rules.concat(plugin.rules || [])	
		})
	}

	/**
	 * get value from row paran in context in Scrapper
	 * @memberof Scraper
	 * @method resolveValue
	 * @param {Object} raw - contains value to resolve
	 * @param {string} context - path to context
	*/
	resolveValue(raw, context){
		if(!raw) return
		if(raw.$ref) {
			return get(context, raw.$ref)
		}
		if(raw.$const) {
			return raw.$const
		}
		return raw 
	}

	/**
	 * in Scrapper
	 * @memberof Scraper
	 * @method executeOnce
	 * @param {Object} command - command to execute
	 * @param {string|string[]} context - path to context
	 * @param {Object} sender - currently used plugin
	 * @throws {Error}
	*/
	async executeOnce(command, context, sender){
		
		command = this.resolveValue(command, context)
		
		let commandName = (isString(command)) ? command : keys(command)[0]
		command = (isString(command)) ? command : command[commandName]
		// console.log(commandName)
		
		/** choose only needed rules */
		let executor = this.#rules.filter(rule => rule.name.includes(commandName))
		/**
		 * check if executor doesn't have more than one value
		 * @throws {Error} - (if false) that can't be more than one value 
		*/
		if( executor.length < 2){
			executor = executor[0]
		} else {
			throw new Error(`Multiple determination of "${commandName}". Command aliases (${flatten(executor.map( e => e.name)).join(", ")}) required.`)
		}

		/**
		 * check if executor exists
		 * @throws {Error} - (if false) that command were not implemented
		*/
		if(executor){
			/**
			 * check if executor is not a function
			 * @throws {Error} - (if false) that _execute command were not implemented
			*/
			if(!isFunction(executor)){
				if(executor._execute){
					executor = executor._execute
				} else {
					throw new Error(`"${commandPath.join(".")}._execute" command not implemented`)		
				}
			}

			let ctx = await executor(command, context, sender)
			context = (isObject(ctx)) ? (!isArray) ? Object.assign({}, context, ctx) : ctx : ctx
			return context	
		} else {
			throw new Error(`"${commandName}" command not implemented`)
		}
	}

	/**
	 * execute commands from plugins in Scrapper
	 * @memberof Scraper
	 * @method execute
	 * @param {Object|Object[]} script - has commands to execute
	 * @param {string} context - path to context
	*/
	async execute(script, context){
		script = (isArray(script)) ? script : [script]
		context = context || {}
		this.#commandPath = []
		for (let i = 0; i < script.length; i++) {
			let ctx = await this.executeOnce(script[i], context)
			context = (ctx) ? ctx : context // extend({}, context, ctx) 
		}
		return context
	}

}

/**
 * @exports Scraper
*/
module.exports = Scraper