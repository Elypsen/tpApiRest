const Team = require("../models/Team");

async function getTeams(req, res) {
  try {
    const teams = await Team.find().populate("members");
    res.status(200).json(teams);
  } catch (err) {
    res.status(404).json({ message: "getTeams : " + err.message });
  }
}

async function getTeam(req, res) {
  try {
    const team = await Team.findById().populate("members");
    res.status(200).json(team);
  } catch (err) {
    res.status(404).json({ message: "getTeam : " + err.message });
  }
}

async function createTeam(req, res) {
  if (typeof req.body.members >= 2) {
    const team = new Team(req.body);
    await team.validate();
    try {
      await Team.create(team);
      res.status(201).json(team);
    } catch (err) {
      res.status(404).json({ message: "createTeam : " + err.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "createTeam : Minimum deux joueurs dans une équipe." });
  }
}

async function updateTeam(req, res) {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(404).json({ message: "updateTeam : " + err.message });
  }
}

async function deleteTeam(req, res) {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `Equipe ${req.params.id} supprimée.` });
  } catch (err) {
    res.status(404).json({ message: "deleteTeam : " + err.message });
  }
}

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
