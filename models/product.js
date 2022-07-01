const fs = require("fs");
const path = require("path");

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
  constructor(id,title, imgUrl, descriptions, price ) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.descriptions = descriptions;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if(this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatingProducts = [...products];
        updatingProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatingProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.floor(Math.random()*1000).toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

};
