import React from "react";
import { useState, useRef, useEffect } from "react";
import { BG_URL, NETFLIX_LOGO, AVATAR } from "../utils/Constant";
import { dataValidation } from "../utils/validate";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../utils/firebase";  // Initializing firebase and getting auth for signin and sihnup.
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function toggleSignInForm() {
    email.current.value = "";
    password.current.value = "";
    setErrorMessage(null);
    setIsSignIn(!isSignIn);
  }
  function submitForm() {
    const validationMessage = dataValidation(email.current.value, password.current.value);
    setErrorMessage(validationMessage);
    if(validationMessage) return null;

    if(isSignIn) {
      // sign in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      // sign up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user , {
            displayName: name.current.value, 
            photoURL: AVATAR
          }).then(() => {
             // Profile updated!
            const { email, uid, displayName, photoURL } = auth.currentUser;
            dispatch( addUser({ email: email, uid: uid, displayName: displayName, photoURL: photoURL }) );
            navigate("/browse");
          }).catch((error) => {
          setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }

  useEffect(()=>{ 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/browse");
      }
    });
    
    return ()=> unsubscribe();
  })

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('${BG_URL}')`,
        }}
      >
        <div className="w-full h-screen bg-black bg-opacity-60 flex flex-col">
          <div className="w-[95%] md:w-[80%] mx-auto py-4 md:py-6">
            <NETFLIX_LOGO />
          </div>
  
          <div className="flex-1 flex lg:mt-12 lg:items-start items-center justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-[95%] max-w-[400px] bg-black bg-opacity-80 px-3 sm:px-10 py-8 sm:py-12 rounded-md"
            >
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white sm:text-center">
                  {isSignIn ? "Sign In" : "Sign Up"}
                </h1>
              </div>
  
              {!isSignIn && (
                <div className="mt-6">
                  <input
                    className="w-full bg-transparent px-4 xs:py-3 py-2 text-white font-medium border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ref={name}
                    type="text"
                    required
                    placeholder="Full Name"
                  />
                </div>
              )}
  
              <div className="mt-6">
                <input
                  className="w-full bg-transparent px-4 xs:py-3 py-[10px] text-white font-medium border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                  ref={email}
                  type="email"
                  required
                  placeholder="Enter Email"
                />
              </div>
  
              <div className="mt-4">
                <input
                  className="w-full bg-transparent px-4 xs:py-3 py-[10px] text-white font-medium border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                  ref={password}
                  type="password"
                  required
                  placeholder="Password"
                />
              </div>
  
              <div className="mt-6">
                <button
                  className="w-full bg-[#ff0c19] hover:bg-red-700 text-white xs:py-3 py-[10px] rounded-md font-semibold transition duration-300"
                  onClick={submitForm}
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </button>
              </div>
  
              {errorMessage && (
                <p className="mt-4 text-center text-red-500">{errorMessage}</p>
              )}
  
              <div className="mt-4 text-gray-400 text-center">
                <h4>OR</h4>
              </div>
  
              <div className="mt-4 text-center">
                <h3
                  className="text-sm sm:text-base font-semibold text-white cursor-pointer hover:underline"
                  onClick={toggleSignInForm}
                >
                  <span className="text-gray-400 font-normal">
                    {isSignIn ? "New to Netflix? " : "Already Registered? "}
                  </span>
                  {isSignIn ? "Sign up now." : "Sign in now."}
                </h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default Login;