import React from 'react'

const Message = () => {

    const messeges = [
        {
            userlogo: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
            petname: "Bharat & Dogy",
            msg: "Hey! How's your pup doing today? 🐶",
          },
          {
            userlogo: "https://images.pexels.com/photos/4588019/pexels-photo-4588019.jpeg?auto=compress&cs=tinysrgb&w=600",
            petname: "Luna & Max",
            msg: "Just got back from the park! 🌳🐾",
          },
          {
            userlogo: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
            petname: "Charlie & Coco",
            msg: "Check out this cute pic of Coco sleeping! 😴📸",
          },
          {
            userlogo: "https://images.pexels.com/photos/545004/pexels-photo-545004.jpeg?auto=compress&cs=tinysrgb&w=600",
            petname: "Rocky & Bella",
            msg: "Bella just learned a new trick! 🎾🐕",
          },
          {
            userlogo: "https://images.pexels.com/photos/3828242/pexels-photo-3828242.jpeg?auto=compress&cs=tinysrgb&w=600",
            petname: "Buddy & Daisy",
            msg: "Anyone up for a doggy playdate this weekend? 🐾💕",
          }
    ]

    return (
        <>
            {
            messeges.map((message)=>{
                return  <div className="w-full max-w-2xl bg-white rounded-lg p-1  ">
                            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                                <div class="flow-root">
                                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                        <li class="py-3 sm:py-4">
                                            <div class="flex items-center">
                                                <div class="shrink-0">
                                                    <img class="w-8 h-8 rounded-full" src={message.userlogo} alt="Neil image" />
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {message.petname}
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                       {message.msg}
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                
                
            })
            }
        </>
    )


}

export default Message
