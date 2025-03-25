import React from "react";
import { FaHeart } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { IoPawSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
} from "react-icons/tb";

const Features = () => {
  return (
    <>
      {/* Why Join Section */}
      <section className="px-6 py-10 font-roboto">
        <h2 className="text-center text-3xl font-bold mb-8">Why Join PetCircle?</h2>
        <div className="grid  sm:grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Cards */}
          {[
            { icon: <FaHeart className="size-10 text-primary" />, title: "Find Your Perfect Match", text: "Connect with pets that match your lifestyle and preferences through our smart matching system." },
            { icon: <RiUserCommunityFill className="size-10 text-primary" />, title: "Join the Community", text: "Share experiences and get advice from experts and fellow pet lovers." },
            { icon: <IoPawSharp className="size-10 text-primary" />, title: "Safe Adoption Process", text: "Our verified adoption process ensures both pets and adopters find their perfect match." },
          ].map((feature, index) => (
            <div key={index} className="p-6 border rounded-3xl shadow-lg space-y-3 text-center md:text-left">
              {feature.icon}
              <p className="font-bold text-xl">{feature.title}</p>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-10 font-roboto">
        {/* <h2 className="text-center text-3xl font-bold mb-8">How It Works</h2> */}
        <div className="flex items-center justify-around"> 
       
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-8">
          <div>
          <p className="text-2xl font-bold mb-6 text-center md:text-left">How it works</p>
          <div>
            {[
              { icon: <TbSquareRoundedNumber1Filled className="size-12 text-primary" />, title: "Create your profile", text: "Tell us about yourself and what you’re looking for in a pet." },
              { icon: <TbSquareRoundedNumber2Filled className="size-12 text-primary" />, title: "Browse Available Pets", text: "Explore our database of pets looking for their forever homes." },
              { icon: <TbSquareRoundedNumber3Filled className="size-12 text-primary" />, title: "Connect & Adopt", text: "Schedule meets and complete the adoption process safely." },
              { icon: <TbSquareRoundedNumber4Filled className="size-12 text-primary" />, title: "Connect with other Pet Owners", text: "Communicate with pet owners and gain knowledge." },
              { icon: <TbSquareRoundedNumber5Filled className="size-12 text-primary" />, title: "Get Advice from Experts", text: "Connect with experts and ensure a healthy life for your pet." },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3 mb-6">
                {step.icon}
                <div>
                  <p className="font-bold text-lg">{step.title}</p>
                  <p className="text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Key Features Section */}
          <div>
            <p className="text-2xl font-bold mb-6 text-center md:text-left">Key Features</p>
            {[
              { icon: <FaHome className="size-18 md:size-10 text-primary" />, title: "Pet Adoption", text: "Find your perfect companion from our verified network of shelters and rescues." },
              { icon: <LuMessagesSquare className="size-10  text-primary" />, title: "Connect with Others", text: "Interact with pet owners and build new connections." },
              { icon: <FaCalendarDays className="size-8 text-primary" />, title: "Meetings", text: "Schedule safe meet-and-greets with pets and their caregivers." },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 mb-6">
                {feature.icon}
                <div>
                  <p className="font-bold">{feature.title}</p>
                  <p className="text-gray-600">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { number: "10K+", text: "Happy Users" },
              { number: "5K+", text: "Successful Adoptions" },
              { number: "3K+", text: "Pet Breeds" },
            ].map((impact, index) => (
              <div key={index} className="bg-primary p-6 rounded-lg shadow-md text-center">
                <h3 className="text-4xl font-bold text-white">{impact.number}</h3>
                <p className="text-white mt-2">{impact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
