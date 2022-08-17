const Scraper = require("../../src/scanany");
const yaml = require("js-yaml");
const fs = require("fs");

const scraper = new Scraper();

test('Axios Get', async () => {
    let script = yaml.load(fs.readFileSync("./jest/suites/file/load.yaml").toString().replace(/\t/gm, " "));

    return scraper.execute(script).then(context => {
        expect(context).toEqual(fs.readFileSync('./jest/references/file/load.yaml').toString());
    });
});