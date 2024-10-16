import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Pagination from "./components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [watchedMovies, setWatchedMovies] = useLocalStorage(
    "watchedMovies",
    []
  );
  const [genres, setGenres] = useState([]);
  const resultsPerPage = 20;

  const loadGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=1e448e0dfcdbb565f5d329820065b4d2&language=en`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const loadMovies = async (page = 1, keyword = "") => {
    try {
      const response = await fetch(
        keyword
          ? `https://api.themoviedb.org/3/search/movie?api_key=1e448e0dfcdbb565f5d329820065b4d2&query=${keyword}&page=${page}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=1e448e0dfcdbb565f5d329820065b4d2&page=${page}`
      );
      const data = await response.json();

      setTotalPages(Math.ceil(data.total_results / resultsPerPage));

      const externalIdsPromises = data.results.map(async (movie) => {
        const externalResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=1e448e0dfcdbb565f5d329820065b4d2`
        );
        const externalData = await externalResponse.json();
        return { ...movie, imdb_id: externalData.imdb_id };
      });

      const moviesWithExternalIds = await Promise.all(externalIdsPromises);
      setMovies(moviesWithExternalIds);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const toggleWatched = (movieId) => {
    setWatchedMovies((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  useEffect(() => {
    loadGenres();
    loadMovies(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadMovies(1, searchKeyword);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      loadMovies(page, searchKeyword);
      window.scrollTo(0, 0);
      window.history.pushState(null, "", `?page=${page}`);
    }
  };

  const displayedMovies = movies.slice(0, resultsPerPage);

  useEffect(() => {
    const scrollToTopButton = document.getElementById("scrollToTop");

    const handleScroll = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        scrollToTopButton.style.display = "flex";
      } else {
        scrollToTopButton.style.display = "none";
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", handleScroll);
    scrollToTopButton.addEventListener("click", scrollToTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollToTopButton.removeEventListener("click", scrollToTop);
    };
  }, []);

  return (
    <div className="app">
      <NavBar />
      <Header />
      <SearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearch={handleSearch}
      />
      <MovieList
        movies={displayedMovies}
        toggleWatched={toggleWatched}
        watchedMovies={watchedMovies}
        genres={genres}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />

      <button
        id="scrollToTop"
        className="scroll-to-top"
        style={{ display: "none" }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
};

export default App;
