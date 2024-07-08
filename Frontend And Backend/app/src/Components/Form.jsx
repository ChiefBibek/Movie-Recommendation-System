import React, { useState } from "react";
import axios from "axios";
import GenreList from "./GenreList";
import ActorList from "./ActorList";

const axiosInstance = axios.create({
  baseURL: "https://movie-recommendation-system-14.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const Form = ({ onSubmit, setLoading }) => {
  const [selectedgenre, setSelectedGenre] = useState([]);
  const [selectedactor, setSelectedActor] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let formdata = {
      selectedgenre: selectedgenre,
      selectedactor: selectedactor,
    };
    axiosInstance
      .post("/recommend", formdata)
      .then((response) => {
        const movies = response.data.recommendations;
        onSubmit(movies);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("Selected genres:", selectedgenre);
    console.log("Selected actors:", selectedactor);
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="m-8 sm:m-0 md:flex md:justify-center md:items-start md:flex-col"
    >
      <div className="sm:mt-4 ">
        <label
          htmlFor=""
          className="text-[#BB86FC] text-sm sm:text-lg lg:text-xl  font-semibold "
        >
          Choose your preferred genre
        </label>
        <GenreList setSelectedGenre={setSelectedGenre} />
      </div>
      <div className="sm:m-0 sm:mt-3">
        <label
          htmlFor=""
          className="text-[#BB86FC] text-sm  sm:text-lg lg:text-xl  font-semibold "
        >
          Choose your preferred Actors
        </label>
        <ActorList setSelectedActor={setSelectedActor} />
      </div>
      <input
        type="submit"
        value="Recommend Movie"
        className="bg-[#BB86FC] text-[#121212] mt-8 px-[0.5rem] py-[0.2rem] text-sm rounded-md cursor-pointer sm:py-2 lg:px-[2rem] border-none"
      />
    </form>
  );
};

export default Form;
