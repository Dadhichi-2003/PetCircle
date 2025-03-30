
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import store from '@/redux/store'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const EditPetProfile = ({open,setOpen}) => {
    const [loading,setLoading]=useState(false);
    const imageRef = useRef();

    const {pet} = useSelector(store=>store.auth);
    const [profilePic,setProfilePic] = useState(pet?.profilePic)
    const dispatch = useDispatch();


    const {register, handleSubmit} = useForm({
        defaultValues:{
            petname:"",
            species:"",
            breed:"",
            age:"",
            medicalHistory:""
        }
    })

    const fileHandler = (e) =>{
        const file = e.target.files?.[0];
        if (file) {
            console.log("File chosen:", file);
            setProfilePic(file); // Ensure state updates correctly
        } else {
            console.warn("No file selected");
        }
    }

    const submitHandler= async(data)=>{

        try{
            setLoading(true)
            console.log(data) 

            const formData = new FormData();

            formData.append("petname",data.petname || "");
            formData.append("species",data.species || "");
            formData.append("breed",data.breed || "");
            formData.append("age",data.age || "");
            formData.append("medicalHistory",data.medicalHistory || "");
           

             // Append file only if it exists
        if (profilePic && typeof profilePic !== "string") {
            formData.append("profilePic", profilePic);
            
        }
        else {
            
            console.warn("No file selected");
        }

        const res = await axios.put(`/pet/editpetprofile/${pet._id}`,formData, { withCredentials: true });

        if(res.data){
            toast.success("Pet Profile Updated!!!")
            console.log(res.data.pet)
            setOpen(false)
        }

        }catch(err){
            console.log(err);
            
        }finally{

            setLoading(false)
        }
       
    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col justify-center items-center mb-5 ' >
                <Avatar className="size-30  shadow-lg my-2 ring-2 ring-gray-600">
                    <AvatarImage src={pet?.profilePic}></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <input type='file' ref={imageRef} className='hidden' onChange={fileHandler}></input>
                <button type='button' onClick={()=>{imageRef.current.click()}} className='text-blue-600 hover:text-blue-800 cursor-pointer'>update profile pic</button>
            </div>
            <div className='my-3 flex flex-col items-center gap-4 '>
                <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label >Petname</Label>
                    <Input type="text" {...register("petname")} placeholder={pet?.petname}></Input>
                </div>
                <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>Species</Label>
                    <Input type="text" {...register("species")} placeholder={pet?.species}></Input>
                </div>
                <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label >Breed</Label>
                    <Input type="text" {...register("breed")} placeholder={pet?.breed}></Input>
                </div>
                <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>Age</Label>
                    <Input type="text" {...register("age")} placeholder={pet?.age}></Input>
                </div>
                <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>medicalHistory</Label>
                    <Input type="text" {...register("medicalHistory")} placeholder={pet?.medicalHistory}></Input>
                </div>
                <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    {

                        loading ? (
                            <Button className="w-full my-2 mx-auto bg-gray-800 rounded-lg p-2 text-gray-100 hover:bg-gray-700">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin text-white' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" variant="secondary" className="w-full my-2 mx-auto bg-gray-800 rounded-lg p-2 text-gray-100 hover:bg-gray-700">Update</Button>
                        )

                    }
                </div>
            
            </div>
            </form>
        </div>
    )
}

export default EditPetProfile
