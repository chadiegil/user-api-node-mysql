const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "node_msql",
});

// Endpoint for inserting data into the database
app.post("/users", (req, res) => {
  const { id, name, email } = req.body;

  const query = "INSERT INTO users SET ?";

  connection.query(query, { id, name, email }, (error, results, fields) => {
    if (error) throw error;

    res.send("User added successfully!");
  });
});

// Endpoint for retrieving data from the database
app.get("/users", (req, res) => {
  const query = "SELECT id, name, email FROM users";

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

// Endpoint for retrieving a single post by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";

  connection.query(query, [userId], (error, results, fields) => {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint for updating data in the database
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";

  connection.query(query, [name, email, id], (error, results, fields) => {
    if (error) throw error;

    res.send("User updated successfully!");
  });
});

// Endpoint for deleting data from the database
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [id], (error, results, fields) => {
    if (error) throw error;

    res.send("User deleted successfully!");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
