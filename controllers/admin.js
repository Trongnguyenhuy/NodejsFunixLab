const { validationResult } = require("express-validator/check");
const mongoose = require("mongoose");
const Product = require("../models/product");

const flieHelper = require("../util/fileHelper");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasErrors: false,
    product: {
      title: "",
      imgUrl: "",
      price: "",
      descriptions: "",
    },
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const descriptions = req.body.descriptions;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasErrors: true,
      product: {
        title: title,
        price: price,
        descriptions: descriptions,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()[0],
    });
  }

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasErrors: true,
      product: {
        title: title,
        price: price,
        descriptions: descriptions,
      },
      errorMessage: "Attached file is not an image ",
      validationErrors: [],
    });
  }

  const imgUrl = image.path;

  const product = new Product({
    // _id: new mongoose.Types.ObjectId("62f0bed6333ddecef379f71e"),
    title: title,
    price: price,
    imgUrl: imgUrl,
    descriptions: descriptions,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        hasErrors: false,
        product: product,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedtitle = req.body.title;
  const image = req.file;
  const updatedprice = req.body.price;
  const updateddescriptions = req.body.descriptions;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasErrors: true,
      product: {
        title: updatedtitle,
        price: updatedprice,
        descriptions: updateddescriptions,
        _id: prodId,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }

      product.title = updatedtitle;
      product.price = updatedprice;
      product.descriptions = updateddescriptions;
      if (image) {
        flieHelper.deleteFile(product.imgUrl);
        product.imgUrl = image.path;
      }
      return product.save().then((result) => {
        console.log("UPDATED PRODUCT !");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name -_id')
    .then((products) => {
      // console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found!"));
      }
      flieHelper.deleteFile(product.imgUrl);
      return Product.deleteOne({ _id: productId, userId: req.user._id });
    })
    .then((result) => {
      console.log("PRODUCT REMOVED !");
      res.status(200).json({message: 'Success!'})
    })
    .catch(() => {
      res.status(500).json({message: 'Delete failed!'});
    });
};
