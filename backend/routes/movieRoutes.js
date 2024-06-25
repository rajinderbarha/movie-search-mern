
//////////////// WORKING //////////////////
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Search movies by title
router.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const movies = await Movie.find({ title: { $regex: query, $options: 'i' } });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all movies
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 120;
    try {
        const movies = await Movie.find().limit(limit);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;



