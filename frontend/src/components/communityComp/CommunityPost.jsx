import React, { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'

import { Textarea } from '../ui/textarea'
import { Image } from 'react-feather'
import { Loader2, SendHorizontal } from 'lucide-react'
import { readFileAsDataURL } from '@/lib/utils'
import { Button } from '../ui/button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { setAllCommPost, setCommPost } from '@/redux/community/communitySlice'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { PiDotsThreeBold } from 'react-icons/pi'

const CommunityPost = ({ open, setOpen }) => {

    const { user } = useSelector(store => store.auth);
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const communityId = useParams().id;
    const dispatch = useDispatch()
    const { communityPosts, getsingleCommPost } = useSelector(store => store.community);

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }
    }


    const createCommunityPostHandler = async () => {

        try {

            setLoading(true);
            const userId = user?._id
            const formData = new FormData();

            formData.append('caption', caption);
            formData.append('media', file);
            formData.append('postedBy', userId)


            const res = await axios.post(`/community/addcommunitypost/${communityId}`, formData, { withCredentials: true });
            if (res.data) {

                dispatch(setAllCommPost([...communityPosts, res.data.post]))
                dispatch(setCommPost([...getsingleCommPost, res.data.post]))
                setOpen(false)
                toast.success("Community post created");
            }

        } catch (err) {

            console.log(err);
            toast.error('Something is wrong , try again')
        } finally {
            setLoading(false)
        }


    }
    return (
        <>
            <div>
                <div className='  '>
                    <div className='flex justify-start items-center gap-3 md:m-4'>

                        <Avatar className='size-12'>
                            <AvatarImage src={user?.profilePic}></AvatarImage>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3 className='font-semibold '>{user?.username}</h3>




                    </div>

                    <div className='m-4'>
                        <textarea value={caption} onChange={(e) => { setCaption(e.target.value) }} type='text' rows={3} className='border-none text-lg w-full  rounded ring-white' placeholder='say something to community...'></textarea>
                    </div>
                    {
                        imagePreview && (
                            <div className='w-full h-90 flex items-center justify-center mb-3 md:mb-0'>
                                <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md md:mx-4  ' />
                            </div>
                        )
                    }
                    <div className='flex justify-between items-center  md:m-4'>
                        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
                        <button onClick={() => imageRef.current.click()} className="flex items-center justify-center md:w-50  text-teal-900 hover:bg-teal-200 hover:text-gray-800 px-3 py-1 rounded-md">
                            <Image size={22} className="mr-2" />
                            {/* //isme send button ayega or text ilkhte hi send aa ayega or user foto selecet kreg to file selection ayega preview kw sath */}
                            <span className='font-semibold text-lg'>Photo</span>
                        </button>
                        {
                            loading ?
                                <Button className="flex justify-center items-center text-gray-800 hover:bg-teal-500 hover:text-gray-700 bg-teal-400  w-50   px-3 py-1 rounded-md">
                                    <Loader2 size={22} className='mr-2 h-4 w-4 animate-spin text-white' />
                                    <span className='font-semibold text-lg'>Please wait</span>
                                </Button> :
                                <button className="flex justify-center items-center text-gray-800 hover:bg-teal-500 hover:text-gray-700 bg-teal-400  w-50   px-3 py-1 rounded-md">
                                    <SendHorizontal onClick={() => { createCommunityPostHandler() }} size={22} className="mr-2" />
                                    {/* //isme send button ayega or text ilkhte hi send aa ayega or user foto selecet kreg to file selection ayega preview kw sath */}
                                    <span className='font-semibold text-lg'>Post</span>
                                </button>
                        }

                    </div>
                </div>
            </div></>
    )
}

export default CommunityPost
