/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { keys, isString, isArray, set, get } = require("lodash")


let scraperInstance

/**
 * puppeteer module engine, run commands
 * @function puppeteer
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const puppeteer = async (command, context) => {
	/**
	 * Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
	 * @module puppeteer
	 * @see {@link https://www.npmjs.com/package/puppeteer|puppeteer - npm}
	*/
	context.$puppeteer = require("puppeteer")
	
	command.apply = scraperInstance.resolveValue(command.apply, context)
	
	if(command.apply){
		context = await scraperInstance.executeOnce({apply:command.apply}, context)
	}
	delete context.$puppeter
	return context
}

/**
 * launches the blowser
 * @function launch
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const launch = async (command, context) => {
	
	command._as = scraperInstance.resolveValue(command.as, context) || "$browser"
	let options = scraperInstance.resolveValue(command.options, context) || "$browser"
	
	let browser = await context.$puppeteer.launch(options)

	context = await scraperInstance.executeOnce({as:command._as}, context, browser)	
	return context
}

/**
 * opens new page in browser
 * @function newPage
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const newPage =  async (command, context) => {
	
	
	let browser = 	scraperInstance.resolveValue(command, context) 
					|| 
					scraperInstance.resolveValue({$ref:"$browser"}, context)
	
	let page = await browser.newPage(context.options)
	
	command._as = scraperInstance.resolveValue(command.as, context) || "$page"
	context = await scraperInstance.executeOnce({as:command._as}, context, page)	
	
	return context
}

/**
 * redirects to address
 * @function _goto
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const _goto = async (command, context) => {
	
	let page = 	scraperInstance.resolveValue(command, context) 
				|| 
				scraperInstance.resolveValue({$ref:"$page"}, context)
	
	let options = scraperInstance.resolveValue(command.options, context)
	let url = scraperInstance.resolveValue(command.url, context)
	await page.goto(url, options)
	return context

} 

/**
 * select specific info from page
 * @function once
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const once = async (command, context) => {
	
	let page = 	scraperInstance.resolveValue(command, context) 
				|| 
				scraperInstance.resolveValue({$ref:"$page"}, context)
	
	let selector = scraperInstance.resolveValue(command.select, context)
	await page.waitForSelector(selector)
	let selection = await page.$(selector)

	let apply = scraperInstance.resolveValue(command.apply)
	
	if(apply){
		await scraperInstance.executeOnce({map: apply}, context, selection)
	}
		
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$selection"
	context = await scraperInstance.executeOnce({into}, context, selection)	
	return context
}

/**
 * select all the info from page
 * @function all
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const all = async (command, context) => {
	
	let page = 	scraperInstance.resolveValue(command, context) 
				|| 
				scraperInstance.resolveValue({$ref:"$page"}, context)

	let selector = scraperInstance.resolveValue(command.select, context)
	await page.waitForSelector(selector)
	let selection = await page.$$(selector)	
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$selection"
	context = await scraperInstance.executeOnce({into}, context, selection)	
	
	return context
}


/**
 * close the page in browser
 * @function close
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const close = async (command, context) => {
	
	let instance = 	scraperInstance.resolveValue(command, context)
	// console.log(instance)
	await instance.close()
	// if(instance) {
	// 	await instance.close()
	// } else {
	// 	if(context.$page && !context.$page.isClosed()){
	// 		await context.$page.close()
	// 	}
	// 	await context.$browser.close()
	// }

	return context
}

/**
 * receive page url, title, content, metrics, cookies
 * @function pageUrl|pageTitle|pageContent|pageMetrics|pageCookies
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - page address
*/
const pageUrl = async (command, context, value) => await value.url()
const pageTitle = async (command, context, value) => await value.title()
const pageContent = async (command, context, value) => await value.content()
const pageMetrics = async (command, context, value) => await value.metrics()
const pageCookies = async (command, context, value) => await value.cookies()

/**
 * get node inner text | outer text
 * @function nodeText|nodeHtml
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - node name
*/
const nodeText = async (command, context, value) => await value.evaluate(n => n.textContent)
const nodeHtml = async (command, context, value) => await value.evaluate(n => n.outerHTML)

/**
 * get node classes
 * @function nodeClasses
 * @param {Object} command - command to execute
 * @param {string} context - path to context
 * @param {Object} value - node name
*/
const nodeClasses = async (command, context, value) => {
	value = await value.evaluate( n => n.className)
	value = value.split(" ").filter(c => c)
	return value
}	

/**
 * get node attributes
 * @function nodeAttributes
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const nodeAttributes = async (command, context, value) => {
	
	if(isString(command)){
		command = await value.evaluate( e => e.getAttributeNames())
	} 

	command = (isArray(command)) ? command : [command]
	let result = {}
	for( let i=0; i < command.length; i++){
		result[command[i]] = await value.evaluate( (n, name) => n.getAttribute(name), command[i] )
	}
	
	return result
}	


/**
 * @exports module - instance with {@link Scrapper} to get info from page in Chrome or Chromium browser
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to get page url
		 * @memberof rules
		*/
		{
			name: ["page.url"],
			_execute: pageUrl
		},
		/**
		 * rule to get page title
		 * @memberof rules
		*/
		{
			name: ["page.title"],
			_execute: pageTitle
		},
		/**
		 * rule to get page content
		 * @memberof rules
		*/
		{
			name: ["page.content"],
			_execute: pageContent
		},
		/**
		 * rule to get page metrics
		 * @memberof rules
		*/
		{
			name: ["page.metrics"],
			_execute: pageMetrics
		},
		/**
		 * rule to get page cookies
		 * @memberof rules
		*/
		{
			name: ["page.cookies"],
			_execute: pageCookies
		},
		/**
		 * puppeteer module engine
		 * @memberof rules
		*/
		{
			name: ["puppeteer"],
			_execute: puppeteer
		},
		/**
		 * rule to launch the browser
		 * @memberof rules
		*/
		{
			name: ["launch"],
			_execute: launch
		},
		/**
		 * rule to create new page in browser
		 * @memberof rules
		*/
		{
			name: ["new-page"],
			_execute: newPage
		},
		/**
		 * rule to redirect to address in browser
		 * @memberof rules
		*/
		{
			name: ["goto"],
			_execute: _goto
		},
		/**
		 * rule to select specific info from page in browser
		 * @memberof rules
		*/
		{
			name: ["once"],
			_execute: once
		},
		/**
		 * rule to select all the info from page in browser
		 * @memberof rules
		*/
		{
			name: ["all"],
			_execute: all
		},
		/**
		 * rule to close the page in browser
		 * @memberof rules
		*/
		{
			name: ["close", "puppeteer.close"],
			_execute: close
		},
		/**
		 * rule to select the inner text from node
		 * @memberof rules
		*/
		{
			name:[
				"text",
				"node.text"
			],
			_execute: nodeText
		},
		/**
		 * rule to select the outer text from node
		 * @memberof rules
		*/
		{
			name:[
				"html",
				"node.html"
			],
			_execute: nodeHtml
		},
		/**
		 * rule to select the classes of node
		 * @memberof rules
		*/
		{
			name:[
				"class","classes",
				"node.class", "node.classes"
			],
			_execute: nodeClasses
		},
		/**
		 * rule to select the attributes of node
		 * @memberof rules
		*/
		{
			name:[
				"attributes",
				"node.attributes"
			],
			_execute: nodeAttributes
		}

	]

}

