import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {

  const [userData, setUserData] = useState(null); // User Data Store Karne Ke Liye
  const [loading, setLoading] = useState(true); // Loading state

  


  const getUserData = async () => {
    try {
      const id = localStorage.getItem("id")
      const res = await axios.get(`/user/${id}`, {
        withCredentials: true,
      }); // Correct API Call
      setUserData(res.data.user); // Response data ko set karo

      console.log(res.data.user)
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-20 bg-white rounded-lg shadow-md p-6">
        {/* Profile Header - User Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-25  border-b-2 border-gray-300 pb-10">
          {/* Profile Picture */}
          <div className="shrink-0">
            <img
              src={userData?.profilePic}
              alt={userData?.username}
              className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 cursor-pointer ring-2 ring-gray-500"
            />
          </div>

          {/* User Details */}
          <div className="flex flex-col mt-5 items-center md:items-start">
            <h1 className="text-4xl font-bold text-gray-800">{userData?.username}</h1>
            <p>{userData?.location || "add your location"}</p>


            {/* Followers/Following */}
            <div className="flex gap-6 text-center mt-4 md:text-left">
              {/* Followers */}
              <div>
                <p className="text-xl font-bold text-gray-800 text-center">
                  {userData?.followers?.length || 0} 
                </p>
                <p className="text-gray-600 text-sm">Followers</p>
              </div>

              {/* Following */}
              <div>
                <p className="text-xl font-bold text-gray-800 text-center">
                  {userData?.following?.length || 0} 
                </p>
                <p className="text-gray-600 text-sm">Following</p>
              </div>
            </div>

          </div>

        </div>

        <div className="flex flex-col gap-y-2 m-3">
          <p className="text-gray-600 text-sm s"> About me </p>
          <p className="text-lg font-semibold text-gray-800"> {userData?.bio || "add bio"}</p>
        </div>



        {/* Pets Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{userData?.username}'s' Pets</h2>

          <div className=" flex flex-col sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userData?.pets.map((pet) => (
              <div

                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={pet.profilePic}
                  alt={pet.petname}
                  className="w-12 h-12 rounded-full object-cover mr-10"
                />
                <span className="font-medium text-gray-700">{pet.petname}</span>
              </div>
            ))}

            {/* Add Pet Button */}
            <button className="flex items-center justify-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100 transition-colors">

              <span className="font-medium text-gray-700">Add Pet</span>
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Profile;
