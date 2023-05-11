const mongoose = require("mongoose");

const congeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  periode: {
    type: String,
    required: true,
  },
  labelle: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Conge", congeSchema);
