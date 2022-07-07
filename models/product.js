const getDb = require("../util/database").getDb;

class Product {
  constructor(title, imgUrl, price, descriptions) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.descriptions = descriptions;
  }

  save() {
    const db = getDb();
    db.collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
