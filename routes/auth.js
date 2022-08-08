const express = require("express");
const { check } = require("express-validator/check");

const authControllers = require("../controllers/auth");

const router = express.Router();

router.get("/login", authControllers.getAuth);

router.post("/login", authControllers.postAuth);

router.post("/logout", authControllers.postLogout);

router.get("/signup", authControllers.getSignup);

router.post(
  "/signup",
  check("email").isEmail().withMessage("Please enter a valid email."),
  authControllers.postSignup
);

router.get("/reset", authControllers.getReset);

router.post("/reset", authControllers.postReset);

router.get("/reset/:token", authControllers.getNewPassword);

router.post("/new-password", authControllers.postNewPassword);

module.exports = router;
