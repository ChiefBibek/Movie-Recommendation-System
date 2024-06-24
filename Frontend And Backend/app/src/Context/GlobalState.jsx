import React, { createContext } from "react";

const options = {
  genre:  [
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
  ],
  actor:[
    {value:'Tom Hanks',label:'Tom Hanks'},
    {value:'Leo Di Caprio',label:'Leo Di Caprio'},
    {value:'Brad Pitt',label:'Brad Pitt'},
    {value:'Ryan Renolds',label:'Ryan Renolds'},
    {value:'Chris Hemsworth',label:'Chris Hemsworth'},
    {value:'Chris Evans',label:'Chris Evans'},
    {value:'RDJ',label:'RDJ'},
  ]

}

  export const GlobalContext=createContext(options)

//provider
export const GlobalProvider=({children})=>{
    return (
        <GlobalContext.Provider value={{options:options}}>
            {children}
        </GlobalContext.Provider>
    )
}