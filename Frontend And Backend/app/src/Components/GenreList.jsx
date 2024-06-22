import React, { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { GlobalContext } from "../Context/GlobalState";

const GenreList = () => {
  const animatedComponents = makeAnimated();
  const { options } = useContext(GlobalContext);

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
};

export default GenreList;
