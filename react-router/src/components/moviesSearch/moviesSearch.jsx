import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchData from "../helpers/helpers";
import css from "./moviesSearch.module.css";

function MoviesSearch() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchResult = searchParams.get("search") ?? "";

  const updateQueryString = (search) => {
    const nextParams = search !== "" ? { search } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    if (searchResult) {
      fetchMovies(searchResult);
    }
    if (searchResult && !query) {
      setQuery(searchResult);
    }
    // eslint-disable-next-line
  }, [searchResult]);

  const fetchMovies = async (searchQuery) => {
    try {
      const data = await fetchData(`/search/movie`, {
        query: searchQuery,
        include_adult: false,
        language: "en-US",
        page: 1,
      });
      setMovies(data.results);
    } catch (err) {
      setError("Не вдалося знайти фільми. Спробуйте пізніше.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateQueryString(query);
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Popular today</h1>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          className={css.searchInput}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </form>

      {movies.length === 0 && searchResult && (
        <p>No movies found for your search query.</p>
      )}

      {movies.length > 0 && (
        <ul className={css.movieList}>
          {movies.map((item) => (
            <li key={item.id}>
              <Link
                to={`/movies/${item.id}`}
                state={{ from: `/movies?search=${query}` }}
              >
                <div className={css.movieListWrapper}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={item.name || item.title}
                  />
                </div>
                <h3>{item.name || item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviesSearch;
