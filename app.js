const express = require("express");
const bodyParser = require("body-parser");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRouteres);
app.use(shopRouteres);

app.listen(3000);
