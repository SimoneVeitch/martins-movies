import React from "react";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie, toggleWatched, isWatched, genres }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://c8.alamy.com/comp/2DH2TCN/empty-white-vertical-background-without-objectsisolated-white-for-text-2DH2TCN.jpg";
  const imdbUrl = movie.imdb_id
    ? `https://www.imdb.com/title/${movie.imdb_id}/`
    : "#";

  const truncateOverview = (text) => {
    if (text.length > 123) {
      return text.substring(0, 123) + "...";
    }
    return text;
  };

  const genreNames = movie.genre_ids
    .slice(0, 2)
    .map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div className="movie-card">
      {posterUrl && (
        <div className="movie-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>
      )}
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <div className="details-container">
          <div className="stars">
            <FaStar className="star-icon" />
            {movie.vote_average ? (
              <span>{movie.vote_average.toFixed(1)}/10</span>
            ) : (
              <span>Not Rated</span>
            )}
          </div>
          <div className="genres">{genreNames}</div>
        </div>
        <p>{truncateOverview(movie.overview)}</p>
        <div className="button-container">
          {movie.imdb_id && (
            <a
              href={imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-btn"
            >
              Read More
            </a>
          )}
          <button
            className={`watched-btn ${isWatched ? "active" : ""}`}
            onClick={() => toggleWatched(movie.id)}
          >
            {isWatched ? "Watched" : "To Watch"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
