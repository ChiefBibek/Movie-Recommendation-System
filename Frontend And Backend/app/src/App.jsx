import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from './Components/Title'
import Form from './Components/Form'
import { GlobalProvider } from './Context/GlobalState'


function App() {

  return (
    <GlobalProvider>
    <Title/>
    <Form/>
    </GlobalProvider>
  )
}

export default App
