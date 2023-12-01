const express = require("express");
const router = express.Router();
const conversationsController = require("../controllers/conversations.controller");

router.get("/", conversationsController.getAllConversations);
router.get(
  "/getAllMessagesInAConversation/:id_conversation",
  conversationsController.getAllMessagesInAConversation
);
router.get(
  "/getAllConversationsByUserId/:id",
  conversationsController.getAllConversationsByUserId
);
router.post("/createConversation", conversationsController.createConversation);

module.exports = router;
