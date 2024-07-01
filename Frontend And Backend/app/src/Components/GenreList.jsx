import React, { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { GlobalContext } from "../Context/GlobalState";

const GenreList = ({ setSelectedGenre }) => {
  const animatedComponents = makeAnimated();
  const { options } = useContext(GlobalContext);
  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#333",
      primary25:'#BB86FC'
    },
  });
  const handleChange = (selectedOptions) => {
    setSelectedGenre(selectedOptions);
  };


  return (
    <div className="sm:w-[30rem] md:w-[40rem]">
      <Select
        onChange={handleChange}
        components={animatedComponents}
        isMulti
        noOptionsMessage={() => "No genre is found"}
        options={options}
        className="font-semibold text-sm"
        placeholder="Select Genre . . ."
        theme={customTheme}
        styles={{
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#E0E0E0",
          }),
          input: (styles) => ({
            ...styles,
            color: "#E0E0E0",
          }),
          clearIndicator: () => ({
            color: "#E0E0E0",
            cursor:'pointer '
          }),
          dropdownIndicator: () => ({
            color: "#E0E0E0",
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
            cursor:'pointer'
          }),
          control: (styles) => ({
            ...styles,
            backgroundColor: "#333",
            border: "#333",
          }),
          option: (styles, { data, isDisable, isFocused, isSelected }) => ({
            ...styles,
            color: "#E0E0E0",
          }),
          menuList: (styles) => ({
            ...styles,
            backgroundColor: "#333",
          }),
          multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: "#333",
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: "#e0e0e0",
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: "#e0e0e0",
            backgroundColor:'#bb86fc'
          }),
        }}
      />
    </div>
  );
};

export default GenreList;
