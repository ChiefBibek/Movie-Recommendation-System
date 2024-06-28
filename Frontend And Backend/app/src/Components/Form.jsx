import React, { useState } from 'react'
import GenreList from './GenreList'
import ActorList from './ActorList'


const Form = ({onSubmit}) => {
  const [selectedgenre,setSelectedGenre]=useState([])
  const [selectedactor,setSelectedActor]=useState([])
  const handleSubmit = (event) => {
    event.preventDefault();
    let formdata={
      selectedgenre:selectedgenre,
      selectedactor:selectedactor
    }
    fetch("/recommend",{
      method:'post',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formdata)
    }).then(response=>response.json()).then(data=>{
      console.log(data)
    })
    // console.log('Selected genres:', selectedgenre);
    // console.log('Selected actors:', selectedactor);
    onSubmit();
  };

  return (
    <form action="" onSubmit={handleSubmit} className='m-8 md:flex md:justify-center md:items-center md:flex-col'>
      <label htmlFor="" className="text-[#E9AFA3] text-sm sm:text-lg md:text-xl lg:text-2xl  font-semibold ">Choose your preferred genre</label>
      <GenreList setSelectedGenre={setSelectedGenre}/>
      <label htmlFor="" className="text-[#E9AFA3] text-sm sm:text-lg md:text-xl lg:text-2xl  font-semibold ">Choose your preferred Actors</label>
      <ActorList setSelectedActor={setSelectedActor}/>
      <input type="submit" value="Recommend Movie" className='bg-[#EDFFEC] text-[#270722] mt-8 px-[0.5rem] py-[0.2rem] text-sm rounded-md cursor-pointer sm:py-2 lg:px-[2rem] border-none ' />
      </form>
  )
}

export default Form
