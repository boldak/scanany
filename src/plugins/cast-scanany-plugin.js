/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const _ = require("lodash")

/**
 * A JavaScript date library for parsing, validating, manipulating, and formatting dates.
 * @module moment
 * @see {@link https://www.npmjs.com/package/moment|moment - npm}
*/
const moment = require("moment")

/**
 * JavaScript function for hashing messages with MD5.
 * @module md5
 * @see {@link https://www.npmjs.com/package/md5|md5 - npm}
*/
const md5 = require("md5")

/**
 * For the creation of RFC4122 UUIDs.
 * @module uuid
 * @see {@link https://www.npmjs.com/package/uuid|uuid - npm}
*/
const uuid = require("uuid").v4

/**
 * @exports module - instance with {@link Scrapper} and miscellaneous utils
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	rules: [
		/**
		 * rule to access uuid module
		 * @memberof rules
		*/
		{
			name:["uuid"],
			_execute: async (command, context, value) => uuid()
		},
		/**
		 * rule to create RFC4122 UUID
		 * @memberof rules
		*/
		{
			name:["md5"],
			_execute: async (command, context, value) => md5(value)
		},
		/**
		 * rule to convert value to Srting
		 * @memberof rules
		*/
		{
			name:["toString"],
			_execute: async (command, context, value) => value.toString()
		},
		/**
		 * rule to parse value to JSON
		 * @memberof rules
		*/
		{
			name:["json.parse"],
			_execute: async (command, context, value) => JSON.parse(value)
		},
		/**
		 * rule to stringify value to JSON
		 * @memberof rules
		*/
		{
			name:["json.stringify"],
			_execute: async (command, context, value) => JSON.stringify(value, null, " ")
		},
		/**
		 * rule to convert String to Float
		 * @memberof rules
		*/
		{
			name:["float"],
			_execute: async (command, context, value) => Number.parseFloat(value)
		},
		/**
		 * rule to convert String to Int
		 * @memberof rules
		*/
		{
			name:["int"],
			_execute: async (command, context, value) => Number.parseInt(value)
		},
		/**
		 * rule to return current date or date received from either value or command
		 * @memberof rules
		*/
		{
			name:["date"],
			_execute: async (command, context, value) => {
				if(command == "date" && !value) return new Date()
				if (value) return new Date(value)	
				return new Date(command)	
			}
		},
		/**
		 * rule to check if value is true
		 * @memberof rules
		*/
		{
			name:["boolean"],
			_execute: async (command, context, value) => /^true$/.test(value)
		},
		/**
		 * rule to forman Date
		 * @memberof rules
		*/
		{
			name:["moment.format"],
			_execute: async (command, context, value) => moment(new Date(value)).format(command)
		},
		/**
		 * rule to return date depending on value and format of output 
		 * @memberof rules
		*/
		{
			name:["moment.date"],
			_execute: async (command, context, value) => moment(value, command.format).toDate()
		},
		/**
		 * rule to get value from command
		 * @memberof rules
		*/
		{
			name:["get","project"],
			_execute: async (command, context, value) => {
				if (_.isString(command)) return _.get(value, command)
				if (_.isArray(command)){
					let res = {}
					command.forEach( c => {
						_.set(res, c, _.get(value,c))
					})
					return res
				}	
			}	
		},
		/**
		 * rule to access lodash form received commands
		 * @memberof rules
		*/
		{
			name:[
				"lodash.camelCase",
				"lodash.capitalize",
				"lodash.escape",
				"lodash.kebabCase",
				"lodash.lowerCase",
				"lodash.lowerFirst",
				"lodash.snakeCase",
				"lodash.startCase",
				"lodash.toLower",
				"lodash.toUpper",
				"lodash.trim",
				"lodash.trimEnd",
				"lodash.trimStart",
				"lodash.truncate",
				"lodash.unescape",
				"lodash.upperCase",
				"lodash.upperFirst",
				"lodash.words",

				"lodash.entries",
				"lodash.invert",
				"lodash.keys",
				"lodash.values",
				"lodash.toPairs",
				"lodash.size"
			],
			
			_execute: async (command, context, value) => {
				let method = command.split(".")[1]
				return _[method](value)
			}
		}

	]
}
