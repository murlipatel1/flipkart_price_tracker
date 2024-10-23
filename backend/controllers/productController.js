// controllers/productController.js
const productService = require('../services/productService');

class ProductController {
  async addProduct(req, res) {
    try {
      const { url } = req.body;
      const product = await productService.addProduct(url);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async recheckPrice(req, res) {
    try {
      const { productId } = req.params;
      const product = await productService.recheckPrice(productId);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchProducts(req, res) {
    try {
      const { query } = req.query;
      const products = await productService.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPriceHistory(req, res) {
    try {
      const { productId } = req.params;
      const history = await productService.getPriceHistory(productId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();