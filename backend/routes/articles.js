const express = require('express');
const router = express.Router();
const db = require('../db');
const { scrapeTienPhong } = require('../scraper');

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const offset = parseInt(req.query.offset) || 0;
  const category = req.query.category;

  let query = 'SELECT * FROM articles';
  let params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  try {
    const articles = db.prepare(query).all(...params);
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    if (article) res.json(article);
    else res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin trigger scrape
router.post('/scrape', (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer tanthanh2025') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  scrapeTienPhong().then(count => {
    res.json({ message: `Scraped ${count} new articles` });
  });
});

module.exports = router;
