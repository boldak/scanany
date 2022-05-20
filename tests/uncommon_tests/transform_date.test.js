const fs = require('fs')
const Scraper = require("../../index.js")
const YAML = require("js-yaml")

test(`Transform date test`, async () => {
    let scraper = new Scraper()
    const source = fs.readFileSync("tests/uncommon_tests/transform_date.yaml").toString().replace(/\t/gm, " ")
    let script = YAML.load(source)
    const result = await scraper.execute(script)

    const standartJSON = fs.readFileSync('tests/uncommon_tests/transform_date_standart.json').toString()
    const standartObj = JSON.parse(standartJSON)

    // This is needed to perform proper "diff" output when test fails
    const resultPlainObj = JSON.parse(JSON.stringify(result))

    const keyToSkip = 'now'

    for (const [key, value] of Object.entries(resultPlainObj)) {
        if (key !== keyToSkip) {
            expect(value).toStrictEqual(standartObj[key])
        }
    }
    
    // expect(resultPlainObj).toStrictEqual(standartObj)
})