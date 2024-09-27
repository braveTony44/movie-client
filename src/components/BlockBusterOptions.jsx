import React from 'react';
import { Link } from 'react-router-dom';

function BlockBusterOptions() {  // Fixed naming convention
  const genres = ['Action', 'Thriller', 'Horror', 'Comedy', 'Fantasy', 'Drama'];

  return (
    <div>
      <section className="text-gray-400 mt-3 body-font bg-gray-900">
        <div className="container flex capitalize items-center justify-center px-5 md:pt-20 pt-40 mx-auto">
          <div className="flex flex-wrap gap-2 capitalize -m-4">
            {genres.map((genre, idx) => (
              <div key={idx} className="p-1">
                <div className="border border-gray-500 border-opacity-75 p-3 cursor-pointer rounded-lg">
                  <Link to={`/movies/${genre}`} className="text-base text-white hover:text-blue-300 font-medium title-font">
                    {genre}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlockBusterOptions;
