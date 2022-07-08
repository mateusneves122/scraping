const scraperObject = {
    url: 'http://books.toscrape.com/',
    async scraper(browser) {
        let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url);
        let scrapedData = [];
        async function scrapeCurrentPage() {
            await page.waitForSelector('.page_inner');
            // Get the link to all the required books
            let urls = await page.$$eval('section ol > li', links => {
            //  links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock"); 
                links = links.map(el => el.querySelector('h3 > a').href);
                return links;
            });
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            dataObj['bookTitle'] = await newPage.$eval('.product_main h1', text => text.textContent);
            dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
            dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', i => i.src);
            dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
            dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
            resolve(dataObj);
            newPage.close();
        });

        for(const link in urls){
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                //console.log(currentPageData);
            }
            
        let nextButtonExist = false;
        try {
                const nextButton = page.$eval('.next a', text => text.textContent);
                nextButtonExist = true;
        } catch(err) {
                nextButtonExist = false;
        }
        if(nextButtonExist) {
            await page.click('.next a');
            return scrapeCurrentPage();
        }
        await page.close();
        return scrapedData;

        }
        let data = await scrapeCurrentPage();
        console.log(data);
        return data;        
    }

}

module.exports = scraperObject;