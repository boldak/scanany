/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { extend } = require("lodash")

/**
 * The official MongoDB driver for Node.js.
 * @module mongodb
 * @see {@link https://www.npmjs.com/package/mongodb|mongodb - npm}
*/
const mongo = require('mongodb').MongoClient

let scraperInstance

/**
 * MongoDB module engine to create client and receive info
 * @function engineMongo
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const engineMongo = async (command, context) => {
	
	let options = 	scraperInstance.resolveValue(command.options, context) || {}
	let uri = options.uri

	options = extend({
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, options
    )

    delete options.uri 
	
	let client  = await mongo.connect(uri, options)
	
	context.$client = client

	let apply = scraperInstance.resolveValue(command.apply, context)
	if(apply){
		context = await scraperInstance.executeOnce({apply}, context)
	}

	await client.close()

	delete context.$client

	return context

}

/**
 * MongoDB module function, collects info
 * @function listCollections
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const listCollections = async (command, context) => {
	
	let db = scraperInstance.resolveValue(command.db, context)
	
	let response = await context.$client.db(db).listCollections().toArray()
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$response"
	context = await scraperInstance.executeOnce({into}, context, response)	
	return context

}

/**
 * MongoDB module function, aggregates info
 * @function aggregate
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const aggregate = async (command, context) => {
	
	let _db = scraperInstance.resolveValue(command.db, context)
	let _collection = scraperInstance.resolveValue(command.collection, context)
	let _query = scraperInstance.resolveValue(command.query, context)
	
	let db = await context.$client.db(_db)
    let collection = await db.collection(_collection)
  	
	let response = await collection.aggregate(_query).toArray() 
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$response"
	context = await scraperInstance.executeOnce({into}, context, response)	
	return context

}

/**
 * MongoDB module function, searches for info
 * @function find
 * @param {Object} command - command to execute
 * @param {string} context - path to context
*/
const find = async (command, context) => {
	
	let _db = scraperInstance.resolveValue(command.db, context)
	let _collection = scraperInstance.resolveValue(command.collection, context)
	let _query = scraperInstance.resolveValue(command.query, context)
	let _project = scraperInstance.resolveValue(command.project, context)
	console.log(_project)
	let db = await context.$client.db(_db)
    let collection = await db.collection(_collection)
  	
	let response = await collection.find(_query, {projection: _project}).toArray() 
	
	let into = scraperInstance.resolveValue(command.into || command.as, context) || "$response"
	context = await scraperInstance.executeOnce({into}, context, response)	
	return context

}

/**
 * @exports module - instance with {@link Scrapper} to get info from MongoDB
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	register: scraper => {
		scraperInstance = scraper
	},

	rules:[
		/**
		 * rule to access mongo module
		 * @memberof rules
		*/
		{
			name: ["mongo"],
			_execute: engineMongo
		},
		/**
		 * rule to collect info
		 * @memberof rules
		*/
		{
			name: ["collections","mongo.collections"],
			_execute: listCollections
		},
		/**
		 * rule to aggregate info
		 * @memberof rules
		*/
		{
			name: ["aggregate","mongo.aggregate"],
			_execute: aggregate
		},
		/**
		 * rule to find info
		 * @memberof rules
		*/
		{
			name: ["find","mongo.find"],
			_execute: find
		}

	]

}

