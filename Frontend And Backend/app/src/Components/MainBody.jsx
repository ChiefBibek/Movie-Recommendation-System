import React from 'react'

const MainBody = ({movieres}) => {
  console.log(movieres)
  return (
    <div className='m-5 '>
        <h1 className='text-[#BB86FC]  font-semibold sm:text-lg md:text-xl lg:text-2xl font-list_title'>Top 10 Recommended Movies are:</h1>
        <l>{movieres.map((movie,index)=>(
          <li key={index} className='text-[#E1BBC9] font-semibold text-sm sm:text-lg md:text-xl lg:text-2xl list-[square] font-list' >{movie}</li>
        ))}
        </l>

    </div>
  )
}

export default MainBody