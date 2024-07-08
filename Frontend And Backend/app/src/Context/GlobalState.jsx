import React, { createContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://movie-recommendation-system-14.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});


export const GlobalContext = createContext();

//provider
export const GlobalProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get('/genres');
        const data = response.data;
        const transformed = data.genres.map((genre) => ({
          label: genre,
          value: genre,
        }));
        setGenres(transformed);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <GlobalContext.Provider value={{ options: genres }}>
      {children}
    </GlobalContext.Provider>
  );
};
