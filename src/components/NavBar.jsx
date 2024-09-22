import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from '../assets/watching-a-movie.png';
function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="text-gray-400 fixed top-0 left-0 w-full bg-gray-950 body-font z-50">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
        
            <img src={icon} height={22} width={22}/>
          <span className="ml-3 cursor-pointer text-xl">𝙼𝚘𝚟𝚒𝚎𝙲𝚞𝚖</span>
    
         
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/movies" className="mr-5 hover:text-white cursor-pointer">
            Movies
          </Link>

          <Link to="/tv-series" className="mr-5 hover:text-white cursor-pointer">
            TV series
          </Link>

          <Link to="/documentary" className="mr-5 hover:text-white cursor-pointer">
            Documentary
          </Link>
        </nav>
        <form onSubmit={handleSearch}>
          <input
            className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </form>
      </div>
    </header>
  );
}

export default NavBar;
