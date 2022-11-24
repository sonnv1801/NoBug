const express = require("express");
const router = express.Router();

const UserController = require("../app/controllers/UserController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

router.get("/", verifyAdmin, UserController.getUsers);
router.put("/:id", verifyUser, UserController.updateUser);
router.delete("/:id", verifyAdmin, UserController.deleteUser);
router.delete("/", verifyAdmin, UserController.deleteAllUsers);

module.exports = router;
