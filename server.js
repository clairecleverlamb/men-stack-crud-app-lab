const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Pokemon = require('./models/pokemon')

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

app.get('/', async (req, res) => {
    res.render('index.ejs');
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})