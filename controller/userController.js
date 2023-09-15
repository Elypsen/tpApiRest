const { generateAccessToken } = require("../authJWT");
const User = require("../models/User");
const argon2 = require("argon2");

async function connectUser(req, res) {
  let user;
  try {
    user = await User.findOne({ pseudo: req.body.pseudo });
    try {
      if (await argon2.verify(user.password, req.body.password)) {
        const token = generateAccessToken(user.pseudo);
        res.status(200).json(token);
      } else {
        res.status(400).json({ message: "Mauvais mot de passe ! " });
      }
    } catch (err) {
      res.status(400).json({ message: "connectUser : " + err.message });
    }
  } catch (err) {
    res.status(404).json({ message: "connexion : " + err.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: "get Users : " + err.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "getUser : " + err.message });
  }
}

async function updateUser(req, res) {
  const { email, pseudo } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, pseudo },
      { returnOriginal: false }
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(404).json({ message: "updateUser : " + err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ message: `Utilisateur ${req.params.id} supprimée.` });
  } catch (err) {
    res.status(404).json({ message: "deleteUser : " + err.message });
  }
}

async function createUser(req, res) {
  const user = new User(req.body);
  await user.validate();
  try {
    const hash = await argon2.hash(user.password);
    user.password = hash;
    await User.create(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(404).json({ message: "createUser : " + err.message });
  }
}

module.exports = {
  createUser,
  connectUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
