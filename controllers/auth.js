exports.getAuth = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: req.isLoggedIn
  });
};

exports.postAuth = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect("/");
};
