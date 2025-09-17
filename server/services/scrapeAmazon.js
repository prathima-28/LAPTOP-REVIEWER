const puppeteer = require('puppeteer');

async function scrapeAmazon(url) {
  try {
    // Launch Puppeteer in Render-friendly mode
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract product title and specs
    const title = await page.$eval('#productTitle', el => el.textContent.trim());
    const specs = await page.$$eval('#feature-bullets ul li', nodes =>
      nodes.map(n => n.textContent.trim())
    );

    await browser.close();

    return { title, specs };
  } catch (err) {
    console.error('Error scraping Amazon:', err.message);
    throw new Error('Failed to scrape Amazon. Check URL or try again.');
  }
}

module.exports = scrapeAmazon;
