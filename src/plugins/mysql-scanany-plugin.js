/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { extend } = require("lodash")

/**
 * MySQL client for Node.js with focus on performance.
 * @module mysql2
 * @see {@link https://www.npmjs.com/package/mysql2|mysql2 - npm}
*/
const mysql = require('mysql2/promise')

let scraperInstance

/**
 * MySql module engine to create pool and receive info
 * @function engineMysql
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const engineMysql = async (command, context) => {
	
	let options = scraperInstance.resolveValue(command.options, context)
	/** create a pool */
	let pool  = await mysql.createPool(options)
	
	context.$pool = pool

	let apply = scraperInstance.resolveValue(command.apply, context)
	if(apply){
		context = await scraperInstance.executeOnce({apply}, context)
	}
	pool.end()

	delete context.$pool
	return context

}

/**
 * executive function of MySql module, collects info
 * @function execute
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const execute = async (command, context) => {
	
	let sql = scraperInstance.resolveValue(command.sql, context)
	let options = scraperInstance.resolveValue(command.options, context)
	
	let [response] = await context.$pool.execute(extend({sql}, options))
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$response"
	context = await scraperInstance.executeOnce({into}, context, response)	
	return context
}

/**
 * @exports module - instance with {@link Scrapper} to get info from MySql
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access mysql module
		 * @memberof rules
		*/
		{
			name: ["mysql"],
			_execute: engineMysql
		},
		/**
		 * rule to run {@link execute}
		 * @memberof rules
		*/
		{
			name: ["execute"],
			_execute: execute
		}

	]

}

