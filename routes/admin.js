const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/", isAuth ,adminController.getIndex);

router.get("/users", isAuth, adminController.getUser);

router.get("/edit-user/:userId", isAuth,  adminController.getEditUser);

router.post("/edit-user", isAuth,  adminController.postEditUser);

router.post("/deleteUser", isAuth,  adminController.postDeleteUser);

router.get("/products", isAuth,  adminController.getProducts);

router.get("/add-product", isAuth,  adminController.getAddProduct);

router.post("/add-product", isAuth,  adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth,  adminController.getEditProduct);

router.post("/edit-product", isAuth,  adminController.postEditProduct);

router.post("/delete-product", isAuth,  adminController.postDeleteProduct);

router.get("/orders", isAuth,  adminController.getOrders);

// router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
