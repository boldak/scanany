/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { extend } = require("lodash")

/**
 * This is an exact copy of the NodeJS ’path’ module published to the NPM registry.
 * @module path
 * @see {@link https://www.npmjs.com/package/path|path - npm}
*/
const path = require("path")

/**
 * Straightforward excel file parser and builder.
 * @module xlsx
 * @see {@link https://www.npmjs.com/package/node-xlsx|node-xlsx - npm}
*/
const xlsx = require('node-xlsx').default

let scraperInstance

/**
 * Gets info from .xlsx file
 * @function _xlsx
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const _xlsx = async (command, context) => {
	
	let _path = path.resolve(scraperInstance.resolveValue(command.path, context))

	const jsonOpts = {
	  header: 1,
	  defval: '',
	  blankrows: true,
	  raw: false,
	  dateNF: 'd"/"m"/"yyyy' // <--- need dateNF in sheet_to_json options (note the escape chars)
	}

	let content =  xlsx.parse(_path, jsonOpts)

	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$content"
	context = await scraperInstance.executeOnce({into}, context, content)	
	return context

}

/**
 * Request .xlsx info with value 
 * @function xlsx2js
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - contains path to PDF
*/
const xlsx2js = async (command, context, value) => {
	const jsonOpts = {
	  header: 1,
	  defval: '',
	  blankrows: true,
	  raw: false,
	  dateNF: 'd"/"m"/"yyyy' // <--- need dateNF in sheet_to_json options (note the escape chars)
	}
	
	let result = xlsx.parse(value, jsonOpts) 
	return result
}	


/**
 * @exports module - instance with {@link Scrapper} to get info from .xlsx file
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access xlsx module
		 * @memberof rules
		*/
		{
			name: ["xlsx"],
			_execute: _xlsx
		},
		/**
		 * rule to get the info from .xlsx file
		 * @memberof rules
		*/
		{
			name:["xlsx->js","transform.xlsx->js"],
			_execute: xlsx2js 
		}
	]

}

