import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./HomePage";

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the query from the URL using useLocation and URLSearchParams
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  // Limit the number of words shown in the movie description
  const limitWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Fetch data by query
  const getDataByQuery = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const res = await axios.post(`${baseUrl}/movie/search?q=${query}`);
      if (res.status === 200 && res.data.response.length > 0) {
        setMovies(res.data.response);
      } else {
        setError("No movies found for this search.");
      }
    } catch (err) {
      setError("Error fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      window.scrollTo(0, 0); // Scroll to top of the page
      getDataByQuery();
    }
  }, [query]);

  if (loading) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500"
            role="status"
            aria-label="Loading"
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
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg mx-auto">
          <p className="text-2xl font-bold mb-4">{error}</p>
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
              Search results for: {query}
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>

        <div className="flex flex-wrap -m-4">
          {movies.map((movie, idx) => (
            <div key={idx} className="xl:w-1/4 md:w-1/2 p-4">
              <Link to={`/movies/detail/${movie.title}`}>
                <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                  <img
                    className="max-h-80 rounded w-full object-cover mb-6"
                    src={movie.posterIMG}
                    alt={movie.title}
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Search;
