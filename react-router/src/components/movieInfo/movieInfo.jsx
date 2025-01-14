import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import fetchData from "../helpers/helpers";
import css from "./movieInfo.module.css";

const MovieInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";

  console.log(location);

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchData("/movie/" + id, {
          language: "en-US",
        });
        setMovie(data); // зберігаємо весь об'єкт, а не тільки results
      } catch (err) {
        setError("Failed to load movie information. Try again later.");
      }
    };

    getMovie();
  }, [id]);

  return (
    <>
      <Link className={css.backLink} to={backLinkHref}>
        Back
      </Link>

      {error ? (
        <p>{error}</p>
      ) : (
        movie && (
          <>
            <div className={css.movieInfo}>
              <div className={css.poster}>
                <img
                  src={`https://media.themoviedb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className={css.info}>
                <h1>{movie.title}</h1>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h2>Genres</h2>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <ul>
              <li>
                <NavLink
                  to="cast"
                  state={{ from: location.state?.from ?? "/movies" }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  state={{ from: location.state?.from ?? "/movies" }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </>
        )
      )}
    </>
  );
};

export default MovieInfo;
