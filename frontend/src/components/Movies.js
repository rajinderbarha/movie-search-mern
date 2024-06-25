import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../App.css';
import icon from '../assets/icon.webp';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get('query') || '';
                const endpoint = query ? `http://localhost:5000/api/movies/search?query=${query}` : 'http://localhost:5000/api/movies?limit=120';
                const response = await axios.get(endpoint);
                setMovies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [location.search]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner style={{ width: '100px', height: '100px' }} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
        {movies.length === 0 && <p style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem"}}>No movies found.</p>}
        <div className="roww">
            {movies.map(movie => (
                <div key={movie._id} className="columnn">
                    <Link to={`/movie/${movie._id}`} className="card-link">
                        <div className="cardd">
                            <img src={movie.poster ? movie.poster : icon} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>{movie.cast.join(', ')}</p>
                            <p>Date Released: {new Date(movie.released).toLocaleDateString()}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
            </>
    );
};

export default Movies;
