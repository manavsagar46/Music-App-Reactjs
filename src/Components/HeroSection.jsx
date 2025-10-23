import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { user } = useUser();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const URL = `https://v1.nocodeapi.com/manavsagar/spotify/oPLJPxJrqHooYhoN/search?q=${query}&type=track`;

  async function getData() {
    try {
      setLoading(true);
      let res = await fetch(URL);
      let data = await res.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") getData();
  }

  return (
    <>
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 bg-gray-900 text-white shadow-md">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold cursor-pointer mb-2 md:mb-0">
          Music<span className="text-blue-400">Streaming</span>
        </Link>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-1/2">
          <div className="flex items-center bg-white rounded-lg w-full px-3 py-2">
            <Search className="text-gray-500" size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search music..."
              className="flex-1 bg-transparent outline-none px-2 text-black"
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition w-full md:w-auto"
            onClick={getData}
          >
            Search
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <span className="text-sm text-gray-300">
            Hi, {user?.firstName || "User"} 👋
          </span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      {/* Tagline */}
      {!loading && tracks.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to{" "}
            <span className="text-4xl font-bold">Music Streaming</span> App 🎵
          </h2>
          <p className="text-lg text-gray-900 mt-2">
            Search songs here and enjoy your music!
          </p>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Cards container */}
      <div className="flex flex-col items-center mt-8 gap-8 px-4">
        {tracks.map((element, index) => (
          <div
            key={index}
            className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Album Image */}
              <div className="w-full md:w-64 shrink-0">
                <img
                  src={element.album.images[0].url}
                  alt="track cover"
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>

              {/* Song Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h5 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {element.name}
                  </h5>
                  <p className="text-md md:text-lg text-gray-500 dark:text-gray-400">
                    Artist : {element.artists[0].name}
                  </p>
                  <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
                    Album : {element.album.name}
                  </p>
                  <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
                    Release Date : {element.album.release_date}
                  </p>
                </div>

                {/* Audio Player */}
                <div className="mt-4">
                  <audio
                    src={element.preview_url}
                    controls
                    className="w-full rounded-md outline-none"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSection;
