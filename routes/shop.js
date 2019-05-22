const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products/:productId', shopController.getProduct);

router.get('/tagged/advertising', shopController.getAdvertising);

router.get('/tagged/bookCover', shopController.getBookCover);

router.get('/tagged/editorial', shopController.getEditorial);

router.get('/tagged/comicStory', shopController.getComicStory);

module.exports = router;
