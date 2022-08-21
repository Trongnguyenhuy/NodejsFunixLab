const express = require("express");
const { check, body } = require("express-validator/check");

const authControllers = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authControllers.getAuth);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("Invalid email!");
          }
        });
      }),
    body("password", "Invalid Password!").isLength({ min: 5 }).isAlphanumeric(),
  ],
  authControllers.postAuth
);

router.post("/logout", authControllers.postLogout);

router.get("/signup", authControllers.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only letters, numbers, and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
  ],
  authControllers.postSignup
);

router.get("/reset", authControllers.getReset);

router.post("/reset", authControllers.postReset);

router.get("/reset/:token", authControllers.getNewPassword);

router.post("/new-password", authControllers.postNewPassword);

module.exports = router;
