const browserObject = require('./browser/browser.js');
const scraperController = require('./page/pageController.js');
const scraperObject = require('./page/pageScraperService.js');

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance);

