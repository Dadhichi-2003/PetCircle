
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { readFileAsDataURL } from '@/lib/utils'
import { setPosts } from '@/redux/post/postSlice'
import { setPetData } from '@/redux/user/authSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const CreatePost = ({open,setOpen}) => {

    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

   
    const {posts} = useSelector(store=>store.post);
    const dispatch = useDispatch();
   
    const { pet } = useSelector((store) => store.auth);

    useEffect(() => {
      if (posts) {
          
      }
  }, [posts]);

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          setFile(file);
          const dataUrl = await readFileAsDataURL(file);
          setImagePreview(dataUrl);
        }
      }

      const getPetPost =  async()=>{
        try{
    
          const res = await axios.get(`/posts/petpost/${pet?._id}`,{withCredentials:true});
          
          if(res.data){
            const postss = res.data.posts //api ka post aa rha he
            dispatch(setPosts(res.data.posts));
            
          
          }
    
        }catch(err){  
          console.log(err)
        }
      }
    

    const createPostHandler = async (e) => {

       
        const formData = new FormData();
        formData.append("petId",pet._id)
        formData.append("caption", caption);
        if (imagePreview) formData.append("media", file);
        console.log("FormData:", formData.get("media"));
        try {
          setLoading(true);
          const res = await axios.post('/posts/addpost', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          });
       
          if (res.data) {

            dispatch(setPosts([res.data.posts, ...posts])); // ✅ Redux update // [1] -> [1,2] -> total element = 2
            setCaption(""); // ✅ Caption clear kar do
            setImagePreview(""); // ✅ Image preview clear karo
            setOpen(false); // ✅ Modal close kar do

            getPetPost();

            const updatedPost = [res.data.posts,...posts]
            dispatch(setPosts(updatedPost))
            toast.success("post added");
            console.log("ho gya")
         
          }
        } catch (error) {
          toast.error("something is not right");
          console.log("Error Response:", error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      }
    
  return (
  <>  <div open={setOpen()}>
        <DialogHeader className='text-center font-semibold mb-2'>Create New Post</DialogHeader>
        <div className='flex my-3 gap-3 items-center'>
          <Avatar>
            <AvatarImage src={pet?.profilePic} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>{pet?.petname}</h1>
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

export default CreatePost
