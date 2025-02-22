import React, { useState } from 'react'
import logo from "../assets/logo1.png"
import { Link } from 'react-router-dom'


const Navbar = () => {

  return (
    <nav className="flex items-center text-center p-2 shadow-md bg-primary justify-between font-roboto">
      <div className="flex items-center justify-items-start text-center text-xl font-bold"><img className='  size-22 shrink-0' src={logo} /><span className='text-light'>  PetCircle</span></div>
      <div className="flex items-center justify-center space-x-5 mr-5">

        <button className="text-light hover:text-semilight"><Link to="/login">Login</Link></button>
        <button className="bg-light text-secondary px-4 py-2 rounded hover:bg-semilight ease-in"><Link to="/signup">Sign Up</Link></button>
      </div>
    

    </nav>
  )
}

export default Navbar
