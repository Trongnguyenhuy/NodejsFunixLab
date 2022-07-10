const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editting: false,
    isAuthenticated: isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const descriptions = req.body.descriptions;

  const product = new Product({
    title: title,
    price: price,
    imgUrl: imgUrl,
    descriptions: descriptions,
    userId: req.user
  });

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
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
        editting: editMode,
        product: product,
        isAuthenticated: isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedimgUrl = req.body.imgUrl;
  const updatedprice = req.body.price;
  const updateddescriptions = req.body.descriptions;
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedtitle;
      product.price = updatedprice;
      product.descriptions = updateddescriptions;
      product.updatedimgUrl = updatedimgUrl;
      return product.save();
    })
    .then((result) => {
      console.log('UPDATED PRODUCT !');
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name -_id')
    .then((products) => {
      // console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      console.log('PRODUCT REMOVED !');
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
