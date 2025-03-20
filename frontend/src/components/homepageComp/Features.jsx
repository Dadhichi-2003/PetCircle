import React from 'react'
import { FaHeart } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { IoPawSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";
import { TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled, TbSquareRoundedNumber3Filled, TbSquareRoundedNumber4Filled, TbSquareRoundedNumber5Filled } from 'react-icons/tb';

const Features = () => {
  return (
    <>
      <section className="p-10 font-roboto">
        <h2 className="text-center text-2xl font-bold mb-6">Why Join PetCircle?</h2>
        <div className="grid md:grid-cols-3 gap-6 ">
          <div className="p-6 border  rounded-3xl s shadow-lg space-y-3">
            <FaHeart className='size-10 ' />
            <p className="font-bold text-xl"> Find Your Perfect Match</p>
            <p>Connect with pets that match your lifestyle  and Preferences through our smart watching system.</p>
          </div>
          <div className="p-6 border  rounded-3xl s shadow-lg space-y-3">
            <RiUserCommunityFill className='size-10 ' />
            <p className="font-bold text-xl">Join the Community</p>
            <p>Share experiences and get advice and get expert advice.</p>
          </div>
          <div className="p-6 border  rounded-3xl s shadow-lg space-y-3">
            <IoPawSharp className='size-10 ' />
            <p className="font-bold text-xl">Safe Adoption Process</p>
            <p>Our verified adoption process ensures both pets and adopters find their perfect match.</p>
          </div>
        </div>
      </section>
      <section className=' md:flex justify-around  font-roboto'>
        <div className='ml-12'>
          <p className="font-bold text-xl my-5">How It works</p>
          <div className='flex mb-4'>
          <TbSquareRoundedNumber1Filled  className='size-12  mr-2 fill-primary'/>
            {/* <span className='How_works'>1</span> */}
            <div>
              <span className='font-bold text-lg'>Create your profile</span>
              <p className=''>Tell us about your self and what you'r looking for in pet.</p>
            </div>
          </div>
          <div className='flex mb-4'>
          <TbSquareRoundedNumber2Filled className='size-12  mr-2 fill-primary' />
            {/* <span className='size-8'></span> */}
            <div>
              <span className='font-bold text-lg'>Browse Available Pets</span>
              <p className=''>Explore our database of pets looking for their forever homes</p>
            </div>
          </div>
          <div className='flex mb-4'>
          <TbSquareRoundedNumber3Filled className='size-12  mr-2 fill-primary' />
            {/* <span className='How_works'>3</span> */}
            <div>
              <span className='font-bold text-lg'>Connect & Adopt</span>
              <p className=''>Schedule meets and complete the adoption process safely.</p>
            </div>
          </div>
          <div className='flex mb-4'>
          <TbSquareRoundedNumber4Filled className='size-12 mr-2 fill-primary' />
            {/* <span className='How_works'></span> */}
            <div>
              <span className='font-bold text-lg'>Connect with other Pet-owners</span>
              <p className=''>Communicate with other pet-owners and gain knowledge.</p>
            </div>
          </div>  <div className='flex mb-4'>
          <TbSquareRoundedNumber5Filled className='size-12  mr-2 fill-primary' />
            {/* <span className='How_works'>5</span> */}
            <div>
              <span className='font-bold text-lg'>Get Advice from Experts & Trainers</span>
              <p className=''>Connect with animal experts and give healthy life to your pet.</p>
            </div>
          </div>

        </div>
        <div className='ml-12 md:flex flex-col mt-9 mr-12' >
          <p className="font-bold text-xl mb-6 ">Key Features</p>
          <div className='space-y-1 mb-10'>
            <FaHome className='size-8' />
            <p className='font-bold '>Pet Adoption</p>
            <p>Find your perfect companion from our verified network of shelters and rescues</p>
          </div>
          <div className='space-y-1 mb-8'>
            <LuMessagesSquare className='size-8' />
            <p className='font-bold '>Connect with others</p>
            <p>Interact with other pet owners and found the new connections .</p>
          </div>
          <div className='space-y-1 mb-8'>
            <FaCalendarDays  className='size-8' />
            <p className='font-bold '>Meetings</p>
            <p>Schedule safe meet-and-greers with potential pets and their current caregivers</p>
          </div>
        </div>
      </section>
      <section className="py-16  bg-gray-50">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Impact Card 1 */}
          <div className="bg-secondary p-6 rounded-lg shadow-md text-center">
            <h3 className="text-4xl font-bold text-light">10K+</h3>
            <p className="text-light mt-2">Happy Users</p>
          </div>

          {/* Impact Card 2 */}
          <div className="bg-secondary p-6 rounded-lg shadow-md text-center">
            <h3 className="text-4xl font-bold text-light">5K+</h3>
            <p className="text-light mt-2">Successful Adoptions</p>
          </div>

          {/* Impact Card 3 */}
          <div className="bg-secondary p-6 rounded-lg shadow-md text-center">
            <h3 className="text-4xl font-bold text-light">3K+</h3>
            <p className=" text-light mt-2">Pet Breeds</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Features

