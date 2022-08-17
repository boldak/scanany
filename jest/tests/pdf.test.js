const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('PDF Load', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/pdf/load.yaml").toString().replace(/\t/gm, " "));
    var test_pdf = require('../references/pdf/test-pdf.js');

    return scraper.execute(script).then(context => {
        expect(context).toEqual(JSON.stringify(test_pdf, null, " "));
    });
});

test('PDF From Buffer', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/pdf/from-buffer.yaml").toString().replace(/\t/gm, " "));
    var test_pdf = require('../references/pdf/test-pdf.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(test_pdf);
    });
});

test('PDF From URL', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/pdf/from-url.yaml").toString().replace(/\t/gm, " "));
    var url_pdf = require('../references/pdf/url-pdf.js');

    return scraper.execute(script).then(context => {
        expect(context).toMatchObject(url_pdf);
    });
});