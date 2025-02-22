import React from 'react'
import Banner from "../assets/HeroBanner.jpg"
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="bg-light flex flex-col md:flex-row items-center justify-between p-10 shadow-xl font-roboto">
    <div className="flex-y justify-center items-center text-center md:flex-y md:text-start max-w-lg space-y-4 ">
      <h1 className="text-4xl font-bold">Adopt,Connect & Love</h1>
      <p className=''>Your Pet Community Awaits</p>
      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"><Link to="/signup"> Get Started →</Link></button>
    </div>
    <img
      src={Banner}
      alt="Pets"
      className="w-100 mt-6 md:mt-0 shadow-2xl"
    />
  </section>
  )
}

export default HeroSection
