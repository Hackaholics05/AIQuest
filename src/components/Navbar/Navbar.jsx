import React, { useState } from "react";
import { MdOutlineHelpCenter } from "react-icons/md";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { RiInboxArchiveFill } from "react-icons/ri";
import { selectUser } from "../../feature/userSlice";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const user = useSelector(selectUser);

  function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: name ? stringToColor(name) : "rgba(255,255,255,0.8)",
      },
      children: name && `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
              alt="logo"
              className="w-28 object-contain hover:bg-gray-200 p-2 rounded"
            />
          </Link>
          <h3 className="hidden md:block text-sm font-medium cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">
            Products
          </h3>
        </div>

        <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full px-3 py-1">
          <ImSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 border-none outline-none w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <ImSearch
            className="text-gray-500 md:hidden w-5 h-5"
            onClick={() => setShowMobileSearch(true)}
          />

          {user ? (
            <>
              <Avatar
                className="cursor-pointer"
                {...stringAvatar(user && user.displayName)}
                onClick={() => auth.signOut()}
              />
              <RiInboxArchiveFill className="w-6 h-6 cursor-pointer text-gray-500 hover:text-black" />
              <MdOutlineHelpCenter className="w-6 h-6 cursor-pointer text-gray-500 hover:text-black" />
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-black"
                viewBox="0 0 18 18"
                fill="currentColor"
              >
                <path d="M15 1H3a2 2 0 00-2 2v2h16V3a2 2 0 00-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 002-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
              </svg>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>

      {showMobileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-md p-4 w-11/12">
            <div className="flex items-center">
              <ImSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 border-none outline-none w-full"
              />
              <button
                className="text-gray-600 ml-2"
                onClick={() => setShowMobileSearch(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
