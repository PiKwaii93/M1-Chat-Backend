const pool = require("../database/db");

const conversationsController = {
  getAllConversations: async (req, res) => {
    try {
      console.log(req.params);
      const [rows, fields] = await pool.query("SELECT * FROM conversation");
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  getAllMessagesInAConversation: async (req, res) => {
    try {
      console.log(req.params);
      const { id_conversation } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM message WHERE id_conversation = (SELECT id FROM conversation WHERE id = ?)",
        [id_conversation]
      );
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  getAllConversationsByUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM conversation WHERE id IN (SELECT id_conversation FROM conversation_to_user WHERE id_user = ?)",
        [id]
      );
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  createConversation: async (req, res) => {
    try {
      const { title, content } = req.body;
      const created_at = new Date();
      const updated_at = new Date();
      const [rows, fields] = await pool.query(
        "INSERT INTO conversation (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)",
        [title, content, created_at, updated_at]
      );
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
};

module.exports = conversationsController;
