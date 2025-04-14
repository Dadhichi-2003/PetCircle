import React, { useRef, useState } from 'react'
import { DialogHeader } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { readFileAsDataURL } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';
import { setUserProfile } from '@/redux/user/authSlice';

const CreateExpertPost = ({open , setopen}) => {


    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const {user ,userProfile} = useSelector(store=>store.auth)
   
    
    const dispatch = useDispatch();
    
 


    const createPostHandler=async()=>{
        try{
            setLoading(true)
            const formData = new FormData();
            formData.append("caption" , caption)
            if(file){
                formData.append('media',file)
            }
            const res= await axios.post('/expert/add-post',formData,{withCredentials:true});

            if(res.data){
                toast.success('Post added succesfully!');
                
                dispatch(setUserProfile({ 
                    ...userProfile, 
                    posts: [...(userProfile.posts || []), res.data.post] 
                  }));
                  setopen(false)
                
            }
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }

    }
    const fileChangeHandler = async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              const dataUrl = await readFileAsDataURL(file);
              setImagePreview(dataUrl);
            }
          }
  return (
    <>  
    <div>
        <DialogHeader className='text-center font-semibold mb-2'>Create New Post</DialogHeader>
        <div className='flex my-3 gap-3 items-center'>
          <Avatar>
            <AvatarImage src={user?.profilePic } alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>{user?.username}</h1>
            <span className='text-gray-600 text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
        {
          imagePreview && (
            <div className='w-full h-90 flex items-center justify-center'>
              <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
            </div>
          )
        }
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        <button onClick={() => imageRef.current.click()} className=' w-full mt-2 rounded-lg p-2 text-gray-900 text-center bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</button>
        {
          imagePreview && (
            loading ? (
              <Button className="w-full my-2 mx-auto bg-gray-800 rounded-lg p-2 text-gray-100 hover:bg-gray-700">
                <Loader2 className='mr-2 h-4 w-4 animate-spin text-white' />
                Please wait
              </Button>
            ) : (
              <button   onClick={() => { createPostHandler();  }} type="submit" className=" w-full my-2 mx-auto bg-gray-800 rounded-lg p-2 text-gray-100 hover:bg-gray-700">Post</button>
            )
          )
        }
        </div>
   </>
  )
}

export default CreateExpertPost
