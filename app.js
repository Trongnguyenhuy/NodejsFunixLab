const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");
const authRouteres = require("./routes/auth");
const errorControllers = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://trongnguyenhuy:jj6arv15@cluster0.qyzg5.mongodb.net/test";

const app = express();
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/admin", adminRouteres);
app.use(shopRouteres);
app.use(authRouteres);

app.use(errorControllers.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // console.log(result);
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "TrongNguyen",
          email: "trong@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
