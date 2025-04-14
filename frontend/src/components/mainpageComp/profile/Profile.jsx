import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import store from "@/redux/store";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import PetProfileForm from "./PetProfileForm";
import { Briefcase, Calendar, Mail, MapPin, MessageCircle, MoreHorizontal, Star } from "lucide-react";
import { setAuthUser, setSelectedUser, setUserProfile } from "@/redux/user/authSlice";
import { toast } from "sonner";
import EditUserProfile from "./EditUserProfile";
import useGetUserProfile from "@/components/hooks/useGetUserProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ProfileDialog from "./petprofile/ProfileDialog";
import CreateExpertPost from "@/components/expertComp/CreateExpertPost";



const Profile = () => {

  const [open, setopen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isNestedRoute = location.pathname.includes("petprofile");
  const params = useParams();
  const userId = params.id;


  useGetUserProfile(userId)
  const { userProfile, user } = useSelector(store => store.auth);
  console.log(userProfile)

  console.log(user)

  const handleDeletePetProfile = async (petId) => {
    try {
      const res = await axios.delete(`/pet/deletepet/${petId}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Profile deleted successfully");

        // Redux State Update
        const updatedPets = userProfile.pets.filter(pet => pet._id !== petId);

        dispatch(setAuthUser({
          ...userProfile,
          pets: updatedPets
        }));

        dispatch(setUserProfile({
          ...userProfile,
          pets: updatedPets
        }));

        // Fetch Latest User Profile
        await useGetUserProfile(userId);
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleFollowUnfollow = async () => {
    try {
      const res = await axios.post(`/followorunfollow/${userId}`, {}, { withCredentials: true });
      if (res.status === 200) {
        toast.success(res.data.message);

        const updatedFollowing = res.data.message.includes("Unfollow")
          ? user.following.filter((id) => id !== userId)
          : [...user.following, userId];

        const updatedFollowers = res.data.message.includes("Unfollow")
          ? userProfile.followers.filter((id) => id !== user._id)
          : [...userProfile.followers, user._id];

        dispatch(
          setAuthUser({
            ...user,
            following: updatedFollowing,
          })
        );

        dispatch(
          setUserProfile({
            ...userProfile,
            followers: updatedFollowers,
          })
        );
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
      toast.error("Something went wrong!");
    }
  };
  const navigate = useNavigate()
  const handleMessageClick = () => {
    dispatch(setSelectedUser(userProfile));
    navigate(`/main/messages/${userProfile?._id}`);
  };

  const isFollowing = user.following.includes(userId)
  const role = localStorage.getItem('role');

  const isExpert = userProfile?.role === 'Expert'

  if (isExpert) {
    return <>

      <div className="w-full max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow-md ">
        <div className="">
          <div className="grid ">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        src={userProfile.profilePic || "/placeholder.svg?height=400&width=400"}
                        alt={userProfile.username}
                      // className="size-32"
                      />
                      <AvatarFallback>{userProfile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>

                  <CardTitle className="text-2xl">{userProfile.username}</CardTitle>
                  <CardDescription className="text-lg font-medium">{userProfile.expertise}</CardDescription>





                </CardHeader>

                <CardContent >
                  <div className="flex justify-between w-full gap-3 text-center py-3">

                    <Button variant='secondary' className='w-[49%]  '>Follow</Button>
                    <Button variant='outline' className='w-[49%] '>Message</Button>

                  </div>

                  <div className="flex justify-around text-center py-4">

                    <div>
                      <p className="font-bold">{userProfile.followers.length}</p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <Separator orientation="vertical" className="h-12 border border-gray-700" />
                    <div>
                      <p className="font-bold">{userProfile.following.length}</p>
                      <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                    <Separator orientation="vertical" className="h-12 border-gray-700" />
                    <div>
                      <p className="font-bold">{userProfile.posts?.length}</p>
                      <p className="text-sm text-muted-foreground">Posts</p>
                    </div>
                  </div>

                  <Separator className="my-4 border border-gray-700" />

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Experience</p>
                        <p className="text-sm text-muted-foreground">
                          {userProfile.experience} years in {userProfile.expertise}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{userProfile.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-sm text-muted-foreground">{userProfile.contact || userProfile.email}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4 border" />

                  <div>
                    <h3 className="font-medium mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
                  </div>

                  <Separator className="my-4 border border-gray-700" />

                  <div>
                    <h3 className="font-medium mb-2">Services</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2 my-3">
                        {userProfile?.services.map((service) => {
                          return <>
                            <Badge variant='outline'>{service}</Badge>
                          </>
                        })}


                      </div>
                      {user?._id === userProfile?._id && <div className="">
                      
                      <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditProfileOpen(true)} variant='secondary' className="p-2 rounded cursor-pointer text-white my-5">Edit Profile</Button>
                      </DialogTrigger>
                      {
                        editProfileOpen &&
                        <DialogContent className="w-fit">
                          <EditUserProfile open={editProfileOpen} setopen={setEditProfileOpen} />

                        </DialogContent>
                      }

                    </Dialog>

                        
                      </div>}
                      
                    </div>
                  </div>

                  <Separator className="my-4" />





                </CardContent>
              </Card>



            </div>

          </div>

        </div>

        <div className="my-8">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold mb-6 ml-5">POSTS</h2>
            {
              user?._id === userProfile?._id && 
              <Dialog >
                      <DialogTrigger asChild>
                        <Button onClick={() => setopen(true)} variant='secondary' className=" mr-5"> Add Post  </Button>
                      </DialogTrigger>

                      {open &&

                        <DialogContent >
                          <CreateExpertPost open={open} setOpen={setopen} />
                        </DialogContent>
                        
                        }


                    </Dialog>
            }       
            
                   
           
          </div>


          <div className=" relative grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4 p-5">
            {
              userProfile.posts?.map(post => {
                return <>
                  <Dialog>
                    <DialogTrigger>
                      <div className="aspect-square overflow-hidden rounded-sm">
                        <img

                          src={post.media}
                          alt={'alt'}
                          className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <ProfileDialog post={post} /> {/* img={img}*/}
                    </DialogContent>
                  </Dialog>
                </>

              })

            }
          </div>
        </div>
      </div>
    </>
  }
  return (
    <>


      {!isNestedRoute && (

        <>

          <div className="w-full max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow-md p-6">
            {/* Profile Header */}

            <div className="flex flex-col md:flex-row items-center md:justify-between border-b-2  border-gray-300">
              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row items-center  md:items-start gap-8  pb-8">
                <div className="relative shrink-0 ">
                  <img
                    src={userProfile?.profilePic}
                    alt={userProfile?.username}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-300 shadow-lg hover:ring-4 hover:ring-gray-500 transition-all"
                  />

                </div>

                {/* User Details */}
                <div className="flex flex-col mt-5 items-center md:items-start text-gray-800">
                  <h1 className="text-3xl font-bold">{userProfile?.username}</h1>
                  <p className="text-gray-600">{userProfile?.location || "Add your location"}</p>

                  {/* Followers & Following */}
                  <div className="flex gap-8 text-center mt-4">
                    <div className="cursor-pointer hover:text-blue-500">
                      <p className="text-xl font-bold">{userProfile?.followers?.length || 0}</p>
                      <p className="text-gray-600 text-sm">Followers</p>
                    </div>
                    <div className="cursor-pointer hover:text-blue-500">
                      <p className="text-xl font-bold">{userProfile?.following?.length || 0}</p>
                      <p className="text-gray-600 text-sm">Following</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:self-start flex-col">


                {
                  userId === user._id ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditProfileOpen(true)} className="bg-gray-600 p-2 rounded cursor-pointer text-white my-5">Edit Profile</Button>
                      </DialogTrigger>
                      {
                        editProfileOpen &&
                        <DialogContent className="w-fit">
                          <EditUserProfile open={editProfileOpen} setopen={setEditProfileOpen} />

                        </DialogContent>
                      }

                    </Dialog>

                  ) : (
                    <>
                      {isFollowing ? (
                        <>
                          <Button variant='secondary' className='h-8 my-1 w-25 bg-primary text-primary-foreground' onClick={handleFollowUnfollow} >Unfollow</Button>
                          <Button variant='secondary' className='h-8 my-1 w-25' onClick={handleMessageClick} >Message</Button>
                        </>
                      ) : (
                        <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8' onClick={handleFollowUnfollow} >Follow</Button>
                      )}
                    </>
                  )
                }


              </div>

            </div>



            {/* About Me Section */}
            <div className="mt-6">
              <p className="text-gray-600 text-sm font-medium">About Me</p>
              <p className="text-lg font-semibold text-gray-800">{userProfile?.bio || "Add bio"}</p>
            </div>

            {/* Pets Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{userProfile?.username}'s Pets</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userProfile?.pets.map((pet) => (
                  <div
                    key={pet._id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105"
                  >
                    <Link to={`petprofile/${pet._id}`}>
                      <div className="flex items-center" >
                        <img
                          src={pet.profilePic}
                          alt={pet.petname}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 mr-4"
                        />
                        <span className="font-medium text-gray-700">{pet.petname}</span>
                      </div>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                      </DialogTrigger>
                      <DialogContent className="flex flex-col items-center text-sm text-center">
                        <button
                          className="text-red-500 text-lg border-none hover:text-red-700"
                          onClick={() => handleDeletePetProfile(pet._id)}
                        >
                          Delete
                        </button>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
                
                {/* Add Pet Button */}
                {userId === user._id && 
                <Dialog open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                  <button onClick={() => { setopen(true) }} className="flex items-center justify-center p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:shadow-lg transition-all">
                    <span className="font-medium text-gray-700">+ Add Pet</span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <PetProfileForm open={open} setopen={setopen} />

                </DialogContent>
              </Dialog> }
                
              </div>
            </div>

          </div>
        </>
      )

      }
      <Outlet />
    </>
  );
};

export default Profile;
