import React, { useEffect, useState } from 'react';
import BlockBusterOptions from './BlockBusterOptions';
import { Link } from 'react-router-dom';
import axios from 'axios';


export const baseUrl = import.meta.env.VITE_BASE_URL;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [hasError, setHasError] = useState(false); // Error state

  const limitWords = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const getAllMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/movie/get`);
      
      setMovies(response.data.response);
      setHasError(false);
    } catch (error) {
      console.error('Error fetching movies', error);
  
      if (error.response && error.response.status === 429) {
        // Handle the "Too Many Requests" error (HTTP 429)
        setHasError('tooManyRequests');
      } else {
        setHasError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  if (loading) {
    return (
      <section className="text-gray-400 body-font bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white mt-4">Loading movies...</p>
        </div>
      </section>
    );
  }

  if (hasError === 'tooManyRequests') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-center bg-red-600 px-8 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">Too Many Requests</p>
          <p className="text-lg">You've made too many requests. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  if (hasError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-center bg-red-600 px-8 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">Error!</p>
          <p className="text-lg">Failed to load movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlockBusterOptions />
      <section className="text-gray-400 body-font bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                Here you can watch and download Movies and TV series
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {movies ? movies.map((movie, idx) => (
              <div key={idx} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                  <Link to={`/movies/detail/${movie.title}`}>
                    <img
                      className="max-h-80 rounded w-full object-cover mb-6"
                      src={movie.posterIMG || '/placeholder-image.png'} // Fallback to a placeholder
                      alt={movie.title}
                    />
                  </Link>
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
              </div>
            )):(<div className="m-auto h-screen bg-gray-900">
              <div className="text-white text-center bg-red-600 px-8 py-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">Error!</p>
                <p className="text-lg">No Movies Found. Please try again later.</p>
              </div>
            </div>)}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
