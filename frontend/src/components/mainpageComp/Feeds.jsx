import React from 'react'
import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const Feeds = () => {

  const [likes, setLikes] = useState(0);

  const petFeeds = [
    {
      userlogo: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
      petname: "Bharat & Dogy",
      location: "Ahmedabad",
      content: "Smiley moments!",
      img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      userlogo: "https://images.pexels.com/photos/4588019/pexels-photo-4588019.jpeg?auto=compress&cs=tinysrgb&w=600",
      petname: "Luna & Max",
      location: "Mumbai",
      content: "Fun at the beach!",
      img: "https://images.pexels.com/photos/4588019/pexels-photo-4588019.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      userlogo: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
      petname: "Charlie & Coco",
      location: "Delhi",
      content: "Best friends forever!",
      img: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      userlogo: "https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      petname: "Rocky & Bella",
      location: "Bangalore",
      content: "Park day adventure!",
      img: "https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      userlogo: "https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=600",
      petname: "Buddy & Daisy",
      location: "Chennai",
      content: "Exploring the world!",
      img: "https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&w=600",
    }
  ]

  return (
    <>

      {petFeeds.map((feed) => {

        return <>
          <div className=" ">
            
            <div className="bg-secondary text-white shadow-lg p-6 rounded-xl   w-150  border border-gray-300">
              {/* Header */}
              <div className="flex items-center space-x-3">
                <img src={feed.userlogo} alt="user avatar" className="w-12 h-12 rounded-full border border-gray-400" />
                <div>
                  <h3 className="font-bold text-gray-200">{feed.petname}</h3>
                  <p className="text-sm text-gray-300">{feed.location}</p>
                </div>
              </div>

              {/* Content */}
              <p className="mt-4 text-gray-100">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non quis reiciendis eum. Id autem quia, ea sit voluptatem minus a.</p>
              <img src={feed.img} alt="pet post" className="mt-4 rounded-lg w-full border border-gray-200" />

              {/* Actions */}
              <div className="flex justify-between mt-4 text-gray-200 text-sm">
                <button
                  className="flex items-center space-x-1 hover:text-red-500 transition"
                  onClick={() => setLikes(likes + 1)}
                >
                  <Heart className="w-6 h-6" />
                  <span>{likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                  <MessageCircle className="w-6 h-6" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500 transition">
                  <Share2 className="w-6 h-6" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

        </>
      })}

    </>
  )
}

export default Feeds
