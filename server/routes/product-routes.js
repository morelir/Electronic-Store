const express = require('express');
const { check } = require('express-validator');

const productsControllers = require('../controllers/products-controllers');
// const fileUpload = require('../middleware/file-upload');
// const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/category/:category', productsControllers.getProductsByCategory);
router.get('/:productId', productsControllers.getProductById);

module.exports = router;