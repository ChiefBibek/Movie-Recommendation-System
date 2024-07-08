import React, { createContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";

const url = "/api2/genres";

export const GlobalContext = createContext();

//provider
export const GlobalProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error 404!!");
        }
        const data = await response.json();
        const transformed = data.genres.map((genre) => ({
          label: genre,
          value: genre,
        }));
        setGenres(transformed);
        setLoader(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchGenres();
  }, []);
  if (loader) {
    return <Loader/>
  }
  return (
    <GlobalContext.Provider value={{ options: genres }}>
      {children}
    </GlobalContext.Provider>
  );
};
