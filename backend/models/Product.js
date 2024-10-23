// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  description: String,
  currentPrice: Number,
  totalReviews: Number,
  totalPurchases: Number,
  lastChecked: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);