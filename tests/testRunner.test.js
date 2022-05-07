const fs = require('fs')
const Scraper = require("../index.js")
const YAML = require("js-yaml")

// naming convention: 
// script filename - something.yaml
// standart filename - something_standart.smth

const standartSuffix = '_standart'

async function testRunner() {
    let scraper = new Scraper()
    const testData = mapScriptsAndStandarts()

    describe('Scanany example scripts tests', () => {
        for (testPair of testData) {
            const { scriptFilename, standartFilename } = testPair
            test(`${scriptFilename} test`, async () => {
                const source = fs.readFileSync(`tests/yamls/${scriptFilename}`).toString().replace(/\t/gm, " ")
                let script = YAML.load(source)
                const result = await scraper.execute(script)
    
                const standartJSON = fs.readFileSync(`tests/standarts/${standartFilename}`).toString()
                const standartObj = JSON.parse(standartJSON)
    
                expect(result).toStrictEqual(standartObj)
            })
        }
    })


}

testRunner()

function readScripts() {
    const allFiles = fs.readdirSync('tests/yamls')
    const scripts = allFiles.filter((filename) => filename.includes('.yaml'))

    return scripts
}

function readStandarts() {
    return fs.readdirSync('tests/standarts')
}

function mapScriptsAndStandarts() {
    const scripts = readScripts()
    const standarts = readStandarts()

    const mappedData = scripts.map((scriptFilename) => ({
        scriptFilename,
        standartFilename: standarts.find((standartFilename) => standartFilename.includes(scriptFilename.split('.')[0]))
    }))

    return mappedData
}