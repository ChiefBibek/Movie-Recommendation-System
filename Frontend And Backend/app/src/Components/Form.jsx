import React, { useState } from "react";
import axios from "axios";
import GenreList from "./GenreList";
import ActorList from "./ActorList";
import Popup from "./Popup";

const axiosInstance = axios.create({
  baseURL: "https://movie-recommendation-system-backend-b3ei.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const Form = ({ onSubmit, setLoading }) => {
  const [selectedgenre, setSelectedGenre] = useState([]);
  const [selectedactor, setSelectedActor] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedgenre.length === 0 && selectedactor.length === 0) {
      setAlertMessage("Please select at least one genre or actor.");
      return;
    }
    setLoading(true);
    let formdata = {
      selectedgenre: selectedgenre,
      selectedactor: selectedactor,
    };
    axiosInstance
      .post("/recommend", formdata)
      .then((response) => {
        const movies = response.data;
        if ((typeof movies)==='object'){
          onSubmit(movies.recommendations);
        }
        else{
          onSubmit(movies)
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setAlertMessage(error.response.data.error);
        } else {
          console.error("Fetch error:", error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("Selected genres:", selectedgenre);
    console.log("Selected actors:", selectedactor);
  };

  return (
    <>
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
            Choose your preferred Genre
          </label>
          <GenreList setSelectedGenre={setSelectedGenre} />
        </div>
        <div className="sm:m-0 sm:mt-3">
          <label
            htmlFor=""
            className="text-[#BB86FC] text-sm  sm:text-lg lg:text-xl  font-semibold "
          >
            Input your preferred Actors (Maximum 3)
          </label>
          <ActorList setSelectedActor={setSelectedActor} />
        </div>
        <input
          type="submit"
          value="Recommend Movie"
          className="bg-[#BB86FC] text-[#121212] mt-8 px-[0.5rem] py-[0.2rem] text-sm rounded-md cursor-pointer sm:py-2 lg:px-[2rem] border-none"
        />
      </form>
      {alertMessage && (
        <Popup message={alertMessage} onClose={() => setAlertMessage("")}/>
       )}
    </>
  );
};

export default Form;
