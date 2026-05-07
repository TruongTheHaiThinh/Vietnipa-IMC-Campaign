const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  try {
    const featured = db.prepare('SELECT * FROM featured_articles WHERE is_active = 1 LIMIT 1').get();
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
