const mongoose = require('mongoose');

const soldeSchema = new mongoose.Schema({
    nbJours: {
        type: Number,
        required: true,
    },
    idEmploye: {
        type: String,
        required: true,
    },
    idConge: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Solde',soldeSchema);