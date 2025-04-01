import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'
import React, { useState } from 'react'
import { MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import CommentDialog from './CommentDialog'
import useGetAllPost from '@/components/hooks/useGetAllPost'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/post/postSlice'
import { Badge } from '@/components/ui/badge'



const Post = ({ post }) => {

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    
    const { user } = useSelector(store => store.auth)
    const { pet } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);

    

    const [liked, setLiked] = useState(post?.likes?.includes(user._id) || false)
    const [postLike, setPostLike] = useState(post?.likes?.length || 0);
    const [comment, setComment] = useState(post?.comments)
  
    const dispatch = useDispatch();

   

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("")
        }
    }

    const deletePostHandler = async () => {
        try {
            const petId = pet?._id
            const res = await axios.post(`/posts/petpost/${post?._id}/deletepost`, petId, { withCredentials: true })

            const updatedPostData = posts.filter((postItem) => postItem?._id != post?._id);
            dispatch(setPosts(updatedPostData))
            console.log(res.data)
            toast.success("post deleted")


        } catch (err) {
            toast.error("post not deleted");
            console.log(err)
        }
    }

    const likeOrDislikeHandler = async () => {
        try {
            
    
            const action = liked ? "dislike" : "like";

            const res = await axios.get(`/posts/petpost/${post?._id}/${action}`, { withCredentials: true });

            if (res.data) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked)

                //post update
                const updatedPostData = posts.map(p =>
                    p._id === post?._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p)
                dispatch(setPosts(updatedPostData))
            }


        } catch (err) {
            console.log(err);
        }
    }

    const commentHandler = async () => {
        try {

            const userId = user?._id;
            const res = await axios.post(`/posts/petpost/${post?._id}/addcomment`, { userId, content: text }, { withCredentials: true });

            if (res.data) {
                const updatedCommentData = [...comment, res.data.comment];
            
                setComment(updatedCommentData);
                

                const updatedPostData = posts.map(p => p._id === post._id ? { ...p, comments: updatedCommentData } : p)
                dispatch(setPosts(updatedPostData));
                toast.success("comment added");
                setText("")
            }
        } catch (err) {
            console.log(err);

        }
    }


    return (
        <div className='my-8 w-full max-w-sm md:max-w-lg mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 ' >
                    <Avatar>
                        <AvatarImage src={post?.pet?.profilePic} alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <h1>{post?.pet?.petname}</h1>
                        {user?._id === post?.pet?.owner?._id &&  <Badge variant="" className="bg-gray-500 text-gray-100 hover:bg-gray-400">Author</Badge>}
                    </div>
                </div >

                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold hover:bg-primary hover:text-[#ED4956]">Unfollow</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit  hover:bg-primary hover:text-light">Add to favorites</Button>
                        {
                            user && user?._id === post?.pet?.owner?._id && <Button variant='ghost' onClick={deletePostHandler} className="cursor-pointer w-fit  hover:bg-primary hover:text-light">Delete</Button>
                        }

                    </DialogContent>
                </Dialog>






            </div>
            <img src={post?.media} alt='post_image'
                className='rounded-sm my-2 w-full aspect-square object-cover'></img>


            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-3'>

                    {
                        liked ? <FaHeart onClick={() => likeOrDislikeHandler()} size={'22px'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={() => likeOrDislikeHandler()} size={'22px'} />
                    }

                    <MessageCircle onClick={() => { dispatch(setSelectedPost(post)); setOpen(true) }} className='cursor-pointer hover:text-gray-600' />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
            </div>
            <span className='font-medium block '> {postLike === 1 ? `${postLike} like ` : `${postLike} likes`}</span>
            <p>
                <span className='font-medium mr-2'>{post?.pet?.petname}</span>
                {post?.caption || "No caption available"}

            </p>    
           

            {
                comment?.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                        console.log(post.comments.length)
                    }} className='cursor-pointer text-sm text-gray-400'>View all {post.comments?.length} comments</span>
                )
            }

           
            <CommentDialog open={open} setOpen={setOpen} updateCommentCount={(newComment) => {
                setComment(prev => [...prev, newComment]);
                     dispatch(setPosts(posts.map(p => p._id === post._id ? { ...p, comments: [...p.comments, newComment] } : p)));
}}  />

            <div className='flex items-center justify-between'>
                <input type='text ' value={text} placeholder='add a comment' className='outline-none text-sm w-full' onChange={changeEventHandler} />
                {
                    text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
                }

            </div>
        </div>
    )
}

export default Post
