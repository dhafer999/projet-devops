const mongoose = require("mongoose");

const demandeSchema = new mongoose.Schema({
  dateDemande: {
    type: String,
    required: true,
  },
  dateConfirmManager: {
    type: String,
  },
  dateConfirmAdmin: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    // Encours , Confirm Manager , Confirm Admin , Refus
  },
  dateDebut: {
    type: String,
    required: true,
  },
  idManager: {
    type: String,
    required: true,
  },
  raison: {
    type: String,
    required: true,
  },
  idConge: {
    type: String,
    required: true,
  },
  idEmploye: {
    type: String,
    required: true,
  },
  nbJours: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Demande", demandeSchema);
