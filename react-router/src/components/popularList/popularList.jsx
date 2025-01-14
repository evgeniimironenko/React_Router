import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../helpers/helpers";
import css from "./moviesList.module.css";

export const PopularList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchData("/trending/all/day", {
          language: "en-US",
          page: 1,
        });
        setMovies(data.results);
      } catch (err) {
        setError("Не вдалося завантажити трендові фільми. Спробуйте пізніше.");
      }
    };

    getTrendingMovies();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Popular today</h1>
      {movies.length === 0 && <p>Loading...</p>}
      <ul className={css.movieList}>
        {movies.map((item) => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`}>
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
    </>
  );
};
