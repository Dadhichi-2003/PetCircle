import React from 'react'
import Navbar from '../components/homepageComp/Navbar'
import HeroSection from '../components/homepageComp/HeroSection'
import Features from '../components/homepageComp/Features'
import Footer from '../components/homepageComp/Footer'


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
