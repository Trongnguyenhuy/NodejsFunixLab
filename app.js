const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");
const authRouteres = require("./routes/auth");
const errorControllers = require("./controllers/error");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62c841426cfdc0e80304db02")
    .then((user) => {
      // console.log(user);
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use("/admin", adminRouteres);
app.use(shopRouteres);
app.use(authRouteres);

app.use(errorControllers.get404);

mongoose
  .connect(
    "mongodb+srv://trongnguyenhuy:jj6arv15@cluster0.qyzg5.mongodb.net/?retryWrites=true&w=majority"
  )
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
