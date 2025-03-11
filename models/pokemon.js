const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {type: String, require: true},
    type: String,
    level: {type: Number, min: 1, max: 100, require: true},
    caught: {type: Boolean, default: true}
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon; 

