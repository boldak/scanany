const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('XLSX Load', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/xlsx/load.yaml").toString().replace(/\t/gm, " "));
    var load = require('../references/xlsx/load.js');

    return scraper.execute(script).then(context => {
        expect(context).toEqual(JSON.stringify(load, null, " "));
    });
});

test('XML From Buffer', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/xlsx/from-buffer.yaml").toString().replace(/\t/gm, " "));
    var from_buffer = require('../references/xlsx/from_buffer.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(from_buffer);
    });
});

test('XML From URL', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/xlsx/from-url.yaml").toString().replace(/\t/gm, " "));
    var from_url = require('../references/xlsx/from_url.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(from_url);
    });
});