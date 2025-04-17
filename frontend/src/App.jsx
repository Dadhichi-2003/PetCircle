import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './components/homepageComp/Login'
import SignUp from './components/homepageComp/SignUp'
import MainPage from './pages/MainPage'
import Feeds from './components/mainpageComp/feeds/Feeds'
import Profile from './components/mainpageComp/profile/Profile'
import axios from 'axios'
import PrivateRoutes from './components/hooks/PrivateRoutes'
import PetProfile from './components/mainpageComp/profile/petprofile/PetProfile'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'
import CommunityPage from './pages/CommunityPage'
import ChatPage from './components/chatComp/ChatPage'
import {io} from 'socket.io-client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socket/socketSlice'
import { setOnlineUsers } from './redux/chat/chatSlice'
import { setLikeNotification } from './redux/chat/rtnSlice'
import Messages from './components/chatComp/Messages'
import AdoptionPage from './pages/AdoptionPage'
import CommunityProfile from './components/communityComp/CommunityProfile'
import ExpertPage from './pages/ExpertPage'
import AdminDashboard from './components/adminComp/dashboard/AdminDashboard'
import AdminOverview from './components/adminComp/AdminOverview'
import ManageUsers from './components/adminComp/adminpages/ManageUsers'
import ManageExperts from './components/adminComp/adminpages/ManageExperts'
import ManagePosts from './components/adminComp/adminpages/ManagePosts'
import ManageAdoptions from './components/adminComp/adminpages/ManageAdoptions'
import ManageCommunities from './components/adminComp/adminpages/ManageCommunities'


function App() {
  const {onlineUsers,messages }= useSelector(store=>store.chat)
  const dispatch = useDispatch()
  const {user} = useSelector(store => store.auth);
  const {socket} =useSelector(store=>store.socketio)

  useEffect(()=>{
    if(user) {
      const socketio = io( 'http://localhost:3000',{
        query:{
          userId : user?._id
        },
        transports:['websocket']
      });
      dispatch(setSocket(socketio));

      //listen all events
      socketio.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });

      socketio.on('notification',(notification)=>{
        console.log("Received Notification:", notification); 
        dispatch(setLikeNotification(notification))
      });

      return()=>{
        if(socket){  
          socket.close();
        }
        dispatch(setSocket(null));
      }
    }
    else if(socket){
      socket.close();
        dispatch(setSocket(null));
    }
  },[user,dispatch])


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
          {/* admin routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="overview" element={<AdminOverview />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="experts" element={<ManageExperts />} />
            <Route path="posts" element={<ManagePosts />} />
            <Route path="adoptions" element={<ManageAdoptions />} />
            <Route path="communities" element={<ManageCommunities />} />
          </Route>
          <Route path='/main' element={<MainPage />}>
          //index element feed
            <Route index element={<Feeds />} />
            <Route path='feeds' element={<Feeds />} />
            <Route path='messages' element={<ChatPage />} >
                <Route path=':id' element={<Messages/>} ></Route>
            </Route>
            <Route path='community' element={<CommunityPage/>}/>
            <Route path='community/:id' element={<CommunityProfile/>}></Route>
              
          
            <Route path='adoption' element={<AdoptionPage/>}/>
            <Route path='expert' element={<ExpertPage/>}/>
           
            
            <Route path='profile/:id' element={<Profile />} >
              <Route path="petprofile/:id" element={<PetProfile/>}/>
            </Route>
            

          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
