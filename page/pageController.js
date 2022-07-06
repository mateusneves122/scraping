const pageScraper = require('./pageScraperService');

async function scraperAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);
    } catch {
        console.log("Coult not resolve the browser isntance => ", err);
    }
}

module.exports = (browserInstance) => scraperAll(browserInstance);