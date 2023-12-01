const pool = require("../database/db");

const messagesController = {
  getAllMessages: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM message");
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  getOneMessageById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM message WHERE id = ?",
        [id]
      );
      res.status(200).json({ data: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  sendMessage: async (req, res) => {
    // Send message to conversation
    try {
      const { conversation_id, sender_id, content } = req.body;
      const created_at = new Date();
      const updated_at = new Date();
      const [rows, fields] = await pool.query(
        "INSERT INTO message ( content, created_at, updated_at, id_user ,id_conversation) VALUES (?, ?, ?, ?, ?)",
        [conversation_id, sender_id, content, created_at, updated_at]
      );
      res.status(200).json({ data: rows });
    } catch (error) {}
  },
};

module.exports = messagesController;
