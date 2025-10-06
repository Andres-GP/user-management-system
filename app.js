const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";

let db;

if (isProd) {
  const sqlite3 = require("sqlite3").verbose();
  const path = require("path");
  const dbPath = path.resolve(__dirname, "database.sqlite");

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening SQLite DB:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  });
} else {
  const mysql = require("mysql2");

  db = mysql
    .createPool({
      connectionLimit: 100,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    })
    .promise();

  db.getConnection()
    .then((connection) => {
      console.log("Connected to MySQL as ID " + connection.threadId);
      connection.release();
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
}

app = express();
app.locals.db = db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const routes = require("./server/routes/user");
app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
