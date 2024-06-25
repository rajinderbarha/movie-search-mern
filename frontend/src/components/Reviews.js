import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Reviews() {
    const [reviews, setReviews] = useState([])
    const [form, setForm] = useState({
        movieID: "",
        reviewer: "",
        reviewText: "",
        rating: 0,
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/reviews')
            .then(response => {
                setReviews(response.data);
            }).catch(error => {
                console.error('Error fetching reviews:', error);
            })
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/reviews', form)
            .then(response => {
                setReviews([...reviews, response.data]);
                setForm({
                    movieID: "",
                    reviewer: "",
                    reviewText: "",
                    rating: 0
                })

            }).catch(error => {
                console.error('Error adding review:', error);
            })
    };
    return (
        <div>
            <h1>Movie Reviews</h1>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <h2>{review.movieId}</h2>
                        <p>{review.reviewText}</p>
                        <small>Reviewed by {review.reviewer} - Rating: {review.rating}</small>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" name="movieId" value={form.movieId} onChange={handleChange} placeholder="Movie ID" required />
                <input type="text" name="reviewer" value={form.reviewer} onChange={handleChange} placeholder="Reviewer" required />
                <textarea name="reviewText" value={form.reviewText} onChange={handleChange} placeholder="Review" required></textarea>
                <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
