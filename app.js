const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

// Handlebars setup
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Routes
const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));

module.exports = app;
