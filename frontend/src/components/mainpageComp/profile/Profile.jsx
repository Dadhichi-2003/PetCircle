import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import store from "@/redux/store";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import PetProfileForm from "./PetProfileForm";
import { MoreHorizontal } from "lucide-react";
import { setAuthUser, setSelectedUser, setUserProfile } from "@/redux/user/authSlice";
import { toast } from "sonner";
import EditUserProfile from "./EditUserProfile";
import useGetUserProfile from "@/components/hooks/useGetUserProfile";
import { Button } from "@/components/ui/button";



const Profile = () => {

  const[open,setopen]=useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isNestedRoute = location.pathname.includes("petprofile");
  const params = useParams();
  const userId = params.id;
  

  useGetUserProfile(userId)
  const { userProfile ,user } = useSelector(store => store.auth);
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
  const navigate =useNavigate()
  const handleMessageClick = () => {
    dispatch(setSelectedUser(userProfile)); // ✅ Select user
    navigate(`/main/messages/${userProfile?._id}`); // ✅ Navigate to chat page
  };

  const isFollowing= user.following.includes(userId)


  return (
    <>
      {!isNestedRoute && (
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
                    <EditUserProfile open={editProfileOpen} setopen={setEditProfileOpen}/>
                     
                  </DialogContent>
              }
                
              </Dialog>
              
            ):(
                <>
                {  isFollowing ? (
                  <>
                    <Button variant='secondary' className='h-8 my-1 w-25 bg-primary text-primary-foreground'  onClick={handleFollowUnfollow } >Unfollow</Button>
                    <Button variant='secondary'  className='h-8 my-1 w-25'  onClick={handleMessageClick} >Message</Button>
                  </>
                ) : (
                  <Button  className='bg-[#0095F6] hover:bg-[#3192d2] h-8'  onClick={handleFollowUnfollow} >Follow</Button>
                ) }
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
              {console.log(open)}
              {/* Add Pet Button */}
              <Dialog  open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                  <button onClick={()=>{setopen(true)}} className="flex items-center justify-center p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:shadow-lg transition-all">
                    <span   className="font-medium text-gray-700">+ Add Pet</span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                   <PetProfileForm open={open} setopen={setopen} /> 
                 
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Profile;
