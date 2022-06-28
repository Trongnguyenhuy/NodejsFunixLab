const express = require("express");
const bodyParser = require("body-parser");

const adminRouteres = require("./routes/admin");
const shopRouteres = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRouteres);
app.use(shopRouteres);

app.use((req, res, next) => {
    res.status(404).send(
        '<h1 style="color: red">Page not found</h1>'
    );
});

app.listen(3000);
