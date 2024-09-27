import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./HomePage";
import { useParams } from "react-router-dom";

function Download() {
  const [episodes, setEpisodes] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For general errors
  const [rateLimitError, setRateLimitError] = useState(false); // For rate limiting

  const { title } = useParams();
  const parts = title.split("-");
  const titleData = parts[0];
  const quality = parts[1];

  // Fetch movie and episodes based on selected quality
  const fetchEpisodesByQuality = async () => {
    try {
      setLoading(true); // Start loading

      // Fetch movie details
      const { data: movieData } = await axios.get(
        `${baseUrl}/movie/get/${titleData}`
      );
      setMovie(movieData.response);

      // Fetch episodes based on movieId and quality
      const res = await axios.post(
        `${baseUrl}/episode/get/quality/${movieData.response._id}`,
        { quality }
      );

      setEpisodes(res.data.response); // Assuming the response contains an array of episodes in res.data.response
      setRateLimitError(false); // Reset rate limit error if successful
    } catch (error) {
      console.error("Error fetching episodes:", error);

      // Check for rate limiting (HTTP 429)
      if (error.response && error.response.status === 429) {
        setRateLimitError(true);
      } else {
        setError("Failed to load episodes."); // General error handling
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEpisodesByQuality();
  }, [title]);

  // Handle Loading State
  if (loading) {
    return (
      <div className="text-center text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle Rate Limiting
  if (rateLimitError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-center bg-red-600 px-8 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">Too Many Requests</p>
          <p className="text-lg">You've made too many requests. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Handle General Errors
  if (error) {
    return (
      <div className="text-center text-red-600 h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  // Render Content when loading is done and no errors
  return (
    <div>
      <section className="text-gray-400 h-screen bg-gray-900 body-font">
        <div className="container capitalize h-full px-5 md:py-30 pt-40 pb-28 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">
              {movie ? `Download ${movie.title} ${movie.avilLang} ${quality}p` : "Not Available"}
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              {movie ? movie.shortDesc : "No Description"}
            </p>
          </div>

          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {episodes && episodes.length > 0 ? (
              episodes.map((episode, index) => (
                <a
                  href={episode.downloadLink}
                  className="p-2 cursor-pointer sm:w-1/2 w-full"
                  key={index}
                >
                  <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-indigo-400 w-6 h-6 flex-shrink-0 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3v10m0 0l-4-4m4 4l4-4M8 17h8m2 0h1m-10 4h8m2-5h1"
                      />
                    </svg>
                    <span
                      title={episode.title}
                      className="title-font font-medium text-white capitalize"
                    >
                      {episode.title} - Download - EP {episode.episodeNumber}
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg mx-auto">
                <p className="text-2xl font-bold mb-4">No episodes available for this quality</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Download;
