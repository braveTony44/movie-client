import React, { useEffect, useState } from "react";
import ContactUs from "./ContactUs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./HomePage";
import { Helmet } from "react-helmet-async";

function MovieDetail() {
  const [movieData, setMovieData] = useState({
    shortDesc: "",
    longDesc: "",
    type: "",
    posterIMG: "",
    movieTitle: "",
    releaseYear: "",
    language: "",
    imdb: "",
    runtime: "",
    genres: [],
    availQualitySample: [],
    availQuality: [],
    availDownloads: [],
  });

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To capture specific error message

  const { title } = useParams();

  const getMovieDetail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/movie/get/${title}`);
      const movie = data.response;

      setMovieData({
        shortDesc: movie.shortDesc,
        type: movie.type,
        longDesc: movie.longDesc,
        posterIMG: movie.posterIMG[0],
        movieTitle: movie.title,
        releaseYear: movie.releaseYear,
        language: movie.avilLang,
        imdb: movie.imdbRating,
        runtime: movie.runtime,
        genres: movie.genres,
        availQualitySample: movie.availQualitySample,
        availQuality: movie.availQuality,
        availDownloads: movie.availDownloads,
      });
      setHasError(false);
    } catch (error) {
      console.error("Error fetching movie details", error);
      setHasError(true);
      setErrorMessage("Failed to load movie details. Please try again later."); // Capture specific error

      if (error.response && error.response.status === 429) {
        // Handle the "Too Many Requests" error (HTTP 429)
        setHasError("tooManyRequests");
      } else {
        setHasError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
    getMovieDetail();
  }, [title]);

  const {
    shortDesc,
    longDesc,
    type,
    posterIMG,
    movieTitle,
    releaseYear,
    language,
    imdb,
    runtime,
    genres,
    availQualitySample,
    availQuality,
    availDownloads,
  } = movieData;

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

  if (hasError === "tooManyRequests") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-center bg-red-600 px-8 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">Too Many Requests</p>
          <p className="text-lg">
            You've made too many requests. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-center bg-red-600 px-8 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">Error!</p>
          <p className="text-lg">{errorMessage}</p>{" "}
          {/* Display specific error message */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{movieTitle} | Movie Details</title>
        <meta name="description" content={shortDesc} />
        <meta property="og:title" content={movieTitle} />
        <meta property="og:description" content={shortDesc} />
        <meta property="og:image" content={posterIMG} />
      </Helmet>
      <section className="text-gray-400 bg-gray-900 body-font pt-10 mt-10 md:mt-2">
        <div className="container capitalize mx-auto flex flex-col px-5 pt-24 justify-center items-center">
          <img
            loading="lazy"
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt={`Poster of ${movieTitle}`} // Descriptive alt text
            src={posterIMG}
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              {movieTitle}
            </h1>
            <p className="mb-8 leading-relaxed">{shortDesc}</p>

            <p className="text-sm mt-2 text-gray-500 mb-1 w-full">
              Key Highlights About The Movie
            </p>

            <div className="container bg-gray-900 px-3 py-4 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                <div className="lg:w-1/2 w-full lg:pr-5 lg:py-6 mb-6 lg:mb-0">
                  <div className="flex border-t mb-1 border-gray-700 py-2">
                    <span className="text-gray-400">Release Year</span>
                    <span className="ml-auto text-white">{releaseYear}</span>
                  </div>
                  <div className="flex border-t mb-1 border-gray-800 py-2">
                    <span className="text-gray-400">Language</span>
                    <span className="ml-auto text-white">{language}</span>
                  </div>
                  <div className="flex border-t border-b mb-1 border-gray-800 py-2 items-center">
                    <span className="text-gray-400">IMDB</span>
                    <div className="flex items-center ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-400 ml-1"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-white">{imdb}/10</span>
                    </div>
                  </div>
                  <div className="flex border-t border-b mb-1 border-gray-800 py-2">
                    <span className="text-gray-400">Runtime</span>
                    <span className="ml-auto text-white">{runtime}</span>
                  </div>
                  <div className="flex border-t border-b mb-1 border-gray-800 py-2">
                    <span className="text-gray-400">Genres</span>
                    <span className="ml-auto text-white">
                      {genres.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mb-8 leading-relaxed">{longDesc}</p>

            {/* Screenshots Section */}
            {availQualitySample.length > 0 ? (
              <div className="text-gray-400 pt-4 bg-gray-900 body-font">
                <span className="font-bold text-xl text-gray-300">
                  Screenshots
                </span>
                <div className="container px-5 py-8 mx-auto">
                  <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                    {availQualitySample.map((sample, i) => (
                      <div key={i} className="sm:w-1/2 mb-10 px-4">
                        <div className="rounded-lg h-64 overflow-hidden">
                          <img
                            alt={`Screenshot ${i + 1} of ${movieTitle}`} // Descriptive alt text
                            className="object-cover object-center h-full w-full"
                            src={sample}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Download Section */}
            <div className="container px-5 pt-20 mx-auto">
              <div className="text-center mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium text-white mb-4">
                  -- Download Links --
                </h1>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                  Download {movieTitle}
                </p>
              </div>

              {type === "Tv Show" ? (
                <>
                  <div className="flex flex-wrap lg:w-full sm:mx-auto sm:mb-2 -mx-2">
                    {availQuality.map((quality, i) => (
                      <div key={i} className="p-2 sm:w-1/2 w-full">
                        <Link to={`/download/${title}-${quality}`}>
                          <div className="bg-indigo-800 hover:bg-indigo-700 rounded flex p-4 h-full items-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 2 24 22"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-indigo-300 w-6 h-6 flex mr-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 3v10m0 0l-4-4m4 4l4-4M8 17h8m2 0h1m-10 4h8m2-5h1"
                              />
                            </svg>
                            <span className="title-font font-medium text-white">
                              {movieTitle} - {quality}p
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap lg:w-full sm:mx-auto sm:mb-2 -mx-2">
                  {availQuality.map((quality, i) => (
                    <div key={i} className="p-2 sm:w-1/2 w-full">
                      <a href={availDownloads[i]}>
                        <div className="bg-indigo-800 hover:bg-indigo-700 rounded flex p-4 h-full items-center cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 2 24 22"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-indigo-300 w-6 h-6 flex mr-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14 3v10m0 0l-4-4m4 4l4-4M8 17h8m2 0h1m-10 4h8m2-5h1"
                            />
                          </svg>
                          <span className="title-font font-medium text-white">
                            {movieTitle} - {quality}p
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ContactUs />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;
