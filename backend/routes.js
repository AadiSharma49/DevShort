const express = require('express');
const router = express.Router();
const Url = require('./url.model.js');
const shortid = require('shortid');

// POST /shorten
router.post('/shorten', async (req, res) => {
  const { original } = req.body;
  const short = shortid.generate();
  const newUrl = new Url({ original, short });
  await newUrl.save();
  res.json({ short }); // Returns only code
});

// GET /:short
router.get('/:short', async (req, res) => {
  const entry = await Url.findOne({ short: req.params.short });
  if (entry) return res.redirect(entry.original);
  res.status(404).send('Not found');
});

module.exports = router;
