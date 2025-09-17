const express = require('express');
const router = express.Router();
const scrapeAmazon = require('../services/scrapeAmazon');

router.post('/', async (req, res) => {
  const { url, budget, purpose } = req.body;

  if (!url || !budget || !purpose) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Scrape product data
    const product = await scrapeAmazon(url);

    // General and purpose-specific analysis
    const ram = product.specs.find(s => /RAM/i.test(s)) || '';
    const storage = product.specs.find(s => /SSD|HDD/i.test(s)) || '';

    let score = 50;

    if (/i5|ryzen5/i.test(product.specs.join(''))) score += 25;
    if (/i7|ryzen7/i.test(product.specs.join(''))) score += 35;

    if (/16GB/i.test(ram)) score += 20;
    if (/512GB/i.test(storage)) score += 20;

    // Generate final verdict
    const verdict = score >= 75 ? 'Excellent 💯' : score >= 50 ? 'Good 👍' : 'Average ⚠️';

    res.json({
      productTitle: product.title,
      specs: product.specs,
      score,
      verdict
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});

module.exports = router;
