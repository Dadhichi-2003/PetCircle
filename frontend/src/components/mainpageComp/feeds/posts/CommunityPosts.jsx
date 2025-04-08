import { setAllCommPost } from '@/redux/community/communitySlice';
import { setSelectedPost } from '@/redux/post/postSlice';
import axios from 'axios';
import { MessageCircle, Send } from 'lucide-react';
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import CommentDialog from './CommentDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PiDotsThreeBold } from 'react-icons/pi';

const CommunityPosts = ({ post }) => {

    const { communityPosts } = useSelector(store => store.community);
    const { user } = useSelector(store => store.auth);

    const [liked, setLiked] = useState(post?.likes?.includes(user._id) || false);
    const [postLike, setPostLike] = useState(post?.likes?.length || 0);
    const [comment, setComment] = useState(post?.comments);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();




    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("")
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
                const updatedPostData = communityPosts.map(p =>
                    p._id === post?._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p)
                dispatch(setAllCommPost(updatedPostData))
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


                const updatedPostData = communityPosts.map(p => p._id === post._id ? { ...p, comments: updatedCommentData } : p)
                dispatch(setAllCommPost(updatedPostData));
                setText("")
                toast.success("comment added");

            }
        } catch (err) {
            console.log(err);

        }
    }

   
    return (
        <div>
            <div className='my-8 w-full max-w-sm md:max-w-lg mx-auto'>
                <div className='flex justify-between my-2 '>
                    <div className='flex gap-4 my-2 '>
                        <div className="relative w-12 h-12 ">
                            {/* Community Image (background avatar) */}
                            <img
                                src={post?.community.poster}
                                alt="Community"
                                className="w-full h-full rounded object-cover"
                            />

                            {/* User Image (overlapping avatar) */}
                            <img
                                src={post?.postedBy.profilePic}
                                alt="User"
                                className="w-10 h-10 rounded-full absolute top-2/5 left-1/3 border-2 border-white object-cover"
                            />
                        </div>
                        <div>
                            <p className='flex flex-col justify-center'>
                                <span className='font-bold text-xl'>{post?.community?.name}</span>
                                <span className='text-gray-800  '> posted by {post?.postedBy?.username} </span></p>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <img src={post?.media} alt='post_image'
                        className='rounded-sm my-2  aspect-square object-cover'></img>
                </div>
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
                    <span className='font-medium mr-2'>{post?.postedBy.username}</span>
                    {post?.caption || "No caption available"}

                </p>
                {
                    comment?.length > 0 && (
                        <span onClick={() => {
                            dispatch(setSelectedPost(post));
                            setOpen(true);

                        }} className='cursor-pointer text-sm text-gray-400'>View all {post.comments?.length} comments</span>
                    )
                }


                <CommentDialog
                    open={open}
                    setOpen={setOpen}
                    updateCommentCount={(newComment) => {
                        const updatedComments = [...comment, newComment];
                        setComment(updatedComments);

                        const updatedPosts = communityPosts.map(p =>
                            p._id === post._id ? { ...p, comments: updatedComments } : p
                        );
                        dispatch(setAllCommPost(updatedPosts));
                    }}
                />


                <div className='flex items-center justify-between'>
                    <input type='text ' value={text} placeholder='add a comment' className='outline-none text-sm w-full' onChange={changeEventHandler} />
                    {
                        text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
                    }

                </div>

            </div>
        </div>
    )
}

export default CommunityPosts
