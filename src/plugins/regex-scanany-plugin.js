const { keys, isString, isArray, set, get, extend } = require("lodash")
const cheerio = require("cheerio")


let scraperInstance


const engineCheerio = async (command, context) => {
	context.$cheerio = cheerio
	
	command.apply = scraperInstance.resolveValue(command.apply, context)
	
	if(command.apply){
		context = await scraperInstance.executeOnce({apply:command.apply}, context)
	}
	delete context.$cheerio
	return context
}

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


const nodeText = (command, context, value) => value.text()
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

const nodeClasses = async (command, context, value) => {
	value = await value.attr("class")
	value = value.split(" ").filter(c => c)
	return value
}	

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



module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		{
			name: ["cheerio"],
			_execute: engineCheerio
		},
		{
			name: ["load","html->page","html->$","transform.html->page","transform.html->$",
					"cheerio.load","cheerio.html->page","cheerio.html->$",
					"cheerio.transform.html->page","cheerio.transform.html->$"],
			_execute: load
		},
		{
			name: ["once", "cheerio.once", "$.once"],
			_execute: once
		},
		{
			name: ["all", "cheerio.all", "$.all"],
			_execute: all
		},
		{
			name:[
				"text",
				"$.text"
			],
			_execute: nodeText
		},

		{
			name:[
				"html",
				"$.html"
			],
			_execute: nodeHtml
		},

		{
			name:[
				"class","classes",
				"$.class", "$.classes"
			],
			_execute: nodeClasses
		},

		{
			name:[
				"attributes",
				"$.attributes"
			],
			_execute: nodeAttributes
		}

	]

}

