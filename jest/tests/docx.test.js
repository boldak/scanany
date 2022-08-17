const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('Docx Load', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/docx/load.yaml").toString().replace(/\t/gm, " "));
    var test_docx = require('../references/docx/test-docx.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(test_docx);
    });
});

test('Docx From Buffer', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/docx/from-buffer.yaml").toString().replace(/\t/gm, " "));
    var test_docx = require('../references/docx/test-docx.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(test_docx);
    });
});

test('Docx From URL', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/docx/from-url.yaml").toString().replace(/\t/gm, " "));
    var test_docx = require('../references/docx/test-docx.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(test_docx);
    });
});