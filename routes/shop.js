const path = require("path");

const express = require("express");

const shopControllers = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/products", shopControllers.getProducts);

router.get("/products/:productId", shopControllers.getProduct);

router.get("/cart", isAuth, shopControllers.getCart);

router.post("/cart", isAuth, shopControllers.postCart);

router.post("/cart-delete-item", isAuth, shopControllers.postCartDeleteItem);

router.get("/orders", isAuth, shopControllers.getOrders);
router.get("/orders/:orderId", isAuth, shopControllers.getInvoices);
router.post("/create-order", isAuth, shopControllers.postOrders);

// router.get("/checkout", shopControllers.getCheckout);

router.get("/", shopControllers.getIndex);

module.exports = router;
