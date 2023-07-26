const puppeteer =  require('puppeteer');

let scraperInstance
const md5 = require("md5")

const makeSelector = (selector, selector_type) => {
    switch (selector_type) {
        case 'class name':
            return  (selector.toString().includes(".", 0))? selector : "." + selector
        case 'tag name':
            return  selector

        case 'name':
            return  '[name="' + selector + '"]'

        case 'css':
            return  selector

        default:
            throw selector
    }
}

const extractData = async (element, attr, must_contain) => {
    let t
    // if (attr ===  ""){
    //     t = await (await element.getProperty('textContent')).jsonValue()
    //     t = t.toString()
    // }else{
    //     t = await (await n.getProperty(attr)).jsonValue()
    //     t = t.toString()
    // }
    t = await (await element.getProperty((attr === "")? 'textContent' : attr)).jsonValue()
    return (must_contain === '') ? t : (t.toString().includes(must_contain)? t : null)
}

const extractDataArr = async (elements, attr, must_contain) => {
    let r = []
    for (let i = 0; i < elements.length; i++) {
        let rq = await extractData(elements[i], attr, must_contain)
        if (rq == null)
            continue;
        r.push(rq)
    }
    return r
}

const selectElements = async (page, selector, selector_type, attr, must_contain) => {
    let filter = makeSelector(selector, selector_type)
    //let els = await driver.findElements(filter);
    const els = await page.$$(filter);
    console.log("Found", els.length, "elements");
    return await extractDataArr(els, attr, must_contain)
}

const selectElement = async (page, selector, selector_type, attr, must_contain) => {
    let filter = makeSelector(selector, selector_type)
    //let el = await driver.findElement(filter);
    let el = await page.$(filter)
    return await extractData(el, attr, must_contain)
}

const startParsing = async(command, context) => {
    console.log(command.into)
    console.log(command)
    // const task = context.task.options
    let task = scraperInstance.resolveValue(command.task, context).options
    console.log(task)
    console.log("starting puppeteer web driver")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("started puppeteer web driver")
    let links;
    let res;
    let link;
    let m;
    let textElements;
    try {
        console.log("awaiting driver url")
        await page.goto(task.url);

        console.log("Driver got", page.url().toString())
        links = await selectElements(page, task.feed_selector, task.feed_selector_type, task.feed_selector_attr, task.feed_selector_must_contain)
        console.log("Got", links.length, "links on page")

        res = []
        for (let i = 0; i < links.length; i++) {
            try {
                link = links[i]
                await page.goto(link)
                console.log("Driver got", page.url())
                m = {
                    raw: {},
                    text: "",
                    links: [],
                    images: [],
                }
                m.href = link
                m.raw.html = await page.content()
                textElements = await selectElements(page, task.text_selector,  task.text_selector_type, task.text_selector_attr, task.text_selector_must_contain)
                // for (let i = 0; i < textElements.length; i++) {
                //     m.text += textElements[i] + "\n"
                // }
                m.text = textElements.join("\n")
                try {
                    m.links = await selectElements(page, task.links_selector, task.links_selector_type, task.links_selector_attr, task.links_selector_must_contain)
                }catch (e) {
                    console.log(e)
                    console.log("Errors while getting m.Links")
                }

                try {
                    if (!(task.published_selector === ''))
                        m.publishedAt = await selectElement(page, task.published_selector, task.published_selector_type, task.published_selector_attr, task.published_selector_must_contain)
                } catch (e) {
                    console.log(e)
                    console.log("Errors while getting m.PublishedAT")
                }

                if (!m.publishedAt)
                    m.publishedAt = new Date()
                try {
                    m.images = await selectElements(page, task.images_selector, task.images_selector_type, task.images_selector_attr, task.images_selector_must_contain)
                }catch (e) {
                    console.log(e)
                    console.log("Errors while getting m.images")
                }

                if (!m.text)
                    continue

                m.md5 = md5(m.text)
                res.push(m)
            } catch (e) {
                console.log(e)
                console.log("Failed to get link", link)
            }

        }
    } finally {
        try{
            await browser.close();
        } finally {
            console.log("Failed to close browser")
        }
    }
    //console.log(JSON.stringify(res))
    let into = scraperInstance.resolveValue(command.into || command.as, context)
    context = await scraperInstance.executeOnce({into}, context, res)

    return context
}



module.exports = {
    register: scraper => {
        scraperInstance = scraper
    },
    rules: [
        {
            name:[
                "start_parsing"
            ],
            _execute: startParsing
        }
    ]
}
