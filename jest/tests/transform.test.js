const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('Transform Cast', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/transform/cast.yaml").toString().replace(/\t/gm, " "));
    var cast = require('../references/transform/cast.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(cast);
    });
});

test('Transform CSV', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/transform/csv.yaml").toString().replace(/\t/gm, " "));
    var csv = require('../references/transform/csv.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(csv);
    });
});

test('Transform Project', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/transform/project.yaml").toString().replace(/\t/gm, " "));
    var project = require('../references/transform/project.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(project);
    });
});

test('Transform XML', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/transform/xml.yaml").toString().replace(/\t/gm, " "));
    var xml = require('../references/transform/xml.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(xml);
    });
});

test('Transform YAML', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/transform/yaml.yaml").toString().replace(/\t/gm, " "));
    var yamlTest = require('../references/transform/yaml.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(yamlTest);
    });
});