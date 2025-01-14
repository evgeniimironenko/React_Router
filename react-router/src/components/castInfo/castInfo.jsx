import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./castInfo.module.css";
import fetchData from "../helpers/helpers";

const CastInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchData("/movie/" + id + "/credits", {
          language: "en-US",
        });
        setData(data);
      } catch (err) {
        setError("Failed to load movie cast. Try again later.");
      }
    };

    getCast();
  }, [id]);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        data && (
          <>
            {data.cast.length === 0 ? (
              <p>No cast available.</p>
            ) : (
              <ul className={css.castList}>
                {data.cast.map((actor) => (
                  <li key={actor.id} className={css.castItem}>
                    <img
                      className={css.castImg}
                      src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                      alt={actor.name}
                    />
                    <p className={css.castName}> {actor.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )
      )}
    </>
  );
};

export default CastInfo;
