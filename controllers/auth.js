const User = require("../models/user");

exports.getAuth = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAuth = (req, res, next) => {
  User.findById("62c841426cfdc0e80304db02")
    .then((user) => {
      // console.log(user);
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
