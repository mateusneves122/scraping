const browserObject = require('./browser/browser.js');
const scraperController = require('./page/pageController.js');

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance);
