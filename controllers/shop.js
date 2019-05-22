const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.find()
  .then(products => {
    Product.findById(prodId)
    .then(product => {
      var productNext = null;
      var productPre = null;
      var iPro = null; 
      products.forEach((p, i) => {
        if (p._id.toString() == product._id.toString()) {
          iPro = i;
        }
      });

      if (products.length == 1) {
        productPre = null;
        productNext = null;
      } else {
        if (iPro == 0) {
          productNext = products[iPro + 1];
          productPre = null;
        } else if (iPro == products.length - 1) {
          productNext = null;
          productPre = products[iPro - 1];
        } else {
          productNext = products[iPro + 1];
          productPre = products[iPro - 1];
        }
      }
      console.log("product:",product);
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        productPre: productPre,
        productNext: productNext
      });
    })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getbranding = (req, res, next) => {
  Product.find({category: "branding"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/branding'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getillustration = (req, res, next) => {
  Product.find({category: "illustration"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/illustration'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getpackaging = (req, res, next) => {
  Product.find({category: "packaging"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/packaging'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};