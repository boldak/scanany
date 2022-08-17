/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { keys, isString, isArray, set, get } = require("lodash")

/**
 * Promise based HTTP client for the browser and node.js
 * @module axios
 * @see {@link https://axios-http.com/|HHTP Client}
*/
const axios = require("axios")

let scraperInstance

/**
 * Axios module engine, runs command
 * @function engineAxios
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const engineAxios = async (command, context) => {
	let apply = scraperInstance.resolveValue(command.apply, context)
	if(apply){
		context = await scraperInstance.executeOnce({apply}, context)
	}
	return context
}

/**
 * Fetch the info
 * @function fetch
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const fetch = async (command, context) => {
	let request = scraperInstance.resolveValue(command.request, context)
	request = await scraperInstance.executeOnce({request}, context)
	
	let response = await axios(request)

	let transform = scraperInstance.resolveValue(command.transform, context)
	let result = response
	if(transform) {
		result = await scraperInstance.executeOnce({transform}, context, result)
	}
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$response"
	context = await scraperInstance.executeOnce({into}, context, result)	
	return context
}

/**
 * Send request for info
 * @function request
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const request = async (command, context) => {
	let props = keys(command)
	for(let i=0; i < props.length; i++){
		command[props[i]] = scraperInstance.resolveValue(command[props[i]], context)
	}
	return command
}

/**
 * @exports module - instance with {@link Scrapper} to get info from HTTP client or browser
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access axios module
		 * @memberof rules
		*/
		{
			name: ["axios"],
			_execute: engineAxios
		},
		/**
		 * rule to run {@link fetch}
		 * @memberof rules
		*/
		{
			name: ["fetch"],
			_execute: fetch
		},
		/**
		 * rule to run {@link request}
		 * @memberof rules
		*/
		{
			name: ["request"],
			_execute: request
		},
		

	]

}

