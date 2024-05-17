const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    fname: String,
    sname: String
  });

  module.exports = mongoose.model('cruds', tableSchema);