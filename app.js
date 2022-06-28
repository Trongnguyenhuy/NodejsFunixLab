const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("Always run");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In add product middleware");
  res.send('<h1>The "Add Product" Page</h1>');
});

app.use("/", (req, res, next) => {
  console.log("In / middleware");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
