/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { keys, isString, isArray, set, get, extend } = require("lodash")

/**
 * Fast, flexible & lean implementation of core jQuery designed specifically for the server.
 * @module cheerio
 * @see {@link https://cheerio.js.org/|Cheerio}
*/
const cheerio = require("cheerio")


let scraperInstance

/**
 * cheerio module engine, runs command
 * @function engineAxios
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const engineCheerio = async (command, context) => {
	context.$cheerio = cheerio
	
	command.apply = scraperInstance.resolveValue(command.apply, context)
	
	if(command.apply){
		context = await scraperInstance.executeOnce({apply:command.apply}, context)
	}
	delete context.$cheerio
	return context
}

/**
 * Gets info from DOM
 * @function load
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - object to load from
*/
const load = async (command, context, value) => {

	let content = (value) ? value: scraperInstance.resolveValue(command, context) || ""
	
	let result = {
		$: cheerio.load(content)
	}
	
	if (value) return result

	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$dom"
	context = await scraperInstance.executeOnce({into}, context, result)	
	return context	
}

/**
 * select specific info from DOM
 * @function once
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const once = async (command, context) => {
	
	let dom = 	scraperInstance.resolveValue(command, context) 
				|| 
				scraperInstance.resolveValue({$ref:"$dom"}, context)
	
	let selector = scraperInstance.resolveValue(command.select, context)
	
	let element = await dom.$(selector).get(0)
	element = extend({}, dom, dom.$(element))

	let apply = scraperInstance.resolveValue(command.apply)
	
	if(apply){
		await scraperInstance.executeOnce({map: apply}, context, element)
	}
	

	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$selection"
	context = await scraperInstance.executeOnce({into}, context, element)	
	return context

}

/**
 * select all the info from DOM
 * @function all
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const all = async (command, context) => {
	
	let dom = 	scraperInstance.resolveValue(command, context) 
				|| 
				scraperInstance.resolveValue({$ref:"$dom"}, context)
	
	let selector = scraperInstance.resolveValue(command.select, context)
	
	let result = []
	dom.$(selector).each((index, element) => {
		result.push(extend({}, dom, dom.$(element)))
	})
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$selection"
	context = await scraperInstance.executeOnce({into}, context, result)	
	return context
}

/**
 * select DOM node text
 * @function nodeText
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - node to load from
*/
const nodeText = (command, context, value) => value.text()

/**
 * select HTML node outer text
 * @function nodeHtml
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - node to load from
*/
const nodeHtml = (command, context, value) => {
	const outerHTML  = element => {
	    var index = element.index();
	    var parent = element.parent().clone();
	    var child = parent.children()[index];
	    parent.empty();
	    parent.append(child);
	    return parent.html();
	}
	return outerHTML(value)
}	

/**
 * select DOM node classes
 * @function nodeClasses
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - node to load from
*/
const nodeClasses = async (command, context, value) => {
	value = await value.attr("class")
	value = value.split(" ").filter(c => c)
	return value
}	

/**
 * select DOM node attributes
 * @function nodeAttributes
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - node to load from
*/
const nodeAttributes = async (command, context, value) => {
	
	if(isString(command) && command == "attributes"){
		command = keys(value['0'].attribs)
	} 

	command = (isArray(command)) ? command : [command]
	
	// console.log(command)
	
	let result = {}
	for( let i=0; i < command.length; i++){
		result[command[i]] = value.attr(command[i]) 
	}
	
	return result
}	


/**
 * @exports module - instance with {@link Scrapper} to get info from DOM
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access cheerio module
		 * @memberof rules
		*/
		{
			name: ["cheerio"],
			_execute: engineCheerio
		},
		/**
		 * rule to load info from DOM
		 * @memberof rules
		*/
		{
			name: ["load","html->page","html->$","transform.html->page","transform.html->$",
					"cheerio.load","cheerio.html->page","cheerio.html->$",
					"cheerio.transform.html->page","cheerio.transform.html->$"],
			_execute: load
		},
		/**
		 * rule to load specific info from DOM
		 * @memberof rules
		*/
		{
			name: ["once", "cheerio.once", "$.once"],
			_execute: once
		},
		/**
		 * rule to load all info from DOM
		 * @memberof rules
		*/
		{
			name: ["all", "cheerio.all", "$.all"],
			_execute: all
		},
		/**
		 * rule to select DOM node text
		 * @memberof rules
		*/
		{
			name:[
				"text",
				"$.text"
			],
			_execute: nodeText
		},
		/**
		 * rule to select HTML node outer text
		 * @memberof rules
		*/
		{
			name:[
				"html",
				"$.html"
			],
			_execute: nodeHtml
		},
		/**
		 * rule to select DOM node classes
		 * @memberof rules
		*/
		{
			name:[
				"class","classes",
				"$.class", "$.classes"
			],
			_execute: nodeClasses
		},
		/**
		 * rule to select DOM node attributes
		 * @memberof rules
		*/
		{
			name:[
				"attributes",
				"$.attributes"
			],
			_execute: nodeAttributes
		}

	]

}

