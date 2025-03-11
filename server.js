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
app.use(methodOverride('_method'));
app.use(morgan('dev'));

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
    let pokemon;
    if (mongoose.Types.ObjectId.isValid(req.params.pokemonId)){
        pokemon = await Pokemon.findById(req.params.pokemonId);
        if (pokemon) {
            pokemon.isCustom = true;
        } else {
            const apiPokemon = await fetchPokemon();
            pokemon = apiPokemon.find(p => p.id === req.params.pokemonId);
            if (pokemon) {
                pokemon.isCustom = false;
            }
        }
    }
    res.render('pokemons/show.ejs', { pokemon });
});

// -------------Delete the pokemon--------------------

app.delete('/pokemons/:pokemonId', async (req, res) => {
    await Pokemon.findByIdAndDelete(req.params.pokemonId);
    res.redirect('/pokemons');
  });

// --------------Edit the Pokemon Form -----------------

app.get('/pokemons/:pokemonId/edit', async (req, res) => {
    const foundPokemon = await Pokemon.findById(req.params.pokemonId);
    if (!foundPokemon) {
      return res.status(404).send('Pokémon not found');
    }
    res.render('pokemons/edit.ejs', { pokemon: foundPokemon });
  });

//--------------- Update Pokemon ------------------------

app.put('pokemons/:pokemonId', async (req, res) => {
    req.body.caught = !!req.body.caught;
    await Pokemon.findByIdAndUpdate(req.params.pokemonId, req.body);
    res.redirect(`/pokemons/${req.params.pokemonId}`);
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
})