// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products/search', productController.searchProducts);
router.post('/products/:productId/recheck', productController.recheckPrice);
router.get('/products/:productId/history', productController.getPriceHistory);

module.exports = router;