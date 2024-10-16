// src/api.js
const API_KEY = "1e448e0dfcdbb565f5d329820065b4d2"; // Your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

export const fetchMovies = async (page = 1, query = "") => {
  const response = await fetch(
    `${BASE_URL}/?api_key=${API_KEY}&query=${query}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.results;
};
