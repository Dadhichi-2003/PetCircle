import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import store from '@/redux/store'
import { MoreHorizontal } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserComment from './UserComment'
import axios from 'axios'

const CommentDialog = ({ open, setOpen , updateCommentCount }) => {
    const [text, setText] = useState("");
    const { selectedPost } = useSelector(store => store.post);
    const [comment, setComment] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const{posts} = useSelector(store=>store.post)


    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    };

    useEffect(() => {
        if (selectedPost) {
            setComment(selectedPost.comments);
        }
    }, [selectedPost]);


    const sendMessageHandler = async () => {
        try {
            const userId = user?._id;
            const res = await axios.post(
                `/posts/petpost/${selectedPost?._id}/addcomment`, 
                { userId, content: text }, 
                { withCredentials: true }
            );
    
            if (res.data) {
                const newComment = res.data.comment;
                setComment(prev => [...prev, newComment]);
                
                // Notify `Post` component
                updateCommentCount(newComment);
    
                toast.success("Comment added");
                setText("");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="w-max-5xl h-fit p-0 flex flex-col">
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img
                            src={selectedPost?.media}
                            alt="post_img"
                            className='w-full h-full object-cover rounded-l-lg'
                        />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex gap-3 items-center'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.pet.profilePic} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs'>{selectedPost?.pet.petname}</Link>
                                    {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                                </div>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full'>
                                        Add to favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex gap-3 items-center px-4 pt-3 '>
                            <Link>
                                <Avatar>
                                    <AvatarImage src={selectedPost?.pet.profilePic} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <Link className='font-semibold text-xs'>{selectedPost?.pet.petname}</Link>
                                <span className='text-gray-600 text-sm ml-2'>{selectedPost?.caption}</span>
                            </div>
                        </div>
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {
                                comment?.map((comment) => <UserComment key={comment._id} comment={comment} />)
                            }
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>


                                <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />


                                <Button onClick={sendMessageHandler} disabled={!text.trim()} className="hover:bg-primary hover:text-light" variant="outline" >Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog
