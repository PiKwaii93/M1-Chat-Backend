const pool = require("../database/db");
const bcrypt = require("bcrypt");

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
      console.log(req.body);

      const { user_name, email, password } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const created_at = new Date(Date.now());
      const updated_at = new Date(Date.now());
      const [rows, fields] = await pool.query(
        "INSERT INTO user (user_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        [user_name, email, hash, created_at, updated_at]
      );
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
};

module.exports = usersController;
