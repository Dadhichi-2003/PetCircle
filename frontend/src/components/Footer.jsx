import React from 'react'
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-10">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* About Section */}
      <div className="text-center md:text-left">
        <h3 className="font-semibold text-lg mb-3">About</h3>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white">Our Story</a></li>
          <li><a href="#" className="hover:text-white">Mission</a></li>
          <li><a href="#" className="hover:text-white">Team</a></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="text-center md:text-left">
        <h3 className="font-semibold text-lg mb-3">Contact</h3>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white">Support</a></li>
          <li><a href="#" className="hover:text-white">Help Center</a></li>
          <li><a href="#" className="hover:text-white">Partners</a></li>
        </ul>
        <div className="flex justify-center md:justify-start space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
        </div>
      </div>

      {/* Legal Section */}
      <div className="text-center md:text-left">
        <h3 className="font-semibold text-lg mb-3">Legal</h3>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
        </ul>
      </div>

      {/* Newsletter Section */}
      <div className="text-center md:text-left">
        <h3 className="font-semibold text-lg mb-3">Newsletter</h3>
        <p className="text-gray-400 mb-3">Stay updated with pet adoption news and tips.</p>
        <div className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg text-black mb-3 sm:mb-0 sm:rounded-l-lg bg-light"
          />
          <button className="bg-red-500 px-4 py-2 rounded-lg sm:rounded-l-none">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="text-center text-gray-500 mt-8 text-sm">
      © 2025 PetCircle. All rights reserved.
    </div>
  </footer>
  )
}

export default Footer
