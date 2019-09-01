const fs = require('fs');
const path = require('path');

// const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Logo = require('../models/logo');

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Logo.find()
  .then(logos => {
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
        productNext: productNext,
        logo: logos[0].imageUrl
      });
    })
  })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getIndex = (req, res, next) => {
  Logo.find()
  .then(logos => {
    // neu muon doi thay vao:
    //  illustration / branding / packaging
    Product.find({category: "illustration"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/illustration',
        logo: logos[0].imageUrl
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getContact = (req, res, next) => {
  Logo.find()
  .then(logos => {
    console.log("CONTACT!!!")
    return res.render('shop/contact', {
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/contact',
        logo: logos[0].imageUrl
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getbranding = (req, res, next) => {
  Logo.find()
  .then(logos => {
    Product.find({category: "branding"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/branding',
        logo: logos[0].imageUrl
      });
    })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getillustration = (req, res, next) => {
  Logo.find()
  .then(logos => {
    Product.find({category: "illustration"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/illustration',
        logo: logos[0].imageUrl
      });
    })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};
exports.getpackaging = (req, res, next) => {
  Logo.find()
  .then(logos => {
    Product.find({category: "packaging"})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Nguyen Anh Nghiet',
        path: '/tagged/packaging',
        logo: logos[0].imageUrl
      });
    })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};