const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getOneUserById);
router.post("/signup", usersController.createUser);

module.exports = router;
