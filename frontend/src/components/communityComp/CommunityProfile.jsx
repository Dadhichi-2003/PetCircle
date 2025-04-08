import React, { useEffect } from 'react'

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Users,
  Calendar,
  MessageCircle,
  Info,
  Shield,
  Image,
} from "react-feather"

import { SiTicktick } from "react-icons/si";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllComm, setCommDetail, setCommPost } from '@/redux/community/communitySlice'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import CommunityPost from './CommunityPost'
import CommunityPostCard from './CommunityPostCard'
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/user/authSlice';



const CommunityProfile = () => {
  const [activeTab, setActiveTab] = useState("posts")

  const [showMembersList, setShowMembersList] = useState(false);


  
  const [open ,setOpen] = useState(false)
  const { communityDetail ,allCommunities } = useSelector(store => store.community);

  const { user } = useSelector(store => store.auth);
  const {getsingleCommPost} = useSelector(store=>store.community)
  const dispatch = useDispatch()
  const communityId = useParams().id
  const [count ,setCount] = useState(0)


  const getCommunityById = async () => {
    const res = await axios.get(`/community/community/${communityId}`, { withCredentials: true });
    if (res.data) {
      console.log(res.data.community);
      dispatch(setCommDetail(res.data.community));
    }
  }

  const leaveCommunity = async()=>{

    try{

      const res = await axios.post(`community/leave/${communityId}`,user._id,{withCredentials:true});

      if(res.data.success){
        const updatedAllComm = allCommunities.map(comm => {
          if (comm._id === communityId) {
            return {
              ...comm,
              members: comm.members.filter(id => id !== user?._id)
            };
          }         
          return comm;
        });

        const updatedCommDetail = {
          ...communityDetail,
          members: communityDetail.members.filter(id => id !== user?._id)
        };
        
        const authCommUpdate = {
          ...user,
          joinedCommunities : user.joinedCommunities.filter(id => id != communityId)
        }

        dispatch(setAllComm(updatedAllComm));
        dispatch(setCommDetail(updatedCommDetail));
        dispatch(setAuthUser(authCommUpdate));
        
        toast.success('Left community succesfull');
        setCount(count+1);
      }

    }catch(err){
      console.log(err);
      toast.error('Asuvidha ke liye khed he !!!')
      
    }

  }


  const getCommunityPosts= async()=>{
    try{

      const res = await axios.get(`/community/${communityId}/posts`,{withCredentials:true});
      if(res.data){
        console.log(res.data.posts);
        dispatch(setCommPost(res.data.posts));
      }
    

    }catch(err){
      console.log(err);
      
    }

  }

  useEffect(() => {
    getCommunityById();
    getCommunityPosts();
    }, [communityId , count ])

  
    const joinedCommunityHandler= async()=>{
      try{ 
  
        const res = await axios.post(`/community/joincommunity/${communityId}`,{ userId: user._id },{withCredentials:true});
  
        if(res.data){
          console.log(res.data);
          toast.success('community joined succesfuly');
          const allRes = await axios.get('/community/getallcommunities', { withCredentials: true });
          dispatch(setAllComm(allRes.data.communities));
          dispatch(setCommDetail())
          dispatch(
            setAuthUser({
              ...user,
              joinedCommunities: [...user.joinedCommunities, communityId], // Add new community
            })
          )
          setCount(count+1)
        }
     
      }
      catch(err){
  
        console.log(err);
        toast.error('you cannot join the community')
      }
    }
    



  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  //community kab bani uske time dikhane ke liye
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

  

  const isMember = communityDetail?.members?.some(
    (member) => member._id === user?._id
  )

  return (
    <div className="flex flex-col  justify-center items-center bg-gray-50 min-h-screen pb-10 m-5">
      {/* Community Header */}
      <div className="relative">
        <div className="h-64  w-full md:h-79 md:w-200 bg-gray-300 overflow-hidden">
          <img
            src={communityDetail?.poster}
            alt={`${communityDetail?.name} cover`}
            className="w-full h-full object-cover rounded"
          />
        </div>

        <div className="max-w-8xl px-4 md:px-0  ">
          <div className="flex flex-col   md:flex-row md:items-end  ">


            <div className="mt-4 md:mt-0 flex-1">
              <div className="flex  flex-col md:flex-row  md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{communityDetail?.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Users size={16} className="mr-1" />
                    <span>{communityDetail?.members.length} {communityDetail?.members.length > 1 ? `members` : `member`}</span>
                    <span className="mx-2">•</span>
                    <MessageCircle size={16} className="mr-1" />
                    <span>{communityDetail?.posts.length} posts</span>
                    {/* {community.isPrivate && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="flex items-center text-gray-600">
                          <Lock size={16} className="mr-1" />
                          Private
                        </span>
                      </>
                    )} */}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex space-x-3">

                {
                    user?._id === communityDetail?.createdBy._id && <button
                    
                    className={`px-4 py-2 rounded-md cursor-pointer font-medium bg-gray-800 text-gray-200 transition-colors`}
                  >
                    Admin
                  </button>
                }  
                
                {
                 isMember && <button

                  onClick={()=>{leaveCommunity()}}  className={`flex items-center w-50 cursor-pointer justify-center gap-3 px-4 py-2 rounded-md font-medium bg-violet-500 text-gray-200 transition-colors`}
                  >
                    Joined <SiTicktick className='text-gray-200 size-5' />
                  </button>
                } 
                 {
                   !isMember && <button
                    onClick={joinedCommunityHandler}
                    className={`px-4 py-2 rounded-md cursor-pointer font-medium bg-teal-500 text-gray-200 transition-colors`}
                  >
                    Join Community
                  </button>
                } 






                </div>
              </div>

              <p className="mt-2 text-gray-600 max-w-3xl">{communityDetail?.description}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("posts")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "posts"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "about"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "members"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Members
              </button>

            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl flex justify-start items-center px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Column */}
          <div className="w-full">
            {activeTab === "posts" && (
              <div className="space-y-6 md:w-200 w-full">
                {/* Create Post */}
                

                {

                  isMember &&  
                  
                  <div className="bg-white rounded-lg shadow-md p-4">
                  <Dialog >
                  <DialogTrigger asChild>
                    <div onClick={()=>{setOpen(true)}}>
                      <div className="flex">
                        <img
                          src={user?.profilePic}
                          alt="UP"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <input
                          type="text"
                          placeholder="Share something with the community..."
                          className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div className="flex  mt-3 border-t pt-3">
                        <button className="flex items-center text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md">
                          <Image size={18} className="mr-2" />
                          {/* //isme send button ayega or text ilkhte hi send aa ayega or user foto selecet kreg to file selection ayega preview kw sath */}
                          <span>Photo</span>
                        </button>

                      </div>
                    </div>
                  </DialogTrigger>
                {open &&  <DialogContent >
                    <CommunityPost  open={open} setOpen={setOpen} />
                  </DialogContent>}
                  
                </Dialog>
                  </div>
                }
                 



                

                {/* Posts */}

                {
                  getsingleCommPost?.map((post)=>{ 
                    return <CommunityPostCard key={post._id} post={post}/>
                  })
                }
               
              </div>
            )}

            {activeTab === "about" && (
              <div className="md:w-200 w-90 self-start  bg-white  rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {communityDetail?.name}</h2>
                <p className="text-gray-700 mb-6 line-clamp-2 ">{communityDetail?.description}</p>



                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="text-gray-700">{formatDate(communityDetail?.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users size={18} className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="text-gray-700">{communityDetail?.members.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={18} className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Posts</p>
                        <p className="text-gray-700">{communityDetail?.posts.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Info size={18} className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="text-gray-700">
                          {/* {community.isPrivate ? "Private Community" : "Public Community"} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "members" && (
              <div className="bg-white w-90 md:w-200   rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Members ({communityDetail?.members.length})
                  </h2>

                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex items-center md:p-3  rounded-lg hover:bg-gray-50">
                      <img
                        src={communityDetail?.createdBy.profilePic}
                        alt={communityDetail?.createdBy.username}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{communityDetail?.createdBy.username}</h4>
                        <p className="text-sm text-teal-600 flex items-center">
                          <Shield size={14} className="mr-1" />
                          Creater
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Members</h3>
                    <button
                      onClick={() => setShowMembersList(!showMembersList)}
                      className="text-teal-600 text-sm font-medium hover:underline"
                    >
                      {showMembersList ? "Show less" : "View all members"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {communityDetail?.members.map((member) => (
                      <div key={member._id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                        <img
                          src={member?.profilePic}
                          alt={member?.username}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{member?.username}</h4>
                          {/* <p className="text-sm text-gray-500">Joined {formatDate(member.joinedAt)}</p> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>



        </div>
      </div>
    </div>
  )
}

export default CommunityProfile
