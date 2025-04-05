import React, { useEffect } from 'react'

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Users,
  Calendar,
  MessageCircle,
  Info,
  Settings,
  Bell,
  Share2,
  ChevronDown,
  Shield,
  Image,
  Smile,
  MapPin,
  Heart,
  Bookmark,
  Flag,
} from "react-feather"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCommDetail } from '@/redux/community/communitySlice'

const CommunityProfile = () => {
    const [activeTab, setActiveTab] = useState("posts")
  const [isJoined, setIsJoined] = useState(false)
  const [showMembersList, setShowMembersList] = useState(false)

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined)
  }
  const {communityDetail} =  useSelector(store => store.community);
  const {user} = useSelector(store =>store.auth);
  const dispatch = useDispatch()
  const communityId = useParams().id
  const getCommunityById = async()=>{
    const res =  await axios.get(`/community/community/${communityId}`,{withCredentials:true});
    if(res.data){
        console.log(res.data.community);
        dispatch(setCommDetail(res.data.community));  
    }
  }

  useEffect(()=>{
    getCommunityById();
  },[])

  // Mock data for the community
  const community = {
    id: "dog-lovers",
    name: "Dog Lovers Community",
    description: "A community for all dog owners to share tips, photos, and stories about their furry friends.",
    coverImage: "/placeholder.svg?height=400&width=1200",
    icon: "/placeholder.svg?height=120&width=120",
    memberCount: 15243,
    postCount: 4567,
    createdAt: "2022-05-15",
    isPrivate: false,
    rules: [
      "Be respectful to all members",
      "No spam or self-promotion",
      "Only share dog-related content",
      "No selling or trading of animals",
      "Respect privacy and get permission before sharing others' content",
    ],
    moderators: [
      { id: "mod1", name: "John Smith", avatar: "/placeholder.svg?height=50&width=50", role: "Admin" },
      { id: "mod2", name: "Sarah Johnson", avatar: "/placeholder.svg?height=50&width=50", role: "Moderator" },
      { id: "mod3", name: "Mike Wilson", avatar: "/placeholder.svg?height=50&width=50", role: "Moderator" },
    ],
    upcomingEvents: [
      {
        id: "event1",
        title: "Weekend Dog Park Meetup",
        date: "2025-04-12T10:00:00",
        location: "Central Park Dog Run",
        attendees: 24,
      },
      {
        id: "event2",
        title: "Puppy Training Workshop",
        date: "2025-04-18T14:00:00",
        location: "PetSmart Training Center",
        attendees: 15,
      },
    ],
    relatedCommunities: [
      { id: "puppy-training", name: "Puppy Training Tips", memberCount: 8542 },
      { id: "dog-health", name: "Dog Health & Wellness", memberCount: 12350 },
      { id: "dog-rescue", name: "Dog Rescue & Adoption", memberCount: 9876 },
    ],
  }

  // Mock data for posts
  const posts = [
    {
      id: "post1",
      author: { id: "user1", name: "Jessica Parker", avatar: "/placeholder.svg?height=50&width=50" },
      content:
        "Just got back from an amazing hike with Max! He loved exploring the trails and meeting other dogs along the way. What are your favorite hiking spots to take your dogs?",
      images: ["/placeholder.svg?height=400&width=600"],
      createdAt: "2025-04-04T14:23:00",
      likesCount: 42,
      commentsCount: 8,
      isLiked: false,
    },
    {
      id: "post2",
      author: { id: "user2", name: "Robert Chen", avatar: "/placeholder.svg?height=50&width=50" },
      content:
        "Question for the community: My 2-year-old Golden Retriever has suddenly become afraid of car rides. He used to love them! Has anyone experienced this and have tips to help him feel comfortable again?",
      images: [],
      createdAt: "2025-04-03T09:15:00",
      likesCount: 18,
      commentsCount: 24,
      isLiked: true,
    },
    {
      id: "post3",
      author: { id: "user3", name: "Emma Wilson", avatar: "/placeholder.svg?height=50&width=50" },
      content:
        "Bailey just completed his advanced obedience training! So proud of how far he's come. If anyone needs recommendations for trainers in the Seattle area, I'm happy to share our experience.",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      createdAt: "2025-04-02T16:45:00",
      likesCount: 87,
      commentsCount: 12,
      isLiked: false,
    },
  ]

  // Mock data for members
  const members = [
    { id: "user1", name: "Jessica Parker", avatar: "/placeholder.svg?height=50&width=50", joinedAt: "2023-01-15" },
    { id: "user2", name: "Robert Chen", avatar: "/placeholder.svg?height=50&width=50", joinedAt: "2023-02-22" },
    { id: "user3", name: "Emma Wilson", avatar: "/placeholder.svg?height=50&width=50", joinedAt: "2023-03-10" },
    { id: "user4", name: "Michael Brown", avatar: "/placeholder.svg?height=50&width=50", joinedAt: "2023-04-05" },
    { id: "user5", name: "Sophia Garcia", avatar: "/placeholder.svg?height=50&width=50", joinedAt: "2023-05-18" },
    { id: "user6", name: "David Kim", avatar: "/placeholder.svg?height=50&width=50", joinedAt: "2023-06-30" },
  ]

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatEventDate = (dateString) => {
    const date = new Date(dateString)
    const options = { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
    return date.toLocaleDateString(undefined, options)
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
    <div className="flex flex-col  justify-center items-center bg-gray-50 min-h-screen pb-10 my-5">
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
                  {community.isPrivate && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="flex items-center text-gray-600">
                        <Lock size={16} className="mr-1" />
                        Private
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <button
                  onClick={handleJoinCommunity}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isJoined
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  } transition-colors`}
                >
                  {isJoined ? "Joined" : "Join Community"}
                </button>

                

                

                
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
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "posts"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "about"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "members"
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
            <div className="space-y-6">
              {/* Create Post */}
              <div className="bg-white rounded-lg shadow-md p-4">
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

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4">
                    <Link to={`/profile/${post.author.id}`} className="flex items-center">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                        <p className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                      </div>
                    </Link>

                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronDown size={20} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-2">
                    <p className="text-gray-800 mb-4">{post.content}</p>
                  </div>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className={`grid ${post.images.length === 1 ? "" : "grid-cols-2 gap-1"}`}>
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      ))}
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="px-6 py-2 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                    <div>
                      {post.likesCount > 0 && (
                        <span>
                          {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
                        </span>
                      )}
                    </div>
                    <div>
                      {post.commentsCount > 0 && (
                        <span>
                          {post.commentsCount} {post.commentsCount === 1 ? "comment" : "comments"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 py-2 border-t border-gray-100 flex justify-start">
                    <button
                      className={`flex items-center px-2 py-1 rounded-md ${
                        post.isLiked ? "text-red-500" : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Heart size={20} className={post.isLiked ? "fill-current" : ""} />
                      <span className="ml-2">Like</span>
                    </button>

                    <button className="flex items-center px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100">
                      <MessageCircle size={20} />
                      <span className="ml-2">Comment</span>
                    </button>

                   
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="md:w-200 self-start  bg-white  rounded-lg shadow-md p-6">
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
                        {community.isPrivate ? "Private Community" : "Public Community"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Members ({communityDetail?.members.length})
                </h2>
                
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 
                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50">
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
                        src={member?.profilePic }
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
