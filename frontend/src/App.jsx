import { useState } from 'react'

import HomePage from './pages/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'


// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
     </Routes>
    </>
  )
}

export default App
