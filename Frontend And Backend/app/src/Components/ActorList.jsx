import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const ActorList = ({ setSelectedActor }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const Message = (inputValue) => `Input ${inputValue}`;
  const animatedComponents = makeAnimated();
  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#00272B",
    },
  });

  const handleChange = (options) => {
    if (options.length <= 3) {
      setSelectedOptions(options);
      setSelectedActor(options);
    }
  };

  return (
    <div className="sm:w-[30rem] md:w-[40rem]">
      <CreatableSelect
        onChange={handleChange}
        components={animatedComponents}
        formatCreateLabel={Message}
        isMulti
        isClearable
        value={selectedOptions}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? (
            <div className="text-red-500">Duplicate Actor Name!!!</div>
          ) : null
        }
        className="font-semibold text-sm"
        placeholder="Input Actor . . ."
        theme={customTheme}
        inputValue={selectedOptions.length >= 3 ? '' : undefined}
        onInputChange={(inputValue, { action }) => {
          if (selectedOptions.length >= 3 && action === 'input-change') {
            return;
          }
        }}
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
