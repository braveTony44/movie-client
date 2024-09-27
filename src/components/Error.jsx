import React, { useState } from "react";
import Layout from "./Layout";

function Error({ message }) {
  const [buttonText, setButtonText] = useState("Try Again");

  const handleClick = () => {
    setButtonText("Loading..."); // Change the text when clicked
    window.location.reload(); // Refresh the page
  };
  return (
    <Layout>
        <section className="text-gray-400 h-screen bg-gray-900 body-font">
      <div className="container px-5 md:py-32 py-96 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
            {message ? message : "Something went wrong"}
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">
            This page no longer exists.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          aria-label="Refresh page"
        >
          {buttonText}
        </button>
      </div>
    </section>
    </Layout>
  );
}

export default Error;
