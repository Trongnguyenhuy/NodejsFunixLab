const express = require("express");

const authControllers = require('../controllers/auth');

const router = express.Router();

router.get("/login", authControllers.getAuth);
router.post("/login", authControllers.postAuth);

module.exports = router;