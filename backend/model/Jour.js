const mongoose = require('mongoose');

const jourSchema = new mongoose.Schema({
    dateDebut: {
        type: Date,
        
    },
    dateFin: {
        type: Date,
        
    },
    title: {
        type: String,

    },
});
module.exports = mongoose.model('Jour',jourSchema);