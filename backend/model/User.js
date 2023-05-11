const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id_manager: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateNaissance: {
    type: Date,
  },
  adresse: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    unique: true,
    type: String,
  },
  etablissement: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
