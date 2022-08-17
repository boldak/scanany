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
 * Security holding package.
 * @module fs
 * @see {@link https://www.npmjs.com/package/fs|fs - npm}
*/
const fs = require('fs');

/**
 * Pure javascript cross-platform module to extract texts from PDFs.
 * @module pdf-parse
 * @see {@link https://www.npmjs.com/package/pdf-parse|pdf-parse - npm}
*/
const pdf = require('pdf-parse');

let scraperInstance

/**
 * Gets info from PDF
 * @function _pdf
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const _pdf = async (command, context) => {
	
	let _path = path.resolve(scraperInstance.resolveValue(command.path, context))
	let buffer = fs.readFileSync(_path)
	
	let content =  await pdf(buffer)

	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$content"
	context = await scraperInstance.executeOnce({into}, context, content)	
	return context

}

/**
 * Request PDF info with value 
 * @function _pdf
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - contains path to PDF
*/
const pdf2js = async (command, context, value) => {
	let result = await pdf(value) 
	return result
}	


/**
 * @exports module - instance with {@link Scrapper} to get info from PDF
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access pdf module
		 * @memberof rules
		*/
		{
			name: ["pdf"],
			_execute: _pdf
		},
		/**
		 * rule to get the info from PDF file
		 * @memberof rules
		*/
		{
			name:["pdf->js","transform.pdf->js"],
			_execute: pdf2js 
		}

	]

}

