const scraperObject = {
    url: 'http://books.toscrape.com/',
    async scraper(browser) {
        let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url);
            await page.waitForSelector('.page_inner');
            // Get the link to all the required books
            let urls = await page.$$eval('section ol > li', links => {
            //  links = links.filter(link => link.querySelector('.instock.availability > p').textContent !== "In stock"); 
                links = links.map(el => el.querySelector('h3 > a').href);
                  links = links.map(price => price.querySelector('a > img').alt);
                return links;
            });
        console.log(urls);
        }
}

module.exports = scraperObject;