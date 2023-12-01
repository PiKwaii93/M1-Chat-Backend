const pool = require("../database/db");

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM user");
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  getOneUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM user WHERE id = ?",
        [id]
      );
      res.status(200).json({ data: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  createUser: async (req, res) => {
    try {
      const { user_name, email, password, status } = req.body;
      const created_at = new Date();
      const updated_at = new Date();
      const [rows, fields] = await pool.query(
        "INSERT INTO user (user_name, email, password, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [user_name, email, password, status, created_at, updated_at]
      );
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  updateUser: async (req, res) => {
    try {
      console.log("req", req.body);
      const { id, user_name, email, password, status } = req.body;
      const updated_at = new Date();

      // Create an object to store the fields to be updated
      const updateFields = {};

      // Check which fields are provided in the request and add them to the update object
      if (user_name) updateFields.user_name = user_name;
      if (email) updateFields.email = email;
      if (password) updateFields.password = password;
      if (status) updateFields.status = status;

      updateFields.updated_at = updated_at;

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      const updateQuery =
        "UPDATE user SET " +
        Object.keys(updateFields)
          .map((key) => `${key} = ?`)
          .join(", ") +
        " WHERE id = ?";

      const updateValues = [...Object.values(updateFields), id];

      const [rows, fields] = await pool.query(updateQuery, updateValues);
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = usersController;
