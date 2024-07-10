import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const MainBody = ({ movieres }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!Array.isArray(movieres) || movieres.length === 0) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [movieres]);

  return (
    <div className="my-7 px-1 md:px-20">
      {showPopup && (
        <Popup
          message={`No actors matched with '${movieres}'`}
          onClose={() => setShowPopup(false)}
        />
      )}
      {!showPopup && (
        <>
          <h1 className="text-[#BB86FC] font-semibold sm:text-lg md:text-xl lg:text-2xl font-list_title text-center mb-5 md:text-start">
            Top 10 Recommended Movies are:
          </h1>
          <ul className="flex flex-wrap gap-8 justify-center md:justify-start">
            {movieres.map(({ poster, rating, title }, index) => (
              <li key={index} className="text-[#F5F1ED] font-list">
                <div className="w-[10rem] sm:w-[12rem] md:w-[14rem] lg:w-[15rem] bg-zinc-800 h-full">
                  <img
                    src={`${poster}`}
                    alt={`${title}`}
                    className="w-full h-auto"
                  />
                  <div className="flex flex-col text-[0.7rem] p-3">
                    <h2 className="uppercase font-semibold text-base text-[#FFF9FB] sm:text-lg">
                      {title}
                    </h2>
                    <h2 className="text-sm text-[#D3D4D9] sm:text-base">
                      IMDb: {rating}
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MainBody;
