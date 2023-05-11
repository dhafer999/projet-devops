const mongoose = require("mongoose");

const DepartementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  
});
module.exports = mongoose.model("Departement", DepartementSchema);
