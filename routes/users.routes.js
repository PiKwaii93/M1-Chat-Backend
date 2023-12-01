const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAllUsers);
router.get("/getOneUserById/:id", usersController.getOneUserById);
router.post("/createUser", usersController.createUser);
router.put("/updateUser", usersController.updateUser);

module.exports = router;
