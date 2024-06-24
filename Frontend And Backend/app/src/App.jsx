import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from './Components/Title'
import Form from './Components/Form'
import { GlobalProvider } from './Context/GlobalState'
import MainBody from './Components/MainBody'


function App() {
  const [submitted,setSubmitted]=useState(false)
  const handleform=()=>{
    setSubmitted(true)
  }
  return (
    <GlobalProvider>
    <Title/>
    <Form onSubmit={handleform}/>
    {submitted &&(
      <>
    <hr />
    <MainBody/>
      </>
    )}
    </GlobalProvider>
  )
}

export default App
