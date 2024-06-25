// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../App.css';
// import icon from '../assets/icon.webp';
// import Spinner from 'react-bootstrap/Spinner';

// const Movies = () => {
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/movies?limit=120');
//                 setMovies(response.data);
//                 setLoading(false); // Set loading to false after data is fetched
//             } catch (error) {
//                 console.error('Error fetching movies:', error);
//                 setLoading(false); // Ensure loading is set to false on error as well
//             }
//         };

//         fetchMovies();
//     }, []);

//     return (
//         <>
//             {loading ? ( // Render Spinner while loading is true
//                 <div className="spinner-container">
//                     <Spinner style={{ width: '100px', height: '100px'}} animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                 </div>
//             ) : (
//                 <div className="roww">
//                     {movies.map(movie => (
//                         <div key={movie._id} className="columnn">
//                             <div className="cardd">
//                                 <img src={movie.poster ? movie.poster : icon} alt={movie.title} />
//                                 <h3>{movie.title}</h3>
//                                 <p>{movie.released}</p>
//                                 <p>Some text</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Movies;





// Movies.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import icon from '../assets/icon.webp';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movies?limit=120');
                setMovies(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false); // Ensure loading is set to false on error as well
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner style={{ width: '100px', height: '100px'}} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="roww">
            {movies.map(movie => (
                <div key={movie._id} className="columnn">
                    <Link to={`/movie/${movie._id}`} className="card-link">
                        <div className="cardd">
                            <img src={movie.poster ? movie.poster : icon} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>{movie.cast.join(', ')}</p>
                            <p>Date Released:{new Date(movie.released).toLocaleDateString()}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Movies;
