import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import store from "@/redux/store";
import { Button } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import PetProfileForm from "./PetProfileForm";
import { MoreHorizontal } from "lucide-react";
import { setAuthUser } from "@/redux/user/authSlice";
import { toast } from "sonner";
import EditUserProfile from "./EditUserProfile";

const Profile = () => {

  const[open,setopen]=useState(false)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const isNestedRoute = location.pathname.includes("petprofile");
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    try {
      const id = user._id;
      const res = await axios.get(`/user/${id}`, { withCredentials: true });

      dispatch(setAuthUser(res.data.user));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePetProfile = async (petId) => {
    try {
      const res = await axios.delete(`/pet/deletepet/${petId}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Profile deleted successfully");
        getuser();
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Error in deleting profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {!isNestedRoute && (
        <div className="w-full max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow-md p-6">
          {/* Profile Header */}

          <div className="flex items-center justify-between border-b-2  border-gray-300">
            {/* Profile Picture */}
            <div className="flex flex-col md:flex-row items-center  md:items-start gap-8  pb-8">
              <div className="relative shrink-0 ">
                <img
                  src={user?.profilePic}
                  alt={user?.username}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-300 shadow-lg hover:ring-4 hover:ring-gray-500 transition-all"
                />

              </div>

              {/* User Details */}
              <div className="flex flex-col mt-5 items-center md:items-start text-gray-800">
                <h1 className="text-3xl font-bold">{user?.username}</h1>
                <p className="text-gray-600">{user?.location || "Add your location"}</p>

                {/* Followers & Following */}
                <div className="flex gap-8 text-center mt-4">
                  <div className="cursor-pointer hover:text-blue-500">
                    <p className="text-xl font-bold">{user?.followers?.length || 0}</p>
                    <p className="text-gray-600 text-sm">Followers</p>
                  </div>
                  <div className="cursor-pointer hover:text-blue-500">
                    <p className="text-xl font-bold">{user?.following?.length || 0}</p>
                    <p className="text-gray-600 text-sm">Following</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex self-start">
              


              <Dialog>
                <DialogTrigger asChild>
                <Button onClick={()=>{setopen(true)}} className="bg-gray-600 p-2 rounded cursor-pointer text-white my-5">Edit Profile</Button>
                </DialogTrigger>
              {
                open && <DialogContent className="w-fit">
                            <EditUserProfile open={open} setopen={setopen}/>
                        </DialogContent>
              }
                
              </Dialog>
              {/* <Dialog >
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <button
                    className="text-gray-900 text-lg border-none hover:cursor-pointer"
                 
                  >
                    Edit Profile 
                  </button>
                  
                </DialogContent>
              </Dialog> */}
            </div>

          </div>



          {/* About Me Section */}
          <div className="mt-6">
            <p className="text-gray-600 text-sm font-medium">About Me</p>
            <p className="text-lg font-semibold text-gray-800">{user?.bio || "Add bio"}</p>
          </div>

          {/* Pets Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{user?.username}'s Pets</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user?.pets.map((pet) => (
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
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:shadow-lg transition-all">
                    <span className="font-medium text-gray-700">+ Add Pet</span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <PetProfileForm />
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
