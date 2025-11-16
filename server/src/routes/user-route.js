const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// If time remains, we will implement user-based task fetching and creation and google and github auth.
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUserById);


module.exports = router;
