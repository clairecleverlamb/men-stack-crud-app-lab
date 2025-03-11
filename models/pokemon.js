const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        required: true,
    },
    level: {
        type: Number, 
        min: 1, 
        max: 100, 
        required: true,
    },
    caught: {
        type: Boolean, 
        default: true, 
    }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon; 

