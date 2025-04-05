import React from 'react'

import { Search, Filter, Heart, MapPin, Calendar, Plus, ChevronLeft, ChevronRight, Check, X } from "react-feather"

const AdoptionPage = () => {
    return (
        <div className='flex  justify-center items-center w-full'>
      <div className="bg-gray-50 min-h-screen">
        {/* Header Banner */}
        <div className="bg-teal-600 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Find Your New Best Friend</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Connect with pet owners looking to rehome their pets or find a loving home for a pet in need.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center">
                <Plus size={18} className="mr-2" />
                Post for Adoption
              </button>
              <button className="bg-teal-700 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-800 transition-colors flex items-center md:hidden">
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Panel - Desktop */}
            <div className="md:w-1/4 hidden md:block">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                </div>
  
                {/* Pet Type */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Pet Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["All Pets", "Dogs", "Cats", "Birds", "Small Pets", "Other"].map((type, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 rounded-md text-sm ${
                          index === 0 ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
  
                {/* Location */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
                  <input
                    type="text"
                    placeholder="City, state, or zip code"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
  
                {/* Age Range */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Age (years)</h3>
                    <span className="text-sm text-gray-500">0 - 20+</span>
                  </div>
                  <div className="relative h-6 flex items-center">
                    <div className="absolute h-1 w-full bg-gray-200 rounded-full">
                      <div
                        className="absolute h-full bg-teal-600 rounded-full"
                        style={{
                          left: "0%",
                          right: "0%",
                        }}
                      ></div>
                    </div>
  
                    <div
                      className="absolute w-4 h-4 bg-white border-2 border-teal-600 rounded-full cursor-pointer transform -translate-x-1/2"
                      style={{ left: "0%" }}
                    ></div>
                    <div
                      className="absolute w-4 h-4 bg-white border-2 border-teal-600 rounded-full cursor-pointer transform -translate-x-1/2"
                      style={{ left: "100%" }}
                    ></div>
                  </div>
                </div>
  
                {/* Gender */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Gender</h3>
                  <div className="flex gap-2">
                    {["Any", "Male", "Female"].map((gender, index) => (
                      <button
                        key={index}
                        className={`flex-1 px-3 py-2 rounded-md text-sm ${
                          index === 0 ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>
  
                {/* Size */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Any Size", "Small", "Medium", "Large", "X-Large"].map((size, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 rounded-md text-sm ${
                          index === 0 ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
  
                {/* Special Needs */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900">Special Needs Pets</span>
                  </label>
                </div>
  
                {/* Good With */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Good With</h3>
                  <div className="space-y-2">
                    {["Kids", "Dogs", "Cats", "Seniors"].map((tag, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-900">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
  
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                    Apply Filters
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            </div>
  
            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for pets by name, breed, or location..."
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
  
              {/* Featured Adoptions */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Featured Pets</h2>
                  <div className="flex gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronLeft size={20} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
  
                <div className="relative overflow-hidden">
                  <div className="flex">
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2 h-64 relative rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="Max"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                            Urgent
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Max</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                              Golden Retriever
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm flex items-center">
                              <Calendar size={14} className="mr-1" />2 years
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm flex items-center">
                              <MapPin size={14} className="mr-1" />
                              San Francisco, CA
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks
                            in the park. He's great with kids and other dogs!
                          </p>
                          <div className="flex gap-3">
                            <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                              Learn More
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                              <Heart size={18} className="mr-2" />
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* View Toggle and Results Count */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">10 pets available</p>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button className="px-3 py-1 bg-teal-600 text-white">Grid</button>
                  <button className="px-3 py-1 bg-white text-gray-700">List</button>
                </div>
              </div>
  
              {/* Adoption Listings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pet Card 1 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src="/placeholder.svg?height=300&width=400" alt="Bella" className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      Urgent
                    </div>
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                  </div>
  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Bella</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs">Siamese Mix</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <Calendar size={12} className="mr-1" />1 year
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <MapPin size={12} className="mr-1" />
                        Oakland, CA
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Bella is a sweet and playful Siamese mix who loves to cuddle and play with toys. She's litter
                      trained and would do well in a quiet home.
                    </p>
                    <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
  
                {/* Pet Card 2 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src="/placeholder.svg?height=300&width=400" alt="Charlie" className="w-full h-48 object-cover" />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                  </div>
  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Charlie</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs">Beagle</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <Calendar size={12} className="mr-1" />3 years
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <MapPin size={12} className="mr-1" />
                        San Jose, CA
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Charlie is a loving Beagle with a great nose! He loves to explore and would be perfect for an active
                      family. He's house trained and knows basic commands.
                    </p>
                    <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
  
                {/* Pet Card 3 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src="/placeholder.svg?height=300&width=400" alt="Luna" className="w-full h-48 object-cover" />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                  </div>
  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Luna</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs">Domestic Shorthair</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <Calendar size={12} className="mr-1" />2 years
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <MapPin size={12} className="mr-1" />
                        San Francisco, CA
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Luna is a quiet and independent cat who enjoys lounging in sunny spots. She's looking for a calm
                      home where she can relax and get occasional pets.
                    </p>
                    <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
  
                {/* Pet Card 4 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src="/placeholder.svg?height=300&width=400" alt="Rocky" className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      Urgent
                    </div>
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                  </div>
  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Rocky</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs">Pitbull Mix</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <Calendar size={12} className="mr-1" />4 years
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs flex items-center">
                        <MapPin size={12} className="mr-1" />
                        Berkeley, CA
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Rocky is a gentle giant with a heart of gold. Despite his size, he's a total softie who loves
                      cuddles and treats. He needs a home with experienced dog owners.
                    </p>
                    <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
  
              {/* Success Stories */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Success Story 1 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/2 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">Max Found His Forever Family</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            After 3 months in foster care, Max the Golden Retriever found his perfect match with the
                            Johnson family. Now he enjoys beach trips and has a yard to play in!
                          </p>
                        </div>
                        <div className="flex items-center">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="The Johnson Family"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium text-gray-900">The Johnson Family</p>
                            <p className="text-gray-500 text-sm">Adopted 3 months ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-1/2 h-48 sm:h-auto relative">
                        <div className="grid grid-cols-2 h-full">
                          <div className="relative">
                            <img
                              src="/placeholder.svg?height=200&width=200"
                              alt="Before adoption"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
                              Before
                            </div>
                          </div>
                          <div className="relative">
                            <img
                              src="/placeholder.svg?height=200&width=200"
                              alt="After adoption"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
                              After
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  {/* Success Story 2 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/2 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">Luna's Second Chance</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Luna was found as a stray and needed medical care. After recovery, she was adopted by Sarah
                            who gave her the loving home she deserved.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="Sarah Chen"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Sarah Chen</p>
                            <p className="text-gray-500 text-sm">Adopted 6 months ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-1/2 h-48 sm:h-auto relative">
                        <div className="grid grid-cols-2 h-full">
                          <div className="relative">
                            <img
                              src="/placeholder.svg?height=200&width=200"
                              alt="Before adoption"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
                              Before
                            </div>
                          </div>
                          <div className="relative">
                            <img
                              src="/placeholder.svg?height=200&width=200"
                              alt="After adoption"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
                              After
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Resources */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Adoption Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Resource Card 1 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Preparing Your Home"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Preparing Your Home for a New Pet</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        Learn how to pet-proof your home and get all the supplies you need before bringing your new family
                        member home.
                      </p>
                      <a href="#" className="text-teal-600 font-medium hover:underline">
                        Read More →
                      </a>
                    </div>
                  </div>
  
                  {/* Resource Card 2 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="First 30 Days"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">First 30 Days: Helping Your Pet Adjust</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        Tips and advice for helping your newly adopted pet settle into their new environment and routine.
                      </p>
                      <a href="#" className="text-teal-600 font-medium hover:underline">
                        Read More →
                      </a>
                    </div>
                  </div>
  
                  {/* Resource Card 3 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Pet-Friendly Housing"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Finding Pet-Friendly Housing</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        Resources and tips for locating apartments and homes that welcome pets of all types and sizes.
                      </p>
                      <a href="#" className="text-teal-600 font-medium hover:underline">
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Pet Detail Modal Preview */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 hidden">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Max</h2>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>
  
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image Gallery */}
                <div className="lg:w-1/2">
                  <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-2">
                    <img src="/placeholder.svg?height=400&width=600" alt="Max" className="w-full h-full object-cover" />
  
                    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <ChevronLeft size={20} />
                    </button>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <ChevronRight size={20} />
                    </button>
  
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      Urgent
                    </div>
                  </div>
  
                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3].map((index) => (
                      <button
                        key={index}
                        className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 ${
                          index === 1 ? "ring-2 ring-teal-600" : ""
                        }`}
                      >
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt={`Max thumbnail ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
  
                {/* Pet Details */}
                <div className="lg:w-1/2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Max</h3>
                      <p className="text-gray-600">Golden Retriever</p>
                    </div>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Heart size={20} className="text-gray-600" />
                    </button>
                  </div>
  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm flex items-center">
                      <Calendar size={16} className="mr-1" />2 years
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm flex items-center">
                      <MapPin size={16} className="mr-1" />
                      San Francisco, CA
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">Male</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">Large</span>
                  </div>
  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">About</h4>
                    <p className="text-gray-600">
                      Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks in
                      the park. He's great with kids and other dogs! He's house trained, knows basic commands, and is
                      looking for an active family who can give him plenty of exercise and attention.
                    </p>
                  </div>
  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Characteristics</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Friendly", "Energetic", "Trained", "Vaccinated"].map((tag, index) => (
                        <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-md text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Good With</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "kids", compatible: true },
                        { name: "dogs", compatible: true },
                        { name: "cats", compatible: false },
                        { name: "seniors", compatible: true },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className={`flex items-center p-2 rounded-md ${
                            item.compatible ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {item.compatible ? <Check size={16} className="mr-2" /> : <X size={16} className="mr-2" />}
                          <span className="capitalize">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                      Contact Owner
                    </button>
                    <a className="flex-1 border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50 transition-colors text-center">
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }

export default AdoptionPage






