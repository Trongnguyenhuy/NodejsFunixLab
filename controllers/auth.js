exports.getAuth = (req, res, next) => {
  // const isLoggedIn = req.get("cookie").split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: false,
  });
};

exports.postAuth = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
