const path = require("path");

const express = require("express");
const { body } = require("express-validator/check");

const adminControllers = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-product", isAuth, adminControllers.getAddProduct);

router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imgUrl").isURL(),
    body("price").isFloat(),
    body("descriptions").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminControllers.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminControllers.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imgUrl").isURL(),
    body("price").isFloat(),
    body("descriptions").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminControllers.postEditProduct
);

router.post("/delete-product", isAuth, adminControllers.postDeleteProduct);

router.get("/products", isAuth, adminControllers.getProducts);

module.exports = router;
