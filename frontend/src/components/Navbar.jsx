import React, { useState } from 'react'
import logo from "../assets/logo2.png"
import { Link } from 'react-router-dom'


const Navbar = () => {

  return (
    <nav className="flex items-center text-center p-2 shadow-md bg-gray-300 justify-between font-roboto">
      <div className="flex items-center justify-items-start text-center text-xl font-bold"><Link to="/" ><img className='  size-22 shrink-0' src={logo} /></Link><span className='text-primary'>  PetCircle</span></div>
      <div className="flex items-center justify-center space-x-5 mr-5">

        <button className="text-primary hover:text-secondary"><Link to="/login">Login</Link></button>
        <button className="bg-primary text-light px-4 py-2 rounded hover:bg-secondary ease-in"><Link to="/signup">Sign Up</Link></button>
      </div>
    

    </nav>
  )
}

export default Navbar
