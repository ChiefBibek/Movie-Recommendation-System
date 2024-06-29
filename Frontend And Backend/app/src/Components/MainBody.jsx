import React from 'react'

const MainBody = ({movieres}) => {
  console.log(movieres)
  return (
    <div className='m-5 '>
        <h1 className='text-[#E9AFA3] font-semibold sm:text-lg md:text-xl lg:text-2xl'>Recommended Movies are:</h1>
        <ul>{movieres.map((movie,index)=>(
          <li key={index} className='text-[#E9AFA3] font-semibold sm:text-lg md:text-xl lg:text-2xl'>{movie}</li>
        ))}
        </ul>

    </div>
  )
}

export default MainBody