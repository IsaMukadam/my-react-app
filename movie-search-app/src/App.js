import React, { useState } from 'react';
import './App.css';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=7e54cb7f";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      <div className="movies">
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie">
              <div>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
              </div>
              <div>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
