import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './components/homepageComp/Login'
import SignUp from './components/homepageComp/SignUp'
import MainPage from './pages/MainPage'
import Feeds from './components/mainpageComp/feeds/Feeds'
import Message from './components/mainpageComp/message/Message'
import PetProfileForm from './components/mainpageComp/profile/PetProfileForm'
import Profile from './components/mainpageComp/profile/Profile'
import axios from 'axios'
import PrivateRoutes from './components/hooks/PrivateRoutes'
import PetProfile from './components/mainpageComp/profile/petprofile/PetProfile'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'
import useGetAllPost from './components/hooks/useGetAllPost'
import CommunityPage from './pages/CommunityPage'



// import './App.css'

function App() {
  
  axios.defaults.baseURL = 'http://localhost:3000'
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/resetpass/:token' element={<ResetPassword/>} />
        <Route path='/forgetpassword' element={<ForgotPassword/>} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path='/main' element={<MainPage />}>
          //index element feed
            <Route index element={<Feeds />} />
            <Route path='feeds' element={<Feeds />} />
            <Route path='community' element={<CommunityPage/>}/>
            <Route path='messages' element={<Message />} />
            
            <Route path='profile' element={<Profile />} >
              <Route path="petprofile/:id" element={<PetProfile/>}/>
            </Route>
            

          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
