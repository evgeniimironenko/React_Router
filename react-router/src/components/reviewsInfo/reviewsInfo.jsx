import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./reviewsInfo.module.css";
import fetchData from "../helpers/helpers";

const ReviewsInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchData("/movie/" + id + "/reviews", {
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
            {data.results.length === 0 ? (
              <p>No reviews available.</p>
            ) : (
              <ul className={css.reviewsList}>
                {data.results.map((review) => (
                  <li key={review.id} className={css.reviewsItem}>
                    <p className={css.reviewsName}>{review.author}</p>
                    <p className={css.reviewsContent}>{review.content}</p>
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

export default ReviewsInfo;
