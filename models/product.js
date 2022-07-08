const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, imgUrl, price, descriptions, id) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.descriptions = descriptions;
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOpt;
    if (this._id) {
      dbOpt = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOpt = db.collection("products").insertOne(this);
    }
    return dbOpt
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodid) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodid) })
      .then((result) => {
        console.log('Delete!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
