import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'
import React, { useState } from 'react'

import { MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import CommentDialog from './CommentDialog'


const Post = () => {
    const [text,setText]=useState("");
    const [open ,setOpen] = useState(false)

    const changeEventHandler = (e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText);
        }else{
            setText("")
        }
    }
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="" alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <h1>Username</h1>

                    </div>
                </div >
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold hover:bg-primary hover:text-[#ED4956]">Unfollow</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit  hover:bg-primary hover:text-light">Add to favorites</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit  hover:bg-primary hover:text-light">Delete</Button>
                    </DialogContent>
                </Dialog>

            </div>
            <img src='https://images.pexels.com/photos/28898122/pexels-photo-28898122/free-photo-of-detailed-half-moon-against-black-night-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='post_image'
                className='rounded-sm my-2 w-full aspect-square object-cover'></img>


            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-3'>

                    <FaRegHeart size={'22px'}/>
                    <MessageCircle onClick={()=>setOpen(true)} className='cursor-pointer hover:text-gray-600'/>
                    <Send className='cursor-pointer hover:text-gray-600'/>
                </div>
            </div>
            <span className='font-medium block mb-2'>2k likes</span>
            <p>
                <span className='font-medium mr-2'>Username</span>
                caption
            </p>

            <span onClick={()=>setOpen(true)} > View all 10 Comments</span>
            <CommentDialog open={open} setOpen={setOpen} />

            <div className='flex items-center justify-between'>
                <input type='text ' placeholder='add a comment' className='outline-none text-sm w-full' onChange={changeEventHandler}/>
                {
                    text && <span className='text-[#3BADF8]'>Post</span>
                }
                
            </div>
        </div>
    )
}

export default Post
