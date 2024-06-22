import React from 'react'
import GenreList from './GenreList'


const Form = () => {

  return (
    <form action="" className='m-5'>
      <label htmlFor="" className="text-[#E9AFA3] text-sm sm:text-lg md:text-xl lg:text-2xl  font-semibold ">Choose your preferred genre</label>
      <GenreList/>
    </form>
  )
}

export default Form
