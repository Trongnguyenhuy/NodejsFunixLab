const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "carts.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      // fetch the previous cart data
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart data => find the existing products
      let existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      // Add new product && increase the total price, quantity
      let updatingProduct;
      if (existingProduct) {
        updatingProduct = { ...existingProduct };
        updatingProduct.qty = updatingProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatingProduct;
      } else {
        updatingProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatingProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      // save to file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productQty*productPrice;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return null;
      }
      const cart = JSON.parse(fileContent);
      cb(cart);
    });
  }
};
