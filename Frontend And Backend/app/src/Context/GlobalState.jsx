import React, { createContext } from "react";

const options = [
    { value: 'action', label: 'Action' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'animation', label: 'Animation' },
    { value: 'biography', label: 'Biography' },
    { value: 'crime', label: 'Crime' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'drama', label: 'Drama' },
    { value: 'family', label: 'Family' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'history', label: 'History' },
    { value: 'horror', label: 'Horror' }
  ]

  export const GlobalContext=createContext(options)

//provider
export const GlobalProvider=({children})=>{
    return (
        <GlobalContext.Provider value={{options:options}}>
            {children}
        </GlobalContext.Provider>
    )
}