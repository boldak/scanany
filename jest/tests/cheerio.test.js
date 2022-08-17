const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('Cheerio inspect-element', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/cheerio/inspect-element.yaml").toString().replace(/\t/gm, " "));
    var inspect_element = require('../references/cheerio/inspect-element.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(inspect_element);
    });
});

test('Cheerio inspect-element-collection', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/cheerio/inspect-element-collection.yaml").toString().replace(/\t/gm, " "));
    var inspect_element_collection = require('../references/cheerio/inspect-element-collection.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(inspect_element_collection);
    });
});