import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Search() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.trim()) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            };
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [query]);

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${query}`);
            setSuggestions([]); // Clear suggestions after search
        }
    }

    function handleSuggestionClick(suggestion) {
        setQuery(suggestion.title);
        navigate(`/movie/${suggestion._id}`);
        setSuggestions([]); // Clear suggestions after clicking a suggestion
    }

    function highlightMatch(text, query) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <>
                {parts.map((part, index) => 
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="highlight">{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary px-5 mx-2">
            <Container fluid className="px-5 mx-5 py-3">
                <Navbar.Brand href="/">Elastic Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 flex justify-content-end"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="search-form d-flex" onSubmit={handleSubmit} autoComplete="off">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            value={query}
                            id="searchbar"
                            onChange={handleChange}
                            aria-label="Search"
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                        {suggestions.length > 0 && (
                            <div className="search-suggestions">
                                {suggestions.slice(0, 15).map((suggestion) => (
                                    <div
                                        key={suggestion._id}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {highlightMatch(suggestion.title, query)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Search;




// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Search({ query, setQuery }) {
//     const navigate = useNavigate();
//     useEffect(()=> {
//         console.log(query);
//     },[query])
//     function handleChange(e) {
//         setQuery(e.target.value);
//         // console.log(query);
//     }
//     function handleSubmit(e) {
//         e.preventDefault();
//         if (query.trim()) {
//             navigate(`/search?query=${query}`);
//         }
//     }

//     return (
//         <Navbar expand="lg" className="bg-body-tertiary px-5 mx-2">
//             <Container fluid className="px-5 mx-5 py-3">
//                 <Navbar.Brand href="/">Elastic Search</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <Nav
//                         className="me-auto my-2 my-lg-0 flex justify-content-end"
//                         style={{ maxHeight: '100px' }}
//                         navbarScroll
//                     >
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <Nav.Link href="#link">Link</Nav.Link>
//                         <NavDropdown title="Link" id="navbarScrollingDropdown">
//                             <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                             <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                     <Form className="searh-form d-flex" onSubmit={handleSubmit}>
//                         <Form.Control
//                             type="search"
//                             placeholder="Search"
//                             className="me-2"
//                             value={query}
//                             id="searchbar"
//                             onChange={handleChange}
//                             aria-label="Search"
//                         />
//                         <Button variant="outline-success" type="submit">Search</Button>
//                     </Form>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default Search;
