const mongoose = require("mongoose");

const CarriereSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  date_embauche: {
    type: String,
    required: true,
  },
  date_fin: {
    type: String,
    required: true,
  },
  email_pro: {
    type: String,
    required: true,
  },
  tel_pro: {
    type: String,
    required: true,
  },
  employer: {
    type: String,
    required: true,
  },
  departement : {
  type: String,
    required: true,
}
});
module.exports = mongoose.model("Carriere", CarriereSchema);
