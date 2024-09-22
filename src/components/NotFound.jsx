import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 md:py-32 py-96 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
            404 Page Not Found
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">
            This page no longer exists.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
        <Link to={'/'}>
          <button 
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            aria-label="Go to home page" // Added aria-label for accessibility
          >
            Go to home page
          </button>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
