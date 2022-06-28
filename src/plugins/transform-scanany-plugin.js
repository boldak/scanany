/**
 * Simple XML to JavaScript object converter.
 * @module xml2js
 * @see {@link https://www.npmjs.com/package/xml2js|xml2js - npm}
*/
const xml2js = require('xml2js')

/**
 * An implementation of YAML, a human-friendly data serialization language.
 * @module js-yaml
 * @see {@link https://www.npmjs.com/package/js-yaml|js-yaml - npm}
*/
const YAML = require("js-yaml")

/**
 * Csvjson helps you quickly convert popular data formats to the format you need.
 * @module csvjson
 * @see {@link https://csvjson.com/|csvjson}
*/
const csvjson = require("csvjson")

/**
 * Converts json into csv with column titles and proper line endings.
 * @module json2csv
 * @see {@link https://www.npmjs.com/package/json2csv|json2csv - npm}
*/
const json2csv = require("json2csv")

/**
 * A modern JavaScript utility library delivering modularity, performance & extras.
 * @module lodash
 * @see {@link https://lodash.com/|Lodash}
*/
const { toPairs, extend } = require("lodash")


/**
 * @exports module - instance with {@link Scrapper} to get info from PDF
 * @property {function} register - add {@link Scrapper} to module
 * @property {Object[]} rules - rules for {@link Scrapper} for this rule in format name:function
*/
module.exports = {
	
	rules: [
		/**
		 * rule to convert xml to js file from value path
		 * @memberof rules
		*/
		{
			name:["xml->js","transform.xml->js"],
			_execute: async (command, context, value) => {
				let options = command.options
				let result = await xml2js.parseStringPromise(value, options) 
				return result
			}	
		},
		/**
		 * rule to convert js to xml file from value path
		 * @memberof rules
		*/
		{
			name:["js->xml","transform.js->xml"],
			_execute: async (command, context, value) => {
				let builder = new xml2js.Builder();
				return builder.buildObject(value);
			}	
		},
		/**
		 * rule to convert yaml to js file from value path
		 * @memberof rules
		*/
		{
			name:["yaml->js","transform.yaml->js"],
			_execute: async (command, context, value) => {
				return YAML.load(value)
			}	
		},
		/**
		 * rule to convert js to yaml file from value path
		 * @memberof rules
		*/
		{
			name:["js->yaml","transform.js->yaml"],
			_execute: async (command, context, value) => {
				return YAML.dump(value)		
			}	
		},
		/**
		 * rule to convert csv to js file from value path
		 * with inserting correct line endings and using correct encoding
		 * @memberof rules
		*/
		{
			name:["csv->js", "transform.csv->js"],
			_execute: async (command, context, value) => {

				let options = command.options || {}
			
				let csvOptions = {
		          delimiter: options.delimiter || ";",
		          quote: options.quote || null
		        }
		        
			    let encode = options.encode || "utf8";

		        let data = new Buffer(value, encode).toString().trim();
			    data = csvjson.toObject(data, csvOptions);
			    return data
			}	
		},
		/**
		 * rule to convert js to csv file from value path
		 * with inserting correct line endings and using correct encoding
		 * @memberof rules
		*/
		{
			name:["js->csv", "transform.js->csv"],
			_execute: async (command, context, value) => {

				let options = command.options || {}

				let csvOptions = {
		          delimiter: options.delimiter || ";"
		        }
		        
			    let encode = options.encode || "utf8";
			    
			    let fields = toPairs(value[0]).map(item => item[0])

        		// let data  = new Buffer( json2csv(extend({ data: value, fields: fields}, csvOptions)), encode)
		        const parser = new json2csv.Parser(extend({ fields: fields},csvOptions));
  
  		        let data  = parser.parse(value)
		        
			    return data
			}	
		}

	]
}