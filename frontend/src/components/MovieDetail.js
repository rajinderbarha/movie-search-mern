// MovieDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import icon from '../assets/icon.webp';
import Spinner from 'react-bootstrap/Spinner';
import '../App.css'

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie:', error);
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner style={{ width: '100px', height: '100px' }} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!movie) {
        return <p style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem"}}>No movies found.</p>
    }

    return (
        <>
            <Link to="/" className="btn btn-primary m-3">Back</Link>
        <div className="movie-detail" >
            <div className='d-flex justify-content-center' style={{width:"100%"}}>
                
            <img className='py-5' src={movie.poster ? movie.poster : icon} alt={movie.title} />
            </div>
            <h2>{movie.title}</h2>
            <p><strong>Plot:</strong> {movie.plot}</p>
            <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong>Rated:</strong> {movie.rated}</p>
            <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
            <p><strong>Languages:</strong> {movie.languages.join(', ')}</p>
            <p><strong>Released:</strong> {new Date(movie.released).toLocaleDateString()}</p>
            <p><strong>Directors:</strong> {movie.directors.join(', ')}</p>
            <p><strong>Writers:</strong> {movie.writers.join(', ')}</p>
            <p><strong>Awards:</strong> {movie.awards.text}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdb.rating}</p>
            <p><strong>IMDB Votes:</strong> {movie.imdb.votes}</p>
            <p><strong>Countries:</strong> {movie.countries.join(', ')}</p>
            <p><strong>Type:</strong> {movie.type}</p>
        </div>
        </>
    );
};

export default MovieDetail;
