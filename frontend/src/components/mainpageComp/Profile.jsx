import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdGridOn } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState({});
  const [post, setPost] = useState(true);
  const [about, setAbout] = useState(false);
  const location = useLocation();

  // Check if the current route is editprofile
  const isEditingProfile = location.pathname === "/main/profile/editprofile";

  const togglePost = () => {
    setPost(true);
    setAbout(false);
  };

  const toggleAbout = () => {
    setAbout(true);
    setPost(false);
  };

  const getPetDetails = async () => {
    const id = localStorage.getItem("petId");
    const res = await axios.get("/profile/profile/" + id);
    setData(res.data);
    console.log(res.data)
    
  };

  useEffect(() => {
    getPetDetails();
  }, []);

  return (
     <>
    {isEditingProfile ? (
      <Outlet /> // Show only the nested component (editprofile)
    ) : (
      <>
         <div className="max-w-4xl mx-auto p-4">
      
      {/* Profile Card */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md mb-4">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4 border-b border-gray-600 pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              <img
                src={data?.pet?.profilePic}
                className="w-24 h-24 rounded-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{data?.pet?.userdata?.username}</h1>
              <p className="text-gray-400">{data?.pet?.petName}</p>
              <p className="text-gray-400">Owned by me{data?.ownername}</p>
              <p className="mt-2">Medical History: {data?.pet?.medicalHistory}</p>
            </div>
          </div>
          <Link to="editprofile">
          <button className="bg-blue-600 px-4 py-2 rounded-lg mt-4 sm:mt-0">Edit Profile</button> </Link>
        </div>

        {/* Stats Section */}
        <div className="flex justify-around text-center">
          <div>
            <h1 className="text-lg font-semibold">42</h1>
            <p className="text-gray-400">Posts</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">256</h1>
            <p className="text-gray-400">Followers</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">128</h1>
            <p className="text-gray-400">Following</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <div className="flex justify-around">
          <button
            onClick={togglePost}
            className={`w-full sm:w-auto rounded-lg p-3 text-gray-400 flex items-center justify-center hover:bg-gray-600 ${
              post ? "bg-gray-700 text-white" : ""
            }`}
          >
            <MdGridOn className="size-6 mr-2" /> Posts
          </button>
          <button
            onClick={toggleAbout}
            className={`w-full sm:w-auto rounded-lg p-3 text-gray-400 flex items-center justify-center hover:bg-gray-600 ${
              about ? "bg-gray-700 text-white" : ""
            }`}
          >
            <CiCircleQuestion className="size-6 mr-2" /> About
          </button>
        </div>
      </div>

      {/* Posts Section */}
      {post && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-700 p-20 border-2 rounded-lg"></div>
          <div className="bg-gray-700 p-20 border-2 rounded-lg"></div>
          <div className="bg-gray-700 p-20 border-2 rounded-lg"></div>
          <div className="bg-gray-700 p-20 border-2 rounded-lg"></div>
          <div className="bg-gray-700 p-20 border-2 rounded-lg"></div>
          <div className="bg-gray-700 p-20 border-2 rounded-lg"></div>
        </div>
      )}

      {/* About Section */}
      {about && (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md border mt-4 h-100">
          <h1 className="text-3xl mb-5">About {data?.pet?.userdata?.username}</h1>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="space-y-2">
              <p className="text-gray-400">
                Breed: <span className="text-white">{data?.pet?.breed}</span>
              </p>
              <p className="text-gray-400">
                Gender: <span className="text-white">Male</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">
                Age: <span className="text-white">{data?.pet?.petAge} years</span>
              </p>
              <p className="text-gray-400">
                Weight: <span className="text-white">{data?.pet?.petWeight} kg</span>
              </p>
            </div>
          </div>
        </div>
      )}
    
    </div>
      </>
    )}
    </>
   
  );
};

export default Profile;
