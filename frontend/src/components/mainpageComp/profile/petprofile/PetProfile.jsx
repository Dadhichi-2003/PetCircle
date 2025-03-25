import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MoreHorizontal } from "lucide-react"
import {DropdownMenu} from "@/components/ui/dropdown-menu"

import React, { useEffect, useState } from 'react'

import ProfileDialog from "./ProfileDialog"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setPetData } from "@/redux/user/authSlice"
import CreatePost from "./CreatePost"
import { RiSettings4Fill } from "react-icons/ri"
import { setPosts } from "@/redux/post/postSlice"
import useGetAllPost from "@/components/hooks/useGetAllPost"

const PetProfile = () => {
  

  const [open ,setOpen] = useState(false)
  const dispatch = useDispatch()
  const id = useParams().id
  const { pet } = useSelector((store) => store.auth);
  const {posts} = useSelector(store => store.post)

  console.log(posts)
  function ProfileDetail({ label, value }) {
    return (
      <div className="flex items-center justify-start gap-1 md:gap-2">
        <span className="font-medium text-slate-500 dark:text-slate-400">{label}:</span>
        <span className="font-semibold">{value}</span>
      </div>
    )
  }

  const profileDetails  = async()=>{
    try{
      const res = await axios.get(`/pet/petprofile/${id}`,{withCredentials:true});
      console.log(res.data)
      dispatch(setPetData(res.data.pet))
      // dispatch(setPosts(res.data.))
    }
    catch(err){
      console.log(err)
    } 
  }


  const getPetPost =  async()=>{
    try{

      const res = await axios.get(`/posts/petpost/${pet?._id}`,{withCredentials:true});
      
      if(res.data){
        const postss = res.data.posts //api ka post aa rha he
        dispatch(setPosts(res.data.posts));
        useEffect(()=>{
            getPetPost()
        },[])
      
      }

    }catch(err){  
      console.log(err)
    }
  }

  useEffect(()=>{
    profileDetails()
    getPetPost()
  },[])

  function PostImage({ src, alt }) {
    return (
      <div className="aspect-square overflow-hidden rounded-lg">
        <img 
          // onClick={ ()=>setOpen(true)}
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        />
      </div>
    )
  }
  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Profile Card */}
          <Card className="mb-8 overflow-hidden  bg-gray-100 dark:bg-slate-800">
            <CardContent className="p-0">
              <div className="flex flex-col md:justify-center   bg-gray-100 dark:bg-slate-800">
               <div className="flex self-end  mr-7">
                  <Dialog className="">
                    <DialogTrigger asChild>
                      <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center ">
                      <button
                        className="text-gray-900 text-lg  hover:cursor-pointer w-80 hover:border-b-2 border-gray-500"
                        
                      >
                        Edit Profile
                      </button>
                      <Dialog >
                          <DialogTrigger asChild>
                           <button onClick={()=>setOpen(true)} className="text-gray-900 text-lg  hover:cursor-pointer w-80 hover:border-b-2 border-gray-500"> Add Post  </button>
                          </DialogTrigger>
                          <DialogContent >
                            <CreatePost open={open} setOpen = {setOpen}/>
                          </DialogContent>

                      </Dialog>
                     
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-col     md:flex-row md:items-center   gap-8 p-8">
                  <Avatar className=" w-60 h-60 rounded-lg  border-white shadow-lg">
                    <AvatarImage
                      src={pet?.profilePic}
                      alt="profilepic"
                    />
                    <AvatarFallback className="text-4xl">PP</AvatarFallback>
                  </Avatar>
                  <ProfileDialog open={open} setOpen={setOpen} />

                  <div className="flex flex-col gap-3 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-3">{pet?.petname}</h1>

                    <div className="grid gap-2">
                      <ProfileDetail label="Owner" value={pet?.owner.username} />
                      <ProfileDetail label="Species" value={pet?.species} />
                      <ProfileDetail label="Breed" value={pet?.breed} />
                      <ProfileDetail label="Age" value={pet?.age} />
                      <ProfileDetail label="Medical " value={pet?.medicalHistory} />
                    </div>
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>

          {/* Posts Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Posts</h2>
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4">
              {
                  posts?.map((post)=>{
                    return  post?.media.map((img)=>{
                      return  <PostImage
                      src={img}
                      alt="Post"
                    />
                    }) 
                  })
              }            
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PetProfile
