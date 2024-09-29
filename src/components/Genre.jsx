import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./HomePage";
import BlockBusterOptions from "./BlockBusterOptions"; // Fixed naming

function Genre() {
  const { genre } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limitWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const getMovieByGenre = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/movie/genre/${genre}`);
      if (response.status === 200) {
        setMovies(response.data.response || []);
        setError(null);
      } else {
        setError("Failed to fetch movies. Please try again later.");
      }
    } catch (err) {
      setError("An error occurred while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
    getMovieByGenre();
  }, [genre]);

  if (loading) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white mt-4">Loading movies...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-center bg-red-700 text-white p-8 rounded-lg">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-400 body-font bg-gray-900">
      <div className="container capitalize px-5 md:py-24 pt-40 pb-28 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              {genre}
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>

        <div className="flex flex-wrap -m-4">
          {movies.length > 0 ? (
            movies.map((movie, idx) => (
              <div key={idx} className="xl:w-1/4 md:w-1/2 p-4">
                <Link to={`/movies/detail/${movie.title}`}>
                  <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                    <img
                     loading="lazy"
                      className="max-h-80 rounded w-full object-cover mb-6"
                      src={movie.posterIMG}
                      alt={`Poster for ${movie.title}`} // Descriptive alt text
                    />
                    <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">
                      {movie.type}
                    </h3>
                    <h2 className="text-lg text-white font-medium title-font mb-4">
                      {movie.title}
                    </h2>
                    <p className="leading-relaxed text-base">
                      {limitWords(movie.shortDesc, 20)}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-gray-400 body-font bg-gray-900 h-screen m-auto">
              <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg mx-auto">
                <p className="text-2xl font-bold mb-4">
                  No movies found for this genre.
                </p>
                <p className="text-lg">
                  Please check the genre or try a different one.
                </p>
              </div>
              <BlockBusterOptions /> {/* Fixed naming */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Genre;
