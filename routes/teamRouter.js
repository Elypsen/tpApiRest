const express = require("express");
const router = express.Router();
const {
  createTeam,
  getTeam,
  getTeams,
  updateTeam,
  deleteTeam,
} = require("../controller/teamController");
const { authenticateToken } = require("../authJWT");

router.use(authenticateToken);

router.get("/", getTeams);
router.get("/:id", getTeam);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);
 
module.exports = router;
