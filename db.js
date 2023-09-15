const mongoose = require("mongoose");
const User = require("./models/User");
const argon2 = require("argon2");
const CONNECTION_URL = "mongodb://127.0.0.1:27017/user_connect";
const Team = require("./models/Team");

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  // mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true })
  .then(console.log("connection a la base de donnée reussie!"))
  .catch((error) =>
    // affichage de l'erreur
    console.log("error", "Error connecting to MongoDB", error)
  );

Team.deleteMany().then(console.log("team deleted"))
User.deleteMany().then(console.log("users deleted"));
const admin = new User({
  email: "admin@admin.admin",
  pseudo: "admin",
  password: "admin",
  role: "admin",
});
const players = [
  new User({
    email:"player@one.com",
    pseudo:"player1",
    password: "player1",
  }),
  new User({
    email:"player@two.com",
    pseudo: "player2",
    password: "player2",
  }), 
  new User({
    email:"player@three.com",
    pseudo: "player3",
    password: "player3",
  })
]

async function createAdmin() {
  try {
    const hash = await argon2.hash(admin.password);
    admin.password = hash;
    await User.create(admin);
    console.log("admin créé");
  } catch (err) {
    console.log(err, "\n error creating admin");
  }
}

async function createFakes(){
  for(player of players){
  try {
    const hash = await argon2.hash(player.password);
    player.password = hash;
    await User.create(player);
    console.log("joueur créé");
  } catch (err) {
    console.log(err, "\n error creating admin");
  }
}
}

createAdmin();
createFakes();