const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");
const errorControllers = require("./controllers/error");
const db = require("./util/database");
const database = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouteres);
app.use(shopRouteres);

db.execute("SELECT * FROM products")
  .then(result => {
    console.log(result[0]);
  })
  .catch(err => {
    console.log(err);
  });

app.use(errorControllers.get404);

app.listen(3000);
