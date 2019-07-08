const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword('green');

(async () => {
    try{
        // open headless browser
        let browser = await puppeteer.launch({headless: false});

        // open a page
        let page = await browser.newPage();

        // enter URL
        await page.goto('https://news.ycombinator.com/');
        await page.waitForSelector("a.storylink");

        let news = await page.evaluate(() => {
            let titleNodeList = document.querySelectorAll('a.storylink');
            let ageList = document.querySelectorAll('span.age');
            let scoreList = document.querySelectorAll('span.score');

            let titleLinkArray = [];

            for(let i = 0; i < titleNodeList.length; i++) {
                titleLinkArray[i] = {
                    title: titleNodeList[i].innerText.trim(),
                    link: titleNodeList[i].getAttribute('href'),
                    age: ageList[i].innerText.trim(),
                    score: scoreList[i].innerText.trim()
                };
            }

            return titleLinkArray;
        });

        await browser.close();

        // writing to json file
        fs.writeFile('hackernews.json', JSON.stringify(news), function(err) {
            if(err) throw err;

            console.log(success('Saved!!'));
        });
    }catch(err) {
        // Catch and display error
        console.log(error(err));
        await browser.close();
        console.log('Browser Closed!');
    }
})();
