import React from 'react'
import icon from '../assets/watching-a-movie.png';
function Footer() {
  return (
    <>
     <footer className="text-gray-400 bg-gray-950 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
    <img src={icon} height={22} width={22}/>
      <span className="ml-3 text-xl">𝙼𝚘𝚟𝚒𝚎𝙲𝚞𝚖</span>
    </a>
    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2024 MovieCum.online
     
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <span className='text-base m-1 '>Join now</span>

      <a href="https://t.me/moviecumfree" className="text-gray-400 mt-2 ml-1 hover:text-blue-500 transition duration-300" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path d="M21.5 3.5L2.5 10.75C1.625 11.083 1.633 11.792 2.368 12.041L7.875 13.875L18.667 5.833C18.933 5.633 19.2 5.742 19 5.958L10 15.708V19C10 19.5 10.292 19.625 10.667 19.375L13.542 17.417L18.125 20.458C18.667 20.75 19.125 20.542 19.25 19.875L22.792 4.5C22.958 3.75 22.333 3.292 21.5 3.5Z" />
      </svg>
    </a>

    </span>
  </div>
</footer>
    </>
  )
}

export default Footer