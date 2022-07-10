exports.getAuth = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAuth = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
