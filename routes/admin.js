const path = require("path");

const express = require("express");

const adminControllers = require('../controllers/admin');

const router = express.Router();

router.get("/add-product", adminControllers.getAddProduct);

router.post("/add-product", adminControllers.postAddProduct);

// router.get("/edit-product/:productId", adminControllers.getEditProduct);

// router.post("/edit-product", adminControllers.postEditProduct);

// router.post("/delete-product", adminControllers.postDeleteProduct);

router.get("/products", adminControllers.getProducts);



module.exports = router;
