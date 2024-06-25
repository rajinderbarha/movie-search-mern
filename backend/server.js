require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const databaseURI = process.env.MONGO_URI;

mongoose.connect(databaseURI)
    .then(() => {
        console.log('<<<<<<<<<< Database connected >>>>>>>>>>');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    })

// Routes
const movieRoutes = require('./routes/movieRoutes');

app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`<<<<<<<<<< Server running on port ${PORT} >>>>>>>>>>>>>>>`);
})
