import React, { useState } from "react";
import GenreList from "./GenreList";
import ActorList from "./ActorList";

const Form = ({ onSubmit }) => {
  const [selectedgenre, setSelectedGenre] = useState([]);
  const [selectedactor, setSelectedActor] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    let formdata = {
      selectedgenre: selectedgenre,
      selectedactor: selectedactor,
    };
    fetch("http://localhost:4000/recommend", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const movies=data.recommendations
      onSubmit(movies);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
    console.log('Selected genres:', selectedgenre);
    console.log('Selected actors:', selectedactor);
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
