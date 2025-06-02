const mongoose = require('mongoose');


const candidateSchema = new mongoose.Schema({
    candidateId: { type: Number, required: true },  
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    standfor: { type: String, required: true },
    contact: { type: String, required: true },
    vote: { type: Number, default: 0 }
});



const candidateModel = mongoose.model('candidates', candidateSchema);

module.exports = candidateModel;
