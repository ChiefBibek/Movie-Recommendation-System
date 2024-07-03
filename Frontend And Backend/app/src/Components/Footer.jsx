import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-zinc-800 text-[#BB86FC] text-sm tracking-tighter flex justify-center items-center flex-col p-2 md:py-4 md:text-base'>
        <div>
         &copy; 2024 Movie Recommendation. All rights reserved.
        </div>
        <div>
            Made by <a href="https://github.com/ChiefBibek" target='_blank' className='hover:underline'>Bibek</a> and <a href="https://github.com/AnwitDahal" target='_blank' className='hover:underline'>Anwit</a>
        </div>
    </footer>
  )
}

export default Footer