import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { setSelectedUser } from '@/redux/user/authSlice';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { setMessages } from '@/redux/chat/chatSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ChatPage = () => {
  const { user, suggestedUsers ,selectedUser } = useSelector(store => store.auth);
  const {onlineUsers,messages }= useSelector(store=>store.chat)
  const dispatch = useDispatch()
  const [textMessage ,setTextMessage] = useState("");
  const {socket} =useSelector(store=>store.socketio)
  
  const sendMessageHandler = async(receiverId) =>{
    try{
      const res = await axios.post(`/messages/message/${receiverId}`,{textMessage},{ withCredentials: true,headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      if(res.data){
        dispatch(setMessages([...messages,res.data.newMessage]));
        setTextMessage('')
      }
    }catch(err){
      console.log(err);
      
    }
   

  }
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage])); // ✅ Redux update
    });
  
    return () => {
      socket?.off("newMessage"); // ✅ Prevent memory leak
    };
  }, [socket, messages, dispatch]);

  const navigate = useNavigate()
  const { userId } = useParams();
  useEffect(() => {
    dispatch(setSelectedUser(null));
    dispatch(setMessages([]));
  }, [userId]);

 

    const handleUserClick = async (suggestedUser) => {
      dispatch(setSelectedUser(suggestedUser));
    
      try {
        const res = await axios.get(`/messages/message/${suggestedUser._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
    
        if (res.data && res.data.messages) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
  
  
  useEffect(() => {
    if (selectedUser?._id) {
      navigate(`/main/messages/${selectedUser._id}`);
    }
  }, [selectedUser, navigate]);

  

useEffect(() => {
  if (userId && suggestedUsers.length > 0) {
    const matchedUser = suggestedUsers.find(user => user._id === userId);
    if (matchedUser) {
      handleUserClick(matchedUser);
    }
  }
}, [userId, suggestedUsers]);
  return (
    <div className='flex h-screen md:ml-[17%] w-full md:w-300  '>
      <section className='w-[50%]md:w-1/4 my-8'>
        <h1 className='font-bold mb-4 px-3 text-xl'> {user?.username}</h1>
        <hr className='mb-4 border-gray-300' />
        <div className='overflow-y-auto  h-[80vh]'>
          {
            suggestedUsers?.map((suggestedUser) => {
              const isOnline = onlineUsers?.includes(suggestedUser._id);
              return (
              
                <div  onClick={() => handleUserClick(suggestedUser)}   className={`flex gap-3 items-center p-3 cursor-pointer transition-all
                  ${selectedUser?._id === suggestedUser._id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                  <Avatar  className='w-14 h-14'>
                    <AvatarImage src={suggestedUser?.profilePic} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{suggestedUser?.username}</span>
                    <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>{isOnline ? 'online' : 'offline'}</span>
                  </div>


                </div>
              )
            })
          }
          </div>
          </section>
          
          {
                selectedUser ? (

                  
                      <section className=' w-full  border-l border-l-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-400 sticky top-0  bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePic} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>
                        <Messages selectedUser={selectedUser} />
                        <div className='flex items-center p-4 border-t border-t-gray-300'>
                            <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder="Messages..." />
                            <Button variant='secondary' onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
                        </div>
                    </section>

             
                
                    
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }

            
      
    </div>
  )
}

export default ChatPage
