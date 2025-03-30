import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import store from '@/redux/store'
import { MoreHorizontal } from 'lucide-react'

import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const ProfileDialog = ({ post ,img}) => {
    console.log(post)
    const {setPost} = useSelector(store =>store.post)
  const [text, setText] = useState("");
  const {pet} = useSelector(store=>store.auth)
     const changeEventHandler = (e) => {
         const inputText = e.target.value;
         if (inputText.trim()) {
             setText(inputText);
         } else {
             setText("");
         }
     };
     const sendMessageHandler = () => {
         alert(text);    
     }
     return (
        //  <Dialog open={open}>
        //      <DialogContent onInteractOutside={() => setOpen(false)} className="w-max-5xl h-fit p-0 flex flex-col">
                 <div className='flex flex-1'>
                     <div className='w-1/2'>
                         <img
                             src={img}
                             alt="post_img"
                             className='w-full h-full object-cover rounded-l-lg'
                         />
                     </div>
                     <div className='w-1/2 flex flex-col justify-between'>
                         <div className='flex items-center justify-between p-4'>
                             <div className='flex gap-3 items-center'>
                                 <Link>
                                     <Avatar>
                                         <AvatarImage src={pet?.profilePic} />
                                         <AvatarFallback>CN</AvatarFallback>
                                     </Avatar>
                                 </Link>
                                 <div>
                                     <Link className='font-semibold text-xs'>{post?.pet?.petname}</Link>
                                     {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                                 </div>
                             </div>
 
                             <Dialog>
                                 <DialogTrigger asChild>
                                     <MoreHorizontal className='cursor-pointer' />
                                 </DialogTrigger>
                                 <DialogContent className="flex flex-col items-center text-sm text-center">
                                     <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                                         delete post 
                                     </div>
                                    
                                 </DialogContent>
                             </Dialog>
                         </div>
                         <hr />
                         <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            <div className='flex items-center justify-between '>
                                <div className='flex gap-3 items-center'>
                                 <Link>
                                     <Avatar>
                                         <AvatarImage src={pet?.profilePic} />
                                         <AvatarFallback>CN</AvatarFallback>
                                     </Avatar>
                                 </Link>
                                 <div>
                                     <Link className='font-semibold text-xs mr-2'>{pet?.petname}</Link>
                                     <span className='text-gray-600 text-sm'>{post?.caption}</span>
                                 </div>
                             </div>
                             </div>
                        </div>
                       
                         <div className='p-4'>
                             <div className='flex items-center gap-2'>
                                 <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
 
                                
                                 <Button disabled={!text.trim()} onClick={sendMessageHandler} className="hover:bg-primary hover:text-light" variant="outline" >Send</Button>
                             </div>
                         </div>
                         <div className='flex items-center gap-2  pl-4  ' >
                            <FaHeart className='text-red-600'/>  <p >{post?.likes.length} likes</p>
                        </div>
                     </div>
                 </div>
        //      </DialogContent>
        //  </Dialog>
     )
}

export default ProfileDialog
