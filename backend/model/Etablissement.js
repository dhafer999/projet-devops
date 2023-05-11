const mongoose = require("mongoose");

const EtablissementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  raison_sociale: {
    type: String,
    required: true,
  },
  matricule_fiscale: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date_creation: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  departement : {
  type: String,
    required: true,
}

  
});
module.exports = mongoose.model("Etablissement", EtablissementSchema);
