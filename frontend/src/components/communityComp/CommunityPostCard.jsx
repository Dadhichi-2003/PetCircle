import { setAllComm, setAllCommPost, setCommDetail, setCommPost } from '@/redux/community/communitySlice'
import { setSelectedPost } from '@/redux/post/postSlice'
import { ChevronDown, MessageCircle } from 'lucide-react'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CommentDialog from '../mainpageComp/feeds/posts/CommentDialog'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'axios'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { PiDotsThreeBold } from 'react-icons/pi'
import { toast } from 'sonner'

const CommunityPostCard = ({ post }) => {

    const { user } = useSelector(store => store.auth)
    const { communityPosts , communityDetail,allCommunities,getsingleCommPost} = useSelector(store => store.community);
    const latestPost = useSelector(state =>
        state.community.communityPosts.find(p => p._id === post._id)
    ) || post; // fallback if not found

    const [liked, setLiked] = useState(post?.likes?.includes(user._id) || false)
    const [postLike, setPostLike] = useState(post?.likes?.length || 0);
    const communityId = useParams().id

    const [open, setOpen] = useState(false);




    const dispatch = useDispatch();

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
            toast.error("Failed to delete post ")
        }
    }





    const communityPostDeleteHandler = async () => {
        try {

            const res = await axios.delete(`/community/${communityId}/post/${post._id}`, { withCredentials: true })
            if (res.data.success) {
                toast.success("Post deleted successfully");

                // 👇 Update community detail posts
                const updatedPosts = communityDetail.posts.filter(p => p._id !== post._id);
                const updatedCommunityDetail = {
                  ...communityDetail,
                  posts: updatedPosts
                };
          
                dispatch(setCommDetail(updatedCommunityDetail));
          
                // (Optional) Update allCommunities list if you're showing latest posts there
                const updatedAllComm = allCommunities.map(comm => {
                  if (comm._id === communityDetail._id) {
                    return {
                      ...comm,
                      posts: comm.posts?.filter(p => p._id !== post._id) || []
                    };
                  }
                  return comm;
                });
          
                dispatch(setAllComm(updatedAllComm));


                const updatedCommPosts = communityPosts.filter(p => p._id !== post._id);
                  dispatch(setAllCommPost(updatedCommPosts));

                const updatedSingleCommPosts = getsingleCommPost.filter(p => p._id !== post._id);
                dispatch(setCommPost(updatedSingleCommPosts));
            }

        } catch (err) {
            console.log(err);

        }
    }

    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    const formatTimeAgo = (dateString) => {
        const now = new Date()
        const past = new Date(dateString)
        const diffInSeconds = Math.floor((now - past) / 1000)

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
        return formatDate(dateString)
    }
    return (
        <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden ">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
                <Link to={`/profile/${post?.postedBy._id}`} className="flex items-center">
                    <img
                        src={post?.postedBy.profilePic}
                        alt={post?.postedBy.username}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <h3 className="font-medium text-gray-900">{post?.postedBy.username}</h3>
                        <p className="text-xs text-gray-500">{formatTimeAgo(post?.createdAt)}</p>
                    </div>
                </Link>
                {
                (post.postedBy._id === user._id || communityDetail?.createdBy === user._id) 
                
                && <DropdownMenu>
                    <DropdownMenuTrigger><PiDotsThreeBold className='size-7' /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem><button onClick={() => { communityPostDeleteHandler() }} className='text-red-600  cursor-pointer text-center'> delete  </button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                }


            </div>

            {/* Post Content */}
            <div className="px-4 pb-2">
                <p className="text-gray-800 mb-4">{post?.caption}</p>
            </div>

            {/* Post Images */}
            {post?.media && post?.media.length > 0 && (
                <div className='md:w-200 md:h-full w-full  '>
                    {post?.media.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-120 object-cover"
                        />
                    ))}
                </div>
            )}

            {/* Post Stats */}
            <div className="px-6 py-2 border-t border-gray-100 flex justify-between text-sm text-gray-500">

                <div>
                    {latestPost?.likes.length > 0 && (
                        <span className='font-medium block '> {postLike === 1 ? `${postLike} like ` : `${postLike} likes`}</span>
                    )}
                </div>
                <div>
                    {
                        latestPost.comments?.length > 0 && (
                            <span
                                onClick={() => {
                                    dispatch(setSelectedPost(latestPost));
                                    setOpen(true);
                                }}
                                className='cursor-pointer text-sm text-gray-400'>
                                {latestPost.comments?.length} comments
                            </span>
                        )
                    }
                </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-2 border-t border-gray-100 flex justify-start">
                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-center gap-3'>

                        {
                            liked ? <FaHeart onClick={() => likeOrDislikeHandler()} size={'22px'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={() => likeOrDislikeHandler()} size={'22px'} />
                        }

                        <MessageCircle onClick={() => { dispatch(setSelectedPost(latestPost)); setOpen(true) }} className='cursor-pointer hover:text-gray-600' />

                    </div>
                </div>
            </div>

            <CommentDialog
                open={open}
                setOpen={setOpen}
                updateCommentCount={(newComment) => {
                    const updatedPosts = communityPosts.map(p =>
                        p._id === post._id ? { ...p, comments: [...p.comments, newComment] } : p
                    );
                    dispatch(setAllCommPost(updatedPosts));
                }}
            />
        </div>
    )
}

export default CommunityPostCard
