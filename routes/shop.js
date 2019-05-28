const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

// router.get('/#popup', shopController.getPopup);

router.get('/products/:productId', shopController.getProduct);

router.get('/tagged/branding', shopController.getbranding);

router.get('/tagged/illustration', shopController.getillustration);

router.get('/tagged/packaging', shopController.getpackaging);

router.get('/contact', shopController.getContact);

module.exports = router;
