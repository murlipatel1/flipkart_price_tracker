// services/productService.js
const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');
const scraperService = require('./scraperService');

class ProductService {
  // service methods for Product
  async addProduct(url) {
    const productData = await scraperService.scrapeProductData(url);
    const product = new Product({
      url,
      ...productData
    });
    await product.save();

    await new PriceHistory({
      productId: product._id,
      price: productData.currentPrice
    }).save();

    return product;
  }

  // 
  async recheckPrice(productId) {
    const product = await Product.findById(productId);
    const newData = await scraperService.scrapeProductData(product.url);
    
    if (newData.currentPrice !== product.currentPrice) {
      await new PriceHistory({
        productId: product._id,
        price: newData.currentPrice
      }).save();
      
      product.currentPrice = newData.currentPrice;
      product.lastChecked = new Date();
      await product.save();
    }
    
    return product;
  }
 
  async searchProducts(query) {
      return Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
  }

  async getPriceHistory(productId) {
    return PriceHistory.find({ productId }).sort({ timestamp: -1 });
  }
}

module.exports = new ProductService();