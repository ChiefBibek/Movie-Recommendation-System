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
      primary: "#333",
      primary25:'#BB86FC'
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
        components={{animatedComponents,
          DropdownIndicator:null
        }}
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
            color: "#E0E0E0",
          }),
          input: (styles) => ({
            ...styles,
            color: "#E0E0E0",
          }),
          clearIndicator: () => ({
             color: "#E0E0E0",
            cursor:'pointer ',
            marginRight:'0.8rem'
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

export default ActorList;
