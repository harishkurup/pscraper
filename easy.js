const puppeteer = require('puppeteer');
const chalk = require('chalk');

// my OCD of colourful console.logs for debuging 
const error = chalk.bold.red;
const success = chalk.keyword('green');

(async () => {
    try{
        // open the headless browser
        let browser = await puppeteer.launch({headless: true});

        // open a new page
        let page = await browser.newPage();

        // enter URL in page
        await page.goto("https://www.google.com");

        // Google say cheese
        await page.screenshot({path: "example.png"});

        // close the browser
        await browser.close();

        console.log(success('Browser closed.'));
    } catch(err) {
        // catch and display error
        console.log(error(err));

        // close browser
        await browser.close();

        console.log(error('Browser closed!'));
    }
})();
