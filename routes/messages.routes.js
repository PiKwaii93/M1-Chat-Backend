const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages.controller");

router.get("/", messagesController.getAllMessages);
router.get("/:id", messagesController.getOneMessageById);
router.post("/", messagesController.sendMessage);

module.exports = router;
