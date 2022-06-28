/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { keys, isString, isArray, set, get } = require("lodash")
const _ = require("lodash")

/**
 * A JavaScript date library for parsing, validating, manipulating, and formatting dates.
 * @module moment
 * @see {@link https://www.npmjs.com/package/moment|moment - npm}
*/
const moment = require("moment")

let scraperInstance


// var vm = require("vm");
// let _ = require("lodash");
// let moment = require("moment")


// var execute = function(scraperInstance, js, context, value){
//             const sandbox = {}
//             sandbox.$context = context
//             sandbox._ = _;
//             sandbox.moment = moment
//             sandbox.Buffer = Buffer
//             sandbox.atob = require("atob")
//             sandbox.btoa = require("btoa")
//             sandbox.decodeURIComponent = decodeURIComponent
//             sandbox.encodeURIComponent = encodeURIComponent
//             sandbox.Promise = Promise
//          	sandbox.$scraperInstance = scraperInstance
//          	sandbox.$value = value
         	   
//             const script = new vm.Script(js);
//             const context = new vm.createContext(sandbox);
//             script.runInContext(context);
// }



/**
 * running script from String
 * @function engineJs
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - contains path to script
*/
const engineJs = async (command, context, value) => {
	let script = scraperInstance.resolveValue(command, context)
	
	if (script) {
		let rule = eval(`(${script})`)
		context = await rule(command, context, value)
	}
	return context
}


/**
 * @exports module - instance with {@link Scrapper} to run script from String
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to run script from String
		 * @memberof rules
		*/
		{
			name: ["js"],
			_execute: engineJs
		}
	]

}

