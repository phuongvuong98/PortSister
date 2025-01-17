const mongoose = require('mongoose');

const fileHelper = require('../util/file');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

const Logo = require('../models/logo');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("huhu");
  const title = req.body.title;
  const image = req.files;
  const category = req.body.category;
  const description = req.body.description;

  console.log("image:", image);

  if (image.length == 0) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: true,
      product: {
        title: title,
        category: category,
        description: description
      },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  
  const errors = validationResult(req);
	// console.log("TCL: exports.postAddProduct -> req", req)
	// console.log("TCL: exports.postAddProduct -> errors", errors)
	
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: true,
      product: {
        title: title,
        category: category,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrlCover = image[0].path;
  const imageUrl = [];
  
  image.forEach((img, i) => {
      if (i != 0) {
        imageUrl.push(image[i].path);
      } 
  });
  console.log("TCL: exports.postAddProduct -> imageUrl", imageUrl)
  
  const product = new Product({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title: title,
    category: category,
    description: description,
    imageUrlCover: imageUrlCover,
    imageUrlOther: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      // return res.status(500).render('admin/edit-product', {
      //   pageTitle: 'Add Product',
      //   path: '/admin/add-product',
      //   editing: false,
      //   hasError: true,
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     category: category,
      //     description: description
      //   },
      //   errorMessage: 'Database operation failed, please try again.',
      //   validationErrors: []
      // });
      // res.redirect('/500');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedcategory = req.body.category;
  const updatedDesc = req.body.description;

  var imageUrlCover = null;
  var imageUrl = null;
  var image = null;

  if (req.files.length != 0) {
    image = req.files;

    //const errors = validationResult(req);

    imageUrlCover = image[0].path;
    imageUrl = [];
    
    image.forEach((img, i) => {
        if (i != 0) {
          imageUrl.push(image[i].path);
        } 
    });
    console.log("TCL: exports.postAddProduct -> imageUrl", imageUrl)
  }
  

  // if (!errors.isEmpty()) {
  //   return res.status(422).render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: true,
  //     hasError: true,
  //     product: {
  //       title: updatedTitle,
  //       category: updatedcategory,
  //       description: updatedDesc,
  //       imageUrlCover :imageUrlCover,
  //       imageUrlOther :imageUrl,
  //       _id: prodId
  //     },
  //     errorMessage: errors.array()[0].msg,
  //     validationErrors: errors.array()
  //   });
  // }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      if (image) {
        product.title = updatedTitle;
        product.category = updatedcategory;
        product.description = updatedDesc;
        product.imageUrlCover = imageUrlCover;
        product.imageUrlOther = imageUrl;
      } else {
        product.title = updatedTitle;
        product.category = updatedcategory;
        product.description = updatedDesc;
      }
      
      return product.save().then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      //fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditLogo = (req, res, next) => {
  res.render('admin/edit-logo', {
    pageTitle: 'Edit logo',
    path: '/admin/edit-logo',
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postEditLogo = (req, res, next) => {
  console.log("huhu1");
  const image = req.files;
  console.log("TCL: exports.postEditLogo -> req.file", req.files)
  
  if (image.length == 0) {
    return res.status(422).render('admin/edit-logo', {
      pageTitle: 'Edit logo',
      path: '/admin/edit-logo',
      hasError: true,
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  
  const errors = validationResult(req);
	
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-login', {
      pageTitle: 'Edit Login',
      path: '/admin/edit-login',
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  
  // const logo = new Logo({
  //   imageUrl: image[0].path
  // });

  // return logo.save().then(result => {
  //   res.redirect("admin/edit-logo");
  // })
  Product.find()
  .then(products => {
    Logo.find()
    .then(logos => {
      const delete_old_img = logos[0].imageUrl;
      logos[0].imageUrl = image[0].path;
      return logos[0].save().then(result => {
        console.log("lala");
        //fileHelper.deleteFile(delete_old_img);
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          logo: image[0].path
        });
      });
    })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};