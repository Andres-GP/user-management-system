const db = require("./server/db");

if (process.env.NODE_ENV === "production") {
  db.run(
    `CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    comments TEXT
  )`,
    (err) => {
      if (err) console.error(err);
      else console.log("SQLite table created or already exists");
      process.exit(0);
    }
  );
}
