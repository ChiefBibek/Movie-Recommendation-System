import React, { useState } from 'react'
import GenreList from './GenreList'


const Form = () => {
  const [selectedgenre,setSelectedGenre]=useState([])
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected genres:', selectedgenre);
  };

  return (
    <form action="" onSubmit={handleSubmit} className='m-8 md:flex md:justify-center md:items-center md:flex-col'>
      <label htmlFor="" className="text-[#E9AFA3] text-sm sm:text-lg md:text-xl lg:text-2xl  font-semibold ">Choose your preferred genre</label>
      <GenreList setSelectedGenre={setSelectedGenre}/>
      <input type="submit" value="Recommend Movie" className='bg-[#EDFFEC] text-[#270722] mt-8 px-[0.5rem] py-[0.2rem] text-sm rounded-md cursor-pointer sm:py-2 lg:px-[2rem] border-none ' />
      </form>
  )
}

export default Form
