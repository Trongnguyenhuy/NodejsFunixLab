const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://trongnguyenhuy:jj6arv15@cluster0.qyzg5.mongodb.net/?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then(client =>{
      console.log("Connected to MongoDB !");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;