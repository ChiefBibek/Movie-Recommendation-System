import React, { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { GlobalContext } from "../Context/GlobalState";

const ActorList = ({ setSelectedActor}) => {
  const animatedComponents = makeAnimated();
  const { options } = useContext(GlobalContext);
  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#00272B",
    },
  });
  const handleChange = (selectedOptions) => {
    setSelectedActor(selectedOptions);
  };

  return (
    <div className="sm:w-[30rem] md:w-[40rem]">
      <Select
        onChange={handleChange}
        components={animatedComponents}
        isMulti
        noOptionsMessage={() => "No actor is found"}
        options={options.actor}
        className="font-semibold text-sm"
        placeholder="Select Actor . . ."
        theme={customTheme}
        styles={{
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#E9AFA3",
          }),
          input: (styles) => ({
            ...styles,
            color: "#E9AFA3",
          }),
          clearIndicator: () => ({
            color: "#E9AFA3",
          }),
          dropdownIndicator: () => ({
            color: "#E9AFA3",
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
          }),
          control: (styles) => ({
            ...styles,
            backgroundColor: "#00272B",
            border: "#00272B",
          }),
          option: (styles, { data, isDisable, isFocused, isSelected }) => ({
            ...styles,
            color: "green",
          }),
          menuList: (styles) => ({
            ...styles,
            backgroundColor: "#00272B",
          }),
          multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: "#00272B",
            color: "blue",
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: "#E9AFA3",
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: "#E9AFA3",
          }),
        }}
      />
    </div>
  );
};

export default ActorList;
