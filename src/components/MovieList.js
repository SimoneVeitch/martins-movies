import React from "react";
import MovieCard from "./MovieCard";
import "../styles.css";

const MovieList = ({ movies, toggleWatched, watchedMovies, genres }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleWatched={toggleWatched}
          isWatched={watchedMovies.includes(movie.id)}
          genres={genres}
        />
      ))}
    </div>
  );
};

export default MovieList;
