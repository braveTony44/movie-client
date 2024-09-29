import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async"; // Import Helmet for dynamic meta tags
import { baseUrl } from "./HomePage";

function Comman({ type }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limitWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const getMoviesByType = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiType =
        type.toLowerCase() === "movies"
          ? "movie"
          : type.toLowerCase() === "tv shows"
          ? "tv show"
          : type.toLowerCase();

      const res = await axios.get(`${baseUrl}/movie/get/type/${apiType}`);
      if (res.data && res.data.response) {
        setMovies(res.data.response);
      } else {
        setError(`No ${type} found.`);
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
    getMoviesByType();
  }, [type]);

  // Generate dynamic title and meta description based on movies and type
  const pageTitle = `Download and Watch ${type} Online - Blockbuster Options`;
  const movieTitles = movies.length > 0 ? movies.map(movie => movie.title).join(', ') : '';
  const pageDescription = movies.length > 0
    ? `Explore our ${type} collection. Stream and download your favorite ${type.toLowerCase()} now!`
    : `Discover the latest ${type} on Blockbuster. Stream and download the best ${type.toLowerCase()} available online.`;

  if (loading) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <Helmet>
          <title>Loading {type}... - Blockbuster</title>
          <meta name="description" content={`Loading ${type.toLowerCase()} for you to watch and download.`} />
        </Helmet>
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white mt-4">Loading {type}...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <Helmet>
          <title>{`Error Loading ${type}`} - Blockbuster</title>
          <meta name="description" content={`Failed to load ${type}. Please try again later.`} />
        </Helmet>
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg mx-auto">
          <p className="text-2xl font-bold mb-4">{error}</p>
        </div>
      </section>
    );
  }

  if (!loading && !error && movies.length === 0) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <Helmet>
          <title>{`No ${type} Found`} - Blockbuster</title>
          <meta name="description" content={`No ${type} found. Please check back later for the latest ${type.toLowerCase()}.`} />
        </Helmet>
        <p className="text-white text-xl">No {type} found.</p>
      </section>
    );
  }

  return (
    <>
      {/* Helmet for dynamic SEO */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <section className="text-gray-400 body-font bg-gray-900">
        <div className="container px-5 capitalize md:py-24 pt-40 pb-28 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                {type}
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

          <div className="flex capitalize flex-wrap -m-4">
            {movies.map((movie, idx) => (
              <div key={idx} className="xl:w-1/4 md:w-1/2 p-4">
                <Link to={`/movies/detail/${movie.title}`}>
                  <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                    <img
                      loading="lazy"
                      className="max-h-80 rounded w-full object-cover mb-6"
                      height={300}
                      width={300}
                      src={movie.posterIMG || '/placeholder-image.png'} // Fallback to a placeholder
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
    </>
  );
}

export default Comman;
