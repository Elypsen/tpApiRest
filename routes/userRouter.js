const express = require("express");
const router = express.Router();
const {
  createUser,
  connectUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { authenticateToken } = require("../authJWT");

router.post("/connect", connectUser);
router.post("/", createUser);

router.use(authenticateToken);

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
