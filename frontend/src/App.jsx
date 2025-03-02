import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './components/homepageComp/Login'
import SignUp from './components/homepageComp/SignUp'
import MainPage from './pages/MainPage'
import Feeds from './components/mainpageComp/Feeds'
import Message from './components/mainpageComp/Message'
import axios from 'axios'


// import './App.css'

function App() {
  
  axios.defaults.baseURL='http://localhost:3000'

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='feeds' element={<Feeds />} />
          <Route path='messages' element={<Message />} />

        </Route>

      </Routes>
    </>
  )
}

export default App
