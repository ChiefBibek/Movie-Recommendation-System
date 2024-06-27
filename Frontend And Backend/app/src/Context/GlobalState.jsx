import React, { createContext, useEffect, useState } from "react";

const url='https://movie-recommendation-system-14.onrender.com/genres'


export const GlobalContext=createContext()

//provider
export const GlobalProvider=({children})=>{
  const [genres,setGenres]=useState([])
  useEffect(()=>{
    const fetchGenres=async()=>{
      try{
        const response = await fetch(url)
        if(!response.ok){
          throw new Error('Error 404!!')
        }
        const data= await response.json();
        const transformed=data.genres.map(genre=>({
          label:genre,
          value:genre
        }))
        setGenres(transformed)
      } catch(error){
        console.error('Error:',error)
      }
    }
    fetchGenres();
  },[])
    return (
        <GlobalContext.Provider value={{options:genres}}>
            {children}
        </GlobalContext.Provider>
    )
}