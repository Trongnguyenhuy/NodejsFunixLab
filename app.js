const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");
const { v4: uuidv4 } = require("uuid");

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
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));

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
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error('Dummy Errors');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    // throw new Error('Dummy Errors')
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((error) => {
      return next(new Error(error));
    });
});

app.use("/admin", adminRouteres);
app.use(shopRouteres);
app.use(authRouteres);

app.get("/500", errorControllers.get500);

app.use(errorControllers.get404);

app.use((error, req, res, next) => {
  // res.redirect("/500");
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
