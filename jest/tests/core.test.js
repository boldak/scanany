const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('Core Read Each', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/core/each.yaml").toString().replace(/\t/gm, " "));
    var each = require('../references/core/each.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(each);
    });
});