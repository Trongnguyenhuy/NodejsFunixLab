const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://trongnguyenhuy:jj6arv15@cluster0.qyzg5.mongodb.net/?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then(client =>{
      console.log("Connected to MongoDB !");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      threw(err);
    });
};

const getDb =() => {
  if (_db) {
    return _db;
  }
  threw('No database connection found!');

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;