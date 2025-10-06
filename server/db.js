const mysql = require("mysql2");
const sqlite3 = require("sqlite3").verbose();

let db;

if (process.env.NODE_ENV === "production") {
  db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) console.error("SQLite connection error:", err);
    else console.log("Connected to SQLite DB");
  });
} else {
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
    .then((conn) => {
      console.log("Connected to MySQL DB as ID " + conn.threadId);
      conn.release();
    })
    .catch((err) => console.error("MySQL connection error:", err));
}

module.exports = db;
