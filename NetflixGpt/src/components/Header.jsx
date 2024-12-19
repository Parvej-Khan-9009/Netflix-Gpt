import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NETFLIX_LOGO } from "../utils/Constant";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
// import myOpenai from "../utils/openAi";
import HeaderSearchInputBox from "./HeaderSearchInputBox";

function Header() {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSearch = useSelector((store) => store.gptSearch.searchBar);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        dispatch(
          addUser({
            email: email,
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        navigate("/");
      }
    });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    }
  }, []);

  function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <div className={`w-full fixed gredient_header ${isScrollDown ? "bg-[#23252dcd]" : "bg-[#23252d]" } sm:py-4 py-3  top-0 z-[3] transition-all duration-100`}>
      <div className="w-full xl:px-[66px] lg:px-[49px] md:px-[47px] sm:px-2 px-2">
        <div className="flex justify-between items-center">
          <div className="flex sm:gap-6 xs:gap-3 gap-3 items-center">
            <NETFLIX_LOGO />
            <a href="/browse">
              <div className="md:px-3 px-[10px] md:text-base text-sm sm:py-1 py-[4px] font-bold text-white bg-[#E50914] rounded-lg cursor-pointer transition-all duration-100 transform hover:scale-110">
                Home
              </div>
            </a>
          </div>
          <div
            className={
              toggleSearch
                ? "lg:w-full flex gap-12 items-center"
                : "flex sm:gap-10 xs:gap-4 gap-2 items-center"
            }
          >
            {toggleSearch ? (
              <div className="lg:block hidden w-full xl:ml-14 ml-8">
                <HeaderSearchInputBox />
              </div>
            ) : (
              <Link to={"/browse/search"}>
                <div className="relative flex md:gap-2 gap-1 items-center transition-all duration-100 transform hover:scale-110 cursor-pointer">
                  <IoSearch className="sm:block hidden md:w-[26px] w-[20px] md:h-[26px] h-[20px]" />
                  <div className="md:w-[100px] xs:w-[80px] w-[84px] md:text-base text-sm rounded-full text-center py-[3px] font-semibold text-white bg-gradient-to-b from-[rgb(255,56,212)] via-[rgb(99,56,255)] to-[rgb(56,202,255)] ">
                    Gpt Search
                  </div>
                </div>
              </Link>
            )}
            <div className="flex sm:gap-3 gap-2 items-center">
              <img
                className="sm:block hidden md:w-[32px] sm:w-[27px] w-[22px] md:h-[32px] sm:h-[27px] h-[22px] rounded-sm"
                src={userData?.photoURL}
              />
              <div
                onClick={logOut}
                className={`  ${toggleSearch ? "lg:w-[115px]" : "lg:w-[85px]"} md:w-[80px] sm:w-[70px] w-[75px] text-center py-1 md:text-base text-sm font-bold text-white bg-[#E50914] rounded-lg cursor-pointer transition-all duration-100 transform hover:scale-110`}
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
      </div>

      {toggleSearch && <div className="lg:hidden md:w-[80%] sm:w-[85%] xs:w-[95%] w-[98%] mx-auto xs:pt-7 pt-5">
        <HeaderSearchInputBox />
      </div>}
    </div>
  );
}

export default Header;
