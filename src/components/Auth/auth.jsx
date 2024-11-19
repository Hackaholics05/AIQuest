import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { Chip } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";

function Auth() {
  const history = useNavigate();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  }

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSignIn = () => {
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleRegister = () => {
    setError("");
    setLoading(false);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col h-[90vh] p-8 bg-gray-200">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="mb-8 text-xl">Use Services to log into the application</p>
        <div className="flex flex-col w-[300px]">
          <div
            onClick={handleGoogleSignIN}
            className="flex items-center p-3 mb-3 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all"
          >
            <img alt="google" src="" className="w-5" />
            <p className="ml-2">{loading ? "Signing in..." : "Login with Google"}</p>
          </div>
          <div className="flex items-center p-3 mb-3 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all">
            <img alt="github" src="" className="w-5" />
            <p className="ml-2">Login with Github</p>
          </div>
          <div className="flex items-center p-3 mb-3 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all">
            <img alt="facebook" src="" className="w-5" />
            <p className="ml-2">Login with Facebook</p>
          </div>
        </div>
        <div className="flex mt-10 mb-10 w-[300px]">
          <div className="w-full flex flex-col p-6 bg-white shadow-md rounded-lg">
            {register ? (
              <>
                <div className="flex flex-col mb-5">
                  <p className="text-lg mb-2">Username</p>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="p-3 border border-blue-400 rounded-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <p className="text-lg mb-2">Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="p-3 border border-blue-400 rounded-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <p className="text-lg mb-2">Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="p-3 border border-blue-400 rounded-sm focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="mt-4 p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col mb-5">
                  <p className="text-lg mb-2">Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="p-3 border border-blue-400 rounded-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <p className="text-lg mb-2">Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="p-3 border border-blue-400 rounded-sm focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className="mt-4 p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            )}
            <p
              onClick={() => setRegister(!register)}
              className="mt-4 text-center text-blue-500 cursor-pointer underline"
            >
              {register ? "Login" : "Register"} ?
            </p>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Auth;
