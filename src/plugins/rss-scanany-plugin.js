/**
 * A small library for turning RSS XML feeds into JavaScript objects.
 * @module rss-parser
 * @see {@link https://www.npmjs.com/package/rss-parser|rss-parser - npm}
*/
const Parser = require('rss-parser')

let scraperInstance

/**
 * convert RSS XML info to js
 * @function rss
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const rss = async (command, context) => {
	let options = scraperInstance.resolveValue(command.options, context)
	let parser = (options) ? new Parser(options) : new Parser()
	let url = scraperInstance.resolveValue(command.url, context)				
	let feed = await parser.parseURL(url)				
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$feed"
	context = await scraperInstance.executeOnce({into}, context, feed)	
	return context
}

/**
 * Request converting RSS XML info to js with value 
 * @function transform
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - contains path to PDF
*/
const transform = async (command, context, value) => {
	let parser = new Parser()
	let result = await parser.parseString(value)				
	return result
}	


/**
 * @exports module - instance with {@link Scrapper} to convert RSS XML info to js
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access rss module
		 * @memberof rules
		*/
		{
			name: ["rss"],
			_execute: rss
		},
		/**
		 * rule to get the info from RSS XML and convert it to js
		 * @memberof rules
		*/
		{
			name:["rss->js","transform.rss->js"],
			_execute: transform
		}
	]

}

