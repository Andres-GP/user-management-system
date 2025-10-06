const db = require("../db");
const isProd = process.env.NODE_ENV === "production";

// View Users
exports.view = (req, res) => {
  const query = "SELECT * FROM user";

  if (isProd) {
    db.all(query, [], (err, rows) => {
      if (!err) {
        let removedUser = req.query.removed;
        let alert = req.query.alert;
        res.render("home", { rows, removedUser, alert });
      } else console.log(err);
    });
  } else {
    db.query(query)
      .then(([rows]) => {
        let removedUser = req.query.removed;
        let alert = req.query.alert;
        res.render("home", { rows, removedUser, alert });
      })
      .catch(console.log);
  }
};

// Find User by Search
exports.find = (req, res) => {
  const searchTerm = req.body.search;
  const query = isProd
    ? "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?"
    : "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?";

  const params = [`%${searchTerm}%`, `%${searchTerm}%`];

  if (isProd) {
    db.all(query, params, (err, rows) => {
      if (!err) res.render("home", { rows });
      else console.log(err);
    });
  } else {
    db.query(query, params)
      .then(([rows]) => res.render("home", { rows }))
      .catch(console.log);
  }
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

  const query = isProd
    ? `INSERT INTO user (first_name, last_name, email, phone, comments) VALUES (?, ?, ?, ?, ?)`
    : `INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?`;

  const params = [first_name, last_name, email, phone, comments];

  if (isProd) {
    db.run(query, params, function (err) {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
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
    });
  } else {
    db.query(query, params)
      .then(() =>
        res.redirect(
          "/?alert=" + encodeURIComponent("User added successfully.")
        )
      )
      .catch((err) => {
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
      });
  }
};

// Edit user
exports.edit = (req, res) => {
  const id = req.params.id;
  if (!id) return res.redirect("/?alert=No user ID provided");

  const query = "SELECT * FROM user WHERE id = ?";
  const params = [id];

  if (isProd) {
    db.all(query, params, (err, rows) => {
      if (!err && rows.length) res.render("edit-user", { user: rows[0] });
      else if (!rows.length) res.redirect("/?alert=User not found");
      else {
        console.log(err);
        res.redirect("/?alert=Database error");
      }
    });
  } else {
    db.query(query, params)
      .then(([rows]) => {
        if (rows.length) res.render("edit-user", { user: rows[0] });
        else res.redirect("/?alert=User not found");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/?alert=Database error");
      });
  }
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  const query = isProd
    ? `UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?`
    : `UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?`;

  const params = [first_name, last_name, email, phone, comments, req.params.id];

  if (isProd) {
    db.run(query, params, function (err) {
      if (!err) {
        const alert = encodeURIComponent(`${first_name} has been updated.`);
        res.redirect("/?alert=" + alert);
      } else {
        console.log(err);
        res.redirect("/?alert=" + encodeURIComponent("Error updating user."));
      }
    });
  } else {
    db.query(query, params)
      .then(() => {
        const alert = encodeURIComponent(`${first_name} has been updated.`);
        res.redirect("/?alert=" + alert);
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/?alert=" + encodeURIComponent("Error updating user."));
      });
  }
};

// Delete User
exports.delete = (req, res) => {
  const query = "DELETE FROM user WHERE id = ?";
  const params = [req.params.id];

  if (isProd) {
    db.run(query, params, function (err) {
      const alert = encodeURIComponent(
        err ? "Error removing user." : "User successfully removed."
      );
      res.redirect("/?alert=" + alert);
    });
  } else {
    db.query(query, params)
      .then(() => {
        const alert = encodeURIComponent("User successfully removed.");
        res.redirect("/?alert=" + alert);
      })
      .catch((err) => {
        console.log(err);
        const alert = encodeURIComponent("Error removing user.");
        res.redirect("/?alert=" + alert);
      });
  }
};

// View single user
exports.viewall = (req, res) => {
  const query = "SELECT * FROM user WHERE id = ?";
  const params = [req.params.id];

  if (isProd) {
    db.all(query, params, (err, rows) => {
      if (!err && rows.length) res.render("view-user", { user: rows[0] });
      else {
        console.log(err);
        res.redirect("/?alert=User not found");
      }
    });
  } else {
    db.query(query, params)
      .then(([rows]) => {
        if (rows.length) res.render("view-user", { user: rows[0] });
        else res.redirect("/?alert=User not found");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/?alert=User not found");
      });
  }
};
