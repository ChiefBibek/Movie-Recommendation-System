import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from './Components/Title'
import Form from './Components/Form'
import { GlobalProvider } from './Context/GlobalState'
import MainBody from './Components/MainBody'


function App() {
  const [submitted,setSubmitted]=useState(false)
  const [movieres,setMovieRes]=useState([])
  const handleform=(movies)=>{
    setSubmitted(true)
    setMovieRes(movies)
  }
  return (
    <GlobalProvider>  
      <div className=' sm:flex sm:flex-col sm:flex-start sm:ml-20  md:ml-12 sm:mb-8'>
    <Title/>
    <Form onSubmit={handleform}/>
    </div>
    {submitted &&(
      <>
    <hr />
    <MainBody movieres={movieres}/>
      </>
    )}
    </GlobalProvider>
  )
}

export default App
