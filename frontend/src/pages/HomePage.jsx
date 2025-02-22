import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'

const HomePage = () => {
  return (
   <>
        <Navbar/>
        <HeroSection/>
        <Features/>
        <Footer/>
   </>
  )
}

export default HomePage
