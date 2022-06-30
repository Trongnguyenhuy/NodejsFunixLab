const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");
const errorControllers = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouteres);
app.use(shopRouteres);

app.use(errorControllers.get404);

app.listen(3000);
