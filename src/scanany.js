const { extend, isArray, keys, isString, get, isFunction, flatten, isObject } = require("lodash")
const { installPackage } = require ('@antfu/install-pkg')
const axios = require("axios")
const fs = require("fs")
const fse = require("fs-extra")
const path = require("path")

const corePlugin = require("./plugins/core-scanany-plugin")
const castPlugin = require("./plugins/cast-scanany-plugin")

const pluginsNames = {
	"cheerio-plugin"		: "./plugins/cheerio-scanany-plugin",
	"js-plugin"				: "./plugins/js-scanany-plugin",
	"pdf-plugin"			: "./plugins/pdf-scanany-plugin",
	"docx-plugin"			: "./plugins/docx-scanany-plugin",
	"xlsx-plugin"			: "./plugins/xlsx-scanany-plugin",
	"file-plugin"			: "./plugins/file-scanany-plugin",
	"mongodb-plugin"		: "./plugins/mongodb-scanany-plugin",
	"mysql-plugin"			: "./plugins/mysql-scanany-plugin",
	"transform-plugin"		: "./plugins/transform-scanany-plugin",
	"rss-plugin"			: "./plugins/rss-scanany-plugin",
	"puppeteer-plugin"		: "./plugins/puppeteer-scanany-plugin",
	"axios-plugin"			: "./plugins/axios-scanany-plugin",
	"core-plugin"			: "./plugins/core-scanany-plugin",
	"cast-plugin"			: "./plugins/cast-scanany-plugin",
	"regex-plugin"			: "./plugins/regex-scanany-plugin",

}

const resolvePluginPath = plugin => pluginsNames[plugin] || plugin

const Scraper = class {
	#plugins
	#rules
	#commandPath

	constructor(){
		this.#plugins = []
		this.#rules = [
			{
				name:["use","core.use"],
				_execute: async (command, context) => {
					command = (isArray(command)) ? command : [command]
					await this.use(command)
					return context
				}
			},
			{
				name:["install","core.install"],
				_execute: async (command, context) => {
					command = (isArray(command)) ? command : [command]
					await this.install(command)
					return context
				}
			},

		]
		this.use([
			"core-plugin",
			"cast-plugin"
		])
	}

	async use(plugins){
		try {
			
			plugins = (isArray(plugins)) ? plugins : [plugins]
			
			for( let i=0; i < plugins.length; i++){
				let plugin = plugins[i]
				
				if (plugin.url){
					
					plugin.as = plugin.as || "external-plugin"

					if (plugin.noCache || !fse.pathExistsSync(`./plugin-cache/${plugin.as}.js`)) {
						let response = await axios.get(plugin.url)
						fs.writeFileSync(path.resolve(`./plugin-cache/${plugin.as}.js`), response.data)
					}
					
					plugin = path.resolve(`./plugin-cache/${plugin.as}.js`)
				}

				plugin = resolvePluginPath(plugin)
				if(!this.#plugins.includes(plugin)) {
					this.#plugins.push(plugin)
					this.register(require(plugin))
				} 

			}

		} catch(e) {
			console.log(e.toString())
			throw e
		}	
	}

	async install(urls){
		console.log("Install", urls)
		urls = (isArray(urls)) ? urls : [urls]
		
		for( let i = 0; i < urls.length; i++){
			let url = urls[i]
			try {
				await installPackage(url, { silent: true })
			} catch(e) {
				console.log(`Cannot install package ${url}. ${e.toString()}`)
				throw e
			}
		}
	}


	register(plugins){
		plugins = (isArray(plugins)) ? plugins : [plugins]
		plugins.forEach( plugin => {
			if(plugin.register) plugin.register(this)
			this.#rules = this.#rules.concat(plugin.rules || [])	
		})
	}

	resolveValue(raw, context){
		if(!raw) return
		if(raw.$ref) {
			return get(context, raw.$ref)
		}
		if(raw.$const) {
			return raw.$const
		}
		return raw 
	}

	async executeOnce(command, context, sender){
		
		command = this.resolveValue(command, context)
		
		let commandName = (isString(command)) ? command : keys(command)[0]
		command = (isString(command)) ? command : command[commandName]
		// console.log(commandName)
		
		let executor = this.#rules.filter(rule => rule.name.includes(commandName))
		if( executor.length < 2){
			executor = executor[0]
		} else {
			throw new Error(`Multiple determination of "${commandName}". Command aliases (${flatten(executor.map( e => e.name)).join(", ")}) required.`)
		}

		if(executor){
			if(!isFunction(executor)){
				if(executor._execute){
					executor = executor._execute
				} else {
					throw new Error(`"${commandPath.join(".")}._execute" command not implemented`)		
				}
			}

			let ctx = await executor(command, context, sender)
			context = (isObject(ctx)) ? (!isArray) ? Object.assign({}, context, ctx) : ctx : ctx
			return context	
		} else {
			throw new Error(`"${commandName}" command not implemented`)
		}
	}

	async execute(script, context){
		script = (isArray(script)) ? script : [script]
		context = context || {}
		this.#commandPath = []
		for( let i=0; i<script.length; i++){
			let ctx = await this.executeOnce(script[i], context)
			context = (ctx) ? ctx : context // extend({}, context, ctx) 
		}
		return context
	}

}


module.exports = Scraper