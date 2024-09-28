import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "./HomePage";

function ContactUs() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [complainSampleIMG, setComplainSampleIMG] = useState(null);

  // New states for loading, error, and success messages
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userMessage", userMessage);
    formData.append("complainSampleIMG", complainSampleIMG);

    try {
      const res = await axios.post(`${baseUrl}/feedback/create`, formData);
      if (res.data.status === 201) {
        setSuccess("Message sent successfully!"); // Show success message
        setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
      }
    } catch (err) {
      if (err.response || err.response.data.status === 400) {
        setError("Failed to send message. Please check your input.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font relative">
        <div className="container capitalize px-5 pt-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto capitalize leading-relaxed text-base text-blue-300">
              If you find any broken links, please contact us
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required={true}
                    onChange={(e) => setUserName(e.target.value)}
                    id="name"
                    name="name"
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required={true}
                    onChange={(e) => setUserEmail(e.target.value)}
                    id="email"
                    name="email"
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    onChange={(e) => setUserMessage(e.target.value)}
                    name="message"
                    required={true}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="file"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setComplainSampleIMG(e.target.files[0])}
                    accept="image/*" // Only accept image files
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 file:border-0 file:bg-gray-600 file:text-white file:py-1 file:px-3 file:rounded file:mr-2 file:leading-8 file:transition-colors file:duration-200 file:ease-in-out hover:file:bg-gray-700"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handleSubmit}
                  className={`flex mx-auto text-white border-0 py-2 px-8 focus:outline-none rounded text-lg transition-colors duration-200 ease-in-out ${
                    isLoading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
              {error && (
                <div className="p-2 w-full">
                  <p className="text-red-500 text-center">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-2 w-full">
                  <p className="text-green-500 text-center">{success}</p>
                </div>
              )}
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                <span>Email: </span>
                <a
                  href="mailto:manmovie162@gmail.com"
                  className="text-indigo-400"
                >
                  manmovie162@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
