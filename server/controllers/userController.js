const mysql = require("mysql2");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View Users
exports.view = (req, res) => {
  connection.query("SELECT * FROM user", (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      let alert = req.query.alert; // <-- aquí tomas el alert
      res.render("home", { rows, removedUser, alert });
    } else {
      console.log(err);
    }
  });
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-user");
};

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  if (!first_name || !last_name || !email || !phone) {
    return res.render("add-user", {
      alert: "Please fill in all required fields.",
      alertType: "error",
    });
  }

  connection.query(
    "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.render("add-user", {
            alert: "This email is already registered.",
            alertType: "error",
          });
        }
        console.error("Error inserting user:", err);
        return res.render("add-user", {
          alert: "An unexpected error occurred.",
          alertType: "error",
        });
      }

      return res.redirect(
        "/?alert=" + encodeURIComponent("User added successfully.")
      );
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  const id = req.params.id;
  if (!id) return res.redirect("/?alert=No user ID provided");

  connection.query("SELECT * FROM user WHERE id = ?", [id], (err, rows) => {
    if (!err && rows.length) {
      res.render("edit-user", { user: rows[0] });
    } else if (!rows.length) {
      res.redirect("/?alert=User not found");
    } else {
      console.log(err);
      res.redirect("/?alert=Database error");
    }
  });
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  connection.query(
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      if (!err) {
        // Redirige al home con un alert opcional
        const alert = encodeURIComponent(`${first_name} has been updated.`);
        res.redirect("/?alert=" + alert);
      } else {
        console.log(err);
        // En caso de error, podrías volver a la edición con mensaje de error
        res.redirect("/?alert=" + encodeURIComponent("Error updating user."));
      }
    }
  );
};

// Delete User
exports.delete = (req, res) => {
  connection.query(
    "DELETE FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        // Redirige al home con mensaje de alerta
        const alert = encodeURIComponent("User successfully removed.");
        res.redirect("/?alert=" + alert);
      } else {
        console.log(err);
        // En caso de error, también podemos mandar alert
        const alert = encodeURIComponent("Error removing user.");
        res.redirect("/?alert=" + alert);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// View Users
exports.viewall = (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err && rows.length) {
        res.render("view-user", { user: rows[0] });
      } else {
        console.log(err);
        res.redirect("/?alert=User not found");
      }
    }
  );
};
