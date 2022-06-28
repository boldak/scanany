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
const fs = require("fs")

/**
 * Mammoth .docx to HTML converter
 * @module mammoth
 * @see {@link https://www.npmjs.com/package/mammoth|mammoth - npm}
*/
const mammoth = require('mammoth')

let scraperInstance

/**
 * Gets info from .docx
 * @function docx
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const docx = async (command, context) => {
	
	let _path = path.resolve(scraperInstance.resolveValue(command.path, context))
	let buffer = fs.readFileSync(_path)
	let content =  mammoth.extractRawText({ buffer })

	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$content"
	context = await scraperInstance.executeOnce({into}, context, content)	
	return context

}

/**
 * Request .docx info with value 
 * @function docx2js
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - contains path to .docx
*/
const docx2js = async (command, context, value) => {
	let result = await mammoth.extractRawText({ buffer: value }) 
	return result
}	
		

/**
 * @exports module - instance with {@link Scrapper} to get info from .docx
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access docx module
		 * @memberof rules
		*/
		{
			name: ["docx"],
			_execute: docx
		},
		/**
		 * rule to get the info from .docx file
		 * @memberof rules
		*/
		{
			name:["docx->js","transform.docx->js"],
			_execute: docx2js
		}
	]

}

