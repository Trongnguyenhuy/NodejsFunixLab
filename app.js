const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");

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

const csrfProtection = csrf();

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

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if(!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user =>{
    if(!user) {
      return next();
    }
    req.user = user;
    next();
  })
  .catch((error) => {
    throw new Error(error);
  });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated=  req.session.isLoggedIn;
  res.locals.csrfToken= req.csrfToken()
  next();
});

app.use("/admin", adminRouteres);
app.use(shopRouteres);
app.use(authRouteres);

app.get("/500",errorControllers.get500);

app.use(errorControllers.get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
