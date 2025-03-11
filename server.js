const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
// const fetch = require('node-fetch');

const Pokemon = require('./models/pokemon.js');


//---------Middleware----------------
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));
// app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

//------------------Root Route------------------
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

//------------Catch new pokemon-----------------
app.get('/pokemons/new', (req, res) => {
    res.render('pokemons/new.ejs');
});

app.post('/pokemons', async (req, res) => {
    req.body.caught = !!req.body.caught;
    await Pokemon.create(req.body);
    res.redirect('/pokemons');
});

app.get('/pokemons', async (req, res) => {
    const allPokemons = await Pokemon.find();
    res.render('pokemons/index.ejs', { pokemons:allPokemons });
})

//-------------Show the pokemon---------------------
app.get('/pokemons/:pokemonId', async (req, res) => {
    const foundPokemon = await Pokemon.findById(req.params.pokemonId);
    res.render('pokemons/show.ejs', { pokemon: foundPokemon});
})


app.listen(3000, () => {
    console.log("Listening to port 3000");
})