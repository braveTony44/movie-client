import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from './HomePage';

function CreateMovie() {
  // State to hold form data and loading/error states
  const [movieData, setMovieData] = useState({
    type: '',
    shortDesc: '',
    longDesc: '',
    posterIMG: null,
    movieTitle: '',
    releaseYear: '',
    language: '',
    imdb: '',
    runtime: '',
    director: '',
    genres: [],
    availQualitySample: [],
    availQuality: [],
    availDownloads: []
  });

  const [genresInput, setGenresInput] = useState('');
  const [availQualityInput, setAvailQualityInput] = useState('');
  const [availDownloadsInput, setAvailDownloadsInput] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handlePosterChange = (e) => {
    setMovieData({
      ...movieData,
      posterIMG: e.target.files[0]
    });
  };

  const handleMultipleFilesChange = (e) => {
    setMovieData({
      ...movieData,
      availQualitySample: [...e.target.files]
    });
  };

  const handleGenresChange = () => {
    setMovieData({
      ...movieData,
      genres: genresInput.split(',').map((genre) => genre.trim())
    });
    setGenresInput('');
  };

  const hanldeQualityInput = () => {
    setMovieData({
      ...movieData,
      availQuality: availQualityInput.split(',').map((quality) => quality.trim())
    });
    setAvailQualityInput('');
  };

  const handleAvailDownloads = () => {
    setMovieData({
      ...movieData,
      availDownloads: availDownloadsInput.split(',').map((download) => download.trim())
    });
    setAvailDownloadsInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(''); // Clear previous error

    const formData = new FormData();
    formData.append('type', movieData.type);
    formData.append('shortDesc', movieData.shortDesc);
    formData.append('longDesc', movieData.longDesc);
    formData.append('posterIMG', movieData.posterIMG);
    formData.append('title', movieData.movieTitle);
    formData.append('releaseYear', movieData.releaseYear);
    formData.append('avilLang', movieData.language);
    formData.append('imdbRating', movieData.imdb);
    formData.append('runtime', movieData.runtime);
    formData.append('director', movieData.director);
    
    movieData.genres.forEach((genre) => {
      formData.append('genres', genre);
    });
    
    movieData.availQuality.forEach((quality) => {
      formData.append('availQuality', quality);
    });
    
    movieData.availDownloads.forEach((download) => {
      formData.append('availDownloads', download);
    });

    movieData.availQualitySample.forEach((file) => {
      formData.append('availQualitySample', file);
    });

    try {
      const response = await axios.post(`${baseUrl}/movie/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Movie created successfully:', response.data);
    } catch (error) {
      setError('Error creating movie. Please try again.'); // Set error message
      console.error('Error creating movie:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl text-center text-white mb-8">Create New Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        
        {/* Movie Type - Select */}
        <div>
          <label className="block text-white mb-2">Type</label>
          <select
            name="type"
            value={movieData.type}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Documentary">Documentary</option>
            <option value="Movie">Movie</option>
            <option value="Tv Show">Tv Show</option>
          </select>
        </div>

        {/* Movie Title */}
        <div>
          <label className="block text-white mb-2">Movie Title</label>
          <input
            type="text"
            name="movieTitle"
            value={movieData.movieTitle}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-white mb-2">Short Description</label>
          <textarea
            name="shortDesc"
            value={movieData.shortDesc}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            rows="4"
            required
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-white mb-2">Long Description</label>
          <textarea
            name="longDesc"
            value={movieData.longDesc}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            rows="6"
            required
          />
        </div>

        {/* Poster Image */}
        <div>
          <label className="block text-white mb-2">Poster Image</label>
          <input
            type="file"
            name="posterIMG"
            accept="image/*"
            onChange={handlePosterChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* Genres */}
        <div>
          <label className="block text-white mb-2">Genres (comma-separated)</label>
          <input
            type="text"
            value={genresInput}
            onChange={(e) => setGenresInput(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded"
          />
          <button
            type="button"
            onClick={handleGenresChange}
            className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded"
          >
            Add Genres
          </button>
        </div>

        {/* Release Year */}
        <div>
          <label className="block text-white mb-2">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={movieData.releaseYear}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-white mb-2">Language</label>
          <input
            type="text"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* IMDb Rating */}
        <div>
          <label className="block text-white mb-2">IMDb Rating</label>
          <input
            type="number"
            name="imdb"
            value={movieData.imdb}
            onChange={handleInputChange}
            step="0.1"
            max="10"
            min="0"
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* Runtime */}
        <div>
          <label className="block text-white mb-2">Runtime (minutes)</label>
          <input
            type="number"
            name="runtime"
            value={movieData.runtime}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* Director */}
        <div>
          <label className="block text-white mb-2">Director</label>
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
            required
          />
        </div>

        {/* Available Quality Samples */}
        <div>
          <label className="block text-white mb-2">Available Quality Samples (multiple files)</label>
          <input
            type="file"
            name="availQualitySample"
            accept="image/*"
            multiple
            onChange={handleMultipleFilesChange}
            className="w-full p-3 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Available Quality */}
        <div>
          <label className="block text-white mb-2">Available Quality</label>
          <input
            type="text"
            name="availQuality"
            value={availQualityInput}
            onChange={(e) => setAvailQualityInput(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded"
          />
          <button
            type="button"
            onClick={hanldeQualityInput}
            className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded"
          >
            Add Quality
          </button>
        </div>

        {/* Available Downloads */}
        <div>
          <label className="block text-white mb-2">Available Downloads</label>
          <input
            type="text"
            name="availDownloads"
            value={availDownloadsInput}
            onChange={(e) => setAvailDownloadsInput(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded"
          />
          <button
            type="button"
            onClick={handleAvailDownloads}
            className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded"
          >
            Add Downloads
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Creating...' : 'Create Movie'}
        </button>
      </form>
    </div>
  );
}

export default CreateMovie;
