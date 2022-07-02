const fs = require("fs");
const path = require("path");

const Cart = require("./cart");
const db = require("../util/database");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imgUrl, descriptions, price) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.descriptions = descriptions;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imgUrl, descriptions)" +
      "VALUES(?,?,?,?)",
      [this.title, this.price, this.imgUrl, this.descriptions]
    );
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProduct = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (err) {
          return;
        }
        Cart.deleteProduct(id, product.price);
      });
    });
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute(
      "SELECT * FROM products WHERE products.id = ?",
      [id]
    );
  }
};
