const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {type: String, require: true},
    type: String,
    abilities: [String],
    imageUrl: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon; 

