import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { readFileAsDataURL } from '@/lib/utils'
import { setAuthUser } from '@/redux/user/authSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { setUserProfile } from '@/redux/user/authSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const EditUserProfile = ({open,setopen}) => {

    const[loading,setLoading] = useState(false)
    const { user , userProfile } = useSelector(store => store.auth);
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            location: "",
            bio: ""
        }
    });

    const dispatch = useDispatch();
    const imageRef = useRef();
    const [profilePic, setProfilePic] = useState(user?.profilePic);

    const submitHandler = async (data) => {

        try{    
            setLoading(true)
        console.log("Form Data:", data);

        const formData = new FormData();

        // Append text fields
        formData.append("username", data.username || ""); // Ensure it is never undefined
        formData.append("location", data.location || "");
        formData.append("bio", data.bio || "");

        // Append file only if it exists
        if (profilePic && typeof profilePic !== "string") {
            formData.append("profilePic", profilePic);
        }
        else {
            
            console.warn("No file selected");
        }
        
        const res = await axios.put(`/upadateownerprofile/${user?._id}`, formData, { withCredentials: true })
        if (res.data) {
            toast.success(res.data.message)
            dispatch(setAuthUser(res.data.profile))
            dispatch(setUserProfile(res.data.profile))
            setopen(false)
            
        }

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        


    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("File chosen:", file);
            setProfilePic(file); // Ensure state updates correctly
        } else {
            console.warn("No file selected");
        }
    };
    return (
        <>
        {open &&
            <div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-col justify-center items-center'>
                    <Avatar className="size-30  shadow-2xl my-2 ring-2 ring-gray-600">
                        <AvatarImage src={user?.profilePic} ></AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>


                    <button type='button' onClick={() => { imageRef.current.click() }} className='text-blue-600 cursor-pointer border-none'>  update profile pic</button>

                </div>

                <div className='flex flex-col justify-center items-center my-6  gap-3'>
                    <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                        <Label>Username</Label>
                        <Input type="text" className='' placeholder={user?.username} {...register("username")} ></Input>
                    </div>
                    <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                        <Label>location</Label>
                        <Input type="text" className='' placeholder={user?.location} {...register("location")} ></Input>
                    </div>
                    <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                        <Label>Bio</Label>
                        <Textarea type="text" className='text-wrap text-sm' placeholder={user.bio} {...register("bio")} ></Textarea>
                    </div>
                    <input type='file' ref={imageRef} className='hidden' onChange={fileChangeHandler}></input>
                    <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                        {

                            loading ? (
                                <Button className="w-full my-2 mx-auto bg-gray-800 rounded-lg p-2 text-gray-100 hover:bg-gray-700">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin text-white' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" variant="secondary">Update</Button>
                            )

                        }

                    </div>



                </div>
            </form>
            </div>
        }
       </>
    )
}

export default EditUserProfile
