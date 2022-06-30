const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");


const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouteres);
app.use(shopRouteres);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found", layout: false });
});

app.listen(3000);
