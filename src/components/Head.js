import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import store from "../utils/store";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const [showSuggetions, setShowSuggetions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggetions(searchCache[searchQuery]);
      } else {
        getSearchSuggetions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggetions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();

    setSuggetions(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 mx-2">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-10 cursor-pointer"
          alt="menu"
          src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png?f=webp"
        />
        <a href="/">
          <img
            className="h-10"
            alt="youtube"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <input
          className="w-1/2 border border-gray-400 p-2 rounded-l-full px-5"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggetions(true)}
          onBlur={() => setShowSuggetions(false)}
        />
        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
          🔍
        </button>
        {showSuggetions && (
          <div className="absolute bg-white py-2 px-2 ml-1 w-[29rem] rounded-lg border border-gray-100">
            <ul>
              {suggetions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
        />
      </div>
    </div>
  );
};

export default Head;
