import React, { createContext } from "react";

const options = [
    { value: 'action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Adventure', label: 'Adventure' }
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