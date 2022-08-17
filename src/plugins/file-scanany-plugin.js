/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { extend } = require("lodash")

/**
 * Security holding package.
 * @module fs
 * @see {@link https://www.npmjs.com/package/fs|fs - npm}
*/
const fs = require("fs")

/**
 * This is an exact copy of the NodeJS ’path’ module published to the NPM registry.
 * @module path
 * @see {@link https://www.npmjs.com/package/path|path - npm}
*/
const path = require("path")

let scraperInstance

/**
 * Gets info from file
 * @function file
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const file = async (command, context) => {
	
	let _path = path.resolve(scraperInstance.resolveValue(command.path, context))

	let content =  fs.readFileSync(_path)

	let transform = scraperInstance.resolveValue(command.transform, context)
	let result = content
	
	if(transform) {
		result = await scraperInstance.executeOnce({transform}, context, result)
	}
	

	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$content"
	context = await scraperInstance.executeOnce({into}, context, result)	
	return context

}


/**
 * @exports module - instance with {@link Scrapper} to get info from file
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to get the info from the file
		 * @memberof rules
		*/
		{
			name: ["file"],
			_execute: file
		}
	]

}

