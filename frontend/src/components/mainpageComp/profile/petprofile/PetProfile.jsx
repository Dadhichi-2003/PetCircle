import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MoreHorizontal } from "lucide-react"
import React, { useEffect, useState } from 'react'
import ProfileDialog from "./ProfileDialog"
import {  useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setPetData } from "@/redux/user/authSlice"
import CreatePost from "./CreatePost"
import { setpetPost } from "@/redux/post/postSlice"
import EditPetProfile from "./EditPetProfile"
import useGetPetPost from "@/components/hooks/useGetPetPost"

const PetProfile = () => {
  useGetPetPost();
  
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const id = useParams().id
  const { pet } = useSelector((store) => store.auth);
  const { petPost } = useSelector(store => store.post);
  console.log(petPost);
  
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    profileDetails()
    // getPetPost()
  }, [petPost])

  function ProfileDetail({ label, value }) {
    return (
      <div className="flex justify-center items-center md:justify-start md:items-center  mb-2  md:gap-2 ">
        <span className="font-medium text-slate-500 dark:text-slate-400">{label}:</span>
        <span className="font-semibold">{value}</span>
      </div>
    )
  }

  const profileDetails = async () => {
    try {
      const res = await axios.get(`/pet/petprofile/${id}`, { withCredentials: true });
      console.log(res.data)
      dispatch(setPetData(res.data.pet))
    }
    catch (err) {
      console.log(err)
    }
  }

 
  // const getPetPost = async () => {
  //   try {
  //     const res = await axios.get(`/posts/petpost/${pet?._id}`, { withCredentials: true });
  //     if (res.data) {
  //       dispatch(setpetPost(res.data.posts))
  //       console.log(res.data.posts)
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }



  function PostImage({ src, alt ,post,img}) {
    return (
      <>
        <Dialog>
          <DialogTrigger>
            <div className="aspect-square overflow-hidden rounded-sm">
              <img

                src={src || "/placeholder.svg"}
                alt={alt}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              />
            </div>
          </DialogTrigger>
          <DialogContent>
              <ProfileDialog post={post} img={img} />
          </DialogContent>
        </Dialog>


      </>
    )
  }
  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Profile Card */}
          <Card className="mb-8 overflow-hidden  bg-gray-100 dark:bg-slate-800">
            <CardContent >
              <div className="flex justify-between p-5 bg-gray-100 dark:bg-slate-800">

               
                <div className="flex flex-col items-center md:gap-20 md:flex-row ">
                  <Avatar className=" w-60 h-60 rounded-lg  border-white shadow-lg">
                    <AvatarImage
                      src={pet?.profilePic}
                      alt="profilepic"
                    />
                    <AvatarFallback className="text-4xl">PP</AvatarFallback>
                  </Avatar>
                  

                  <div className="flex flex-col text-center gap-3  md:text-left">
                    <h1 className="text-4xl font-bold my-3">{pet?.petname}</h1>

                    <div className="">
                      <ProfileDetail label="Owner" value={pet?.owner?.username} />
                      <ProfileDetail label="Species" value={pet?.species} />
                      <ProfileDetail label="Breed" value={pet?.breed} />
                      <ProfileDetail label="Age" value={pet?.age} />
                      <ProfileDetail label="Medical " value={pet?.medicalHistory} />
                    </div>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal onClick={() => { setOpen(true) }} className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                  </DialogTrigger>

                  {open && <DialogContent className="flex flex-col items-center text-sm text-center ">

                    <Dialog>
                      <DialogTrigger asChild>
                        <button onClick={() => { setOpen(true) }} className="text-gray-900 text-lg  hover:cursor-pointer w-80 hover:border-b-2 border-gray-500">
                          Edit Profile
                        </button>
                      </DialogTrigger>
                      {open && <DialogContent className="flex flex-col items-center text-sm text-center w-fit">
                        <EditPetProfile open={open} setOpen={setOpen} />
                      </DialogContent>}

                    </Dialog>

                    <Dialog >
                      <DialogTrigger asChild>
                        <button onClick={() => setOpen(true)} className="text-gray-900 text-lg  hover:cursor-pointer w-80 hover:border-b-2 border-gray-500"> Add Post  </button>
                      </DialogTrigger>

                      {open &&

                        <DialogContent >
                          <CreatePost open={open} setOpen={setOpen} />
                        </DialogContent>}


                    </Dialog>

                  </DialogContent>}

                </Dialog>

              </div>
            </CardContent>
          </Card>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Posts</h2>
            <div className=" relative grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4">
              {
                petPost?.map(post => {
                  if (pet?._id === post?.pet._id) {
                    return post?.media?.map((img) => {
                      return <PostImage src={img} alt="post" post={post} img={img} />
                    })
                  }
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
