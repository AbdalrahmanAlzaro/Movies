import React, { useEffect, useState } from 'react';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error(error));

        fetch('/genres')
            .then((response) => response.json())
            .then((data) => setGenres(data))
            .catch((error) => console.error(error));
    }, []);

    const handleGenreFilter = (e) => {
        setGenreFilter(e.target.value);
    };

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMovies = movies.filter((movie) => {
        if (genreFilter && movie.genre_ids.includes(Number(genreFilter))) {
            return true;
        }
        if (searchQuery && movie.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <div>
            <h1>Movies List</h1>
            <div>
                <label>
                    Genre Filter:
                    <select value={genreFilter} onChange={handleGenreFilter}>
                        <option value="">All</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Search:
                    <input type="text" value={searchQuery} onChange={handleSearchQuery} />
                </label>
            </div>
            <ul>
                {filteredMovies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesList;
