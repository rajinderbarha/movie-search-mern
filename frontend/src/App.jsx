


// // App.js
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Movie from './components/Movie';
// import Search from './components/Search';
// import MovieDetail from './components/MovieDetail';

// function App() {
//     return (
//         <Router>
//             <Search />
//             <div className="App">
//                 <Routes>
//                     <Route exact path="/" element={<Movie />} />
//                     <Route path="/movie/:id" element={<MovieDetail />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movie from './components/Movie';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';
import Movies from './components/Movies'; // Ensure this is imported
import { useState } from 'react';

function App() {
    const [query, setQuery] = useState('');

    return (
        <Router>
            <Search query={query} setQuery={setQuery}/>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Movie />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/search" element={<Movies />} /> {/* New search route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
