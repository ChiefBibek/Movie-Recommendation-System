import React from 'react'

const MainBody = ({movieres}) => {
  console.log(movieres)
  return (
    <div className='m-5 '>
        <h1 className='text-[#BB86FC] underline font-semibold sm:text-lg md:text-xl lg:text-2xl'>Recommended Movies are:</h1>
        <l>{movieres.map((movie,index)=>(
          <li key={index} className='text-[#F3FFB6] font-semibold sm:text-lg md:text-xl lg:text-2xl'>{movie}</li>
        ))}
        </l>

    </div>
  )
}

export default MainBody