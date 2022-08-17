const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('JS Rules', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/js/rules.yaml").toString().replace(/\t/gm, " "));
    var rules = require('../references/js/rules.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(rules);
    });
});

test('JS Transform', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/js/transform.yaml").toString().replace(/\t/gm, " "));
    var transform = require('../references/js/transform.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(transform);
    });
});