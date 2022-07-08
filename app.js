const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");
const errorControllers = require("./controllers/error");
const mongoConnect = require('./util/database').mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('62c78646ed47227b0810da49')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
  next();
});

app.use("/admin", adminRouteres);
app.use(shopRouteres);

app.use(errorControllers.get404);

mongoConnect(client => {
  app.listen(3000);
});



