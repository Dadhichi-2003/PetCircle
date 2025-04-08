import React from 'react';
import Banner from '../../assets/HeroBanner.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-primary flex flex-col justify-center items-center dark:bg-gray-900 px-6 py-12">
      <div className="grid max-w-screen-xl mx-auto gap-8 lg:grid-cols-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-6xl dark:text-white">
            Find Your Perfect Pet Companion!
          </h1>
          
          <p className="max-w-2xl mb-6 font-light text-gray-400 md:text-lg lg:text-xl dark:text-gray-400">
            Adopt, care, and connect with pet lovers worldwide. Your furry friend is waiting for you!
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-accent rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 transition"
            >
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img src={Banner} alt="Pet Adoption" className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
