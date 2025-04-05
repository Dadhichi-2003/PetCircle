import React, { useRef, useState } from 'react'
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { readFileAsDataURL } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import communityPoster from '../../assets/Comm.png'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllComm } from '@/redux/community/communitySlice';



const CreateCommunity = ({open,setOpen}) => {

    const imageRef = useRef();
    const [imagePreview, setImagePreview] = useState("");
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [commName,setCommName] = useState('')
    const [description,setDescription] = useState('');
    const dispatch = useDispatch();
    const {allCommunities} = useSelector(store => store.community)
       

    const fileChangeHandler = async (e) => {

            
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              const dataUrl = await readFileAsDataURL(file);
              setImagePreview(dataUrl);
            }
          }

    const createCommunityHandler=async(e)=>{
        console.log(commName);
        console.log(description);
        
        console.log(file);
        try{
            setLoading(true);
            const formData = new FormData();
            formData.append("name",commName);
            formData.append("description",description);
            formData.append("poster",file);

            console.log(formData)
             
            const res= await axios.post('/community/createcommunity',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  },
                  withCredentials:true});
            if(res.data){
                console.log(res.data.community);
                toast.success("Community Created");
                dispatch(setAllComm([...allCommunities , res.data.community]));
                
                setOpen(false)
            }

        }catch(err){
            console.log(err)
            
        }finally{
            setLoading(false)
        }
        
    }
  return (
    <div>
    <h1 className='font-bold text-2xl text-center my-3  text-teal-900'> Create your Community  </h1>
      <div className='flex items-center justify-center w-full'>
        
      <div>
        {
          imagePreview ? (
            <div className='w-full h-90 flex items-center justify-center'>
              <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md shadow-lg' />
            </div>
          ):(
            <div className='w-full h-90 flex items-center justify-center'>
              <img src={communityPoster} alt="Community Poster" className='object-cover bg-gray-200 h-full w-200 rounded-md shadow-lg' />
            </div>
          )
        }
        <div className='my-2'>
            <Label className='my-2 font-semibold  text-teal-900'>Community Name</Label>
            <Input value={commName} onChange={(e)=>setCommName(e.target.value)} type='text'   className='border-teal-600'/>
        </div>
        <div className='my-2'>
            <Label className='my-2 font-semibold  text-teal-900 ' >Description</Label>
            <Textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} type='text'  className='border-teal-600'/>
        </div>
         <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        <p onClick={() => imageRef.current.click()} className='  w-full mt-2 font-semibold cursor-pointer rounded-lg p-3 text-center text-teal-700 hover:bg-teal-50 '>Select a poster for Community </p>
        {
          imagePreview && (
            loading ? (
              <Button className="w-full my-2 mx-auto bg-teal-800 hover:bg-teal-700 rounded-lg p-2 text-gray-100 ">
                <Loader2 className='mr-2 h-4 w-4 animate-spin text-white' />
                Please wait
              </Button>
            ) : (
              <button   onClick={() => { createCommunityHandler();  }} type="submit" className=" w-full my-2 mx-auto bg-teal-800 rounded-lg p-2 text-gray-100 hover:bg-teal-700">ADD</button>
            )
          )
        }
           

        </div>
      </div>
    </div>
  )
}

export default CreateCommunity
