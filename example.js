module.exports = require("./src/scanany")

const Scraper = require("./index.js")

const test = async () => {
	const YAML = require("js-yaml")
	const path = require("path")
	let filepath = path.resolve(process.argv[2])
	
	let scraper = new Scraper()
	let source = require("fs").readFileSync(filepath).toString().replace(/\t/gm, " ")
	let script = YAML.load(source)

	let result = await scraper.execute(script)
	console.log("---------------------------------------------------------------")
	console.log(`Scanany example: ${filepath}`)
	console.log()
	console.log(source)
	console.log("---------------------------------------------------------------")
	// console.log(JSON.stringify(script))
	// console.log("---------------------------------------------------------------")
	
	console.log("Scanany result:")
	console.log()
	console.log(result)
	console.log("---------------------------------------------------------------")
	
	// process.exit(0)
}

test()