import React, { useEffect } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '../hooks/useGetAllMessage'
import { Button } from '../ui/button'
import useGetRTM from '../hooks/useGetRTM'


const Messages = ({ selectedUser }) => {
    const { id } = useParams(); // Get the user ID from the URL

    useEffect(() => {
        
    }, [id]);


    useGetRTM();
    useGetAllMessage()
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);
    const loggedInUserId = localStorage.getItem('id')
    return (
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePic} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/main/profile/${selectedUser?._id}`}><Button className="h-8 my-2" variant="secondary">View profile</Button></Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                    messages && messages.map((msg) => {

                        return (

                            <div key={msg._id} className={`flex  items-center ${msg.senderId === loggedInUserId ? 'justify-end' : 'justify-start'}`}>
                                {/* {console.log(msg.senderId)}{ console.log(user._id)} */}
                                <div className={`p-2 rounded-lg max-w-xs break-words ${msg?.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {msg?.message}
                                    <p className="text-[0.5rem] block mt-1 text-right align-text-bottom">
                                        {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                                            timeZone: "Asia/Kolkata",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                        })}
                                    </p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Messages
