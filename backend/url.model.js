const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  original: String,
  short: String,
});

module.exports = mongoose.model('Url', UrlSchema);
