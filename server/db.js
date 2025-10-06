const path = require("path");
const isProd = process.env.NODE_ENV === "production";
let db;

if (isProd) {
  const sqlite3 = require("sqlite3").verbose();
  const dbPath = path.resolve(__dirname, "../database.sqlite");

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("SQLite connection error:", err);
    else console.log("Connected to SQLite DB at", dbPath);
  });

  db.query = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve([rows]);
      });
    });

  db.runAsync = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
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
}

module.exports = db;
