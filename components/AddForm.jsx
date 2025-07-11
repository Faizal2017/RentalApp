"use client"
import { useState, useEffect } from "react"

const AddForm = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [fields, setFields] = useState({
    type: "",
    owner: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: 0,
    baths: 0,
    square_feet: 0,
    amenities: [],
    rates: {
      weekly: 0,
      monthly: 0,
      nightly: 0,
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    images: [],
    is_featured: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFields((prevFields) => ({
        ...prevFields,
        [parent]: {
          ...prevFields[parent],
          [child]: value,
        },
      }))
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }))
    }
  }

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target
    const updatedAmenities = [...fields.amenities]
    if (checked) {
      updatedAmenities.push(value)
    } else {
      const index = updatedAmenities.indexOf(value)
      if (index !== -1) {
        updatedAmenities.splice(index, 1)
      }
    }
    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }))
  }

  const handleImageChange = (e) => {
    const { files } = e.target
    const updatesImages = [...fields.images]
    for (const file of files) {
      updatesImages.push(file)
    }
    setFields((prevFields) => ({
      ...prevFields,
      images: updatesImages,
    }))
  }

  return (
    mounted && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Add Your Property
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a stunning listing that attracts the perfect tenants for your property
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <form action="/api/properties" method="POST" encType="multipart/form-data" className="p-8 space-y-8">
              {/* Basic Information Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        id="type"
                        name="type"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                        required
                        value={fields.type}
                        onChange={handleChange}
                      >
                        <option value="">Select property type</option>
                        <option value="Apartment">🏢 Apartment</option>
                        <option value="Condo">🏘️ Condo</option>
                        <option value="House">🏠 House</option>
                        <option value="CabinOrCottage">🏡 Cabin or Cottage</option>
                        <option value="Room">🚪 Room</option>
                        <option value="Studio">🏙️ Studio</option>
                        <option value="Other">📋 Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      placeholder="e.g., Beautiful Apartment In Miami"
                      required
                      value={fields.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none"
                    rows="4"
                    placeholder="Describe what makes your property special..."
                    value={fields.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Location Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Location Details</h2>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl space-y-4">
                  <input
                    type="text"
                    id="street"
                    name="location.street"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                    placeholder="🏠 Street Address"
                    value={fields.location.street}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                      type="text"
                      id="city"
                      name="location.city"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="🏙️ City"
                      required
                      value={fields.location.city}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      id="state"
                      name="location.state"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="📍 State"
                      required
                      value={fields.location.state}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      id="zipcode"
                      name="location.zipcode"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="📮 Zip Code"
                      value={fields.location.zipcode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Property Details Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Property Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="beds" className="block text-sm font-semibold text-gray-700 mb-2">
                      🛏️ Bedrooms
                    </label>
                    <input
                      type="number"
                      id="beds"
                      name="beds"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      required
                      min="0"
                      value={fields.beds}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="baths" className="block text-sm font-semibold text-gray-700 mb-2">
                      🚿 Bathrooms
                    </label>
                    <input
                      type="number"
                      id="baths"
                      name="baths"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      required
                      min="0"
                      value={fields.baths}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="square_feet" className="block text-sm font-semibold text-gray-700 mb-2">
                      📐 Square Feet
                    </label>
                    <input
                      type="number"
                      id="square_feet"
                      name="square_feet"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      required
                      min="0"
                      value={fields.square_feet}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Amenities</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {[
                    { id: "amenity_wifi", value: "Wifi", emoji: "📶" },
                    { id: "amenity_kitchen", value: "Full kitchen", emoji: "🍳" },
                    { id: "amenity_washer_dryer", value: "Washer & Dryer", emoji: "🧺" },
                    { id: "amenity_free_parking", value: "Free Parking", emoji: "🚗" },
                    { id: "amenity_pool", value: "Swimming Pool", emoji: "🏊" },
                    { id: "amenity_hot_tub", value: "Hot Tub", emoji: "🛁" },
                    { id: "amenity_24_7_security", value: "24/7 Security", emoji: "🔒" },
                    { id: "amenity_wheelchair_accessible", value: "Wheelchair Accessible", emoji: "♿" },
                    { id: "amenity_elevator_access", value: "Elevator Access", emoji: "🛗" },
                    { id: "amenity_dishwasher", value: "Dishwasher", emoji: "🍽️" },
                    { id: "amenity_gym_fitness_center", value: "Gym/Fitness Center", emoji: "💪" },
                    { id: "amenity_air_conditioning", value: "Air Conditioning", emoji: "❄️" },
                    { id: "amenity_balcony_patio", value: "Balcony/Patio", emoji: "🌿" },
                    { id: "amenity_smart_tv", value: "Smart TV", emoji: "📺" },
                    { id: "amenity_coffee_maker", value: "Coffee Maker", emoji: "☕" },
                  ].map((amenity) => (
                    <div key={amenity.id} className="relative">
                      <input
                        type="checkbox"
                        id={amenity.id}
                        name="amenities"
                        value={amenity.value}
                        className="sr-only"
                        checked={fields.amenities.includes(amenity.value)}
                        onChange={handleAmenitiesChange}
                      />
                      <label
                        htmlFor={amenity.id}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                          fields.amenities.includes(amenity.value)
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl mr-3">{amenity.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">{amenity.value}</span>
                        {fields.amenities.includes(amenity.value) && (
                          <svg className="w-5 h-5 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </label>
                    </div>
                  ))}
                </div>

                {fields.amenities.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm font-semibold text-blue-800 mb-2">
                      Selected Amenities ({fields.amenities.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {fields.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Pricing</h2>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-4">💡 Leave blank if not applicable</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="weekly_rate" className="block text-sm font-semibold text-gray-700">
                        📅 Weekly Rate (Rs)
                      </label>
                      <input
                        type="number"
                        id="weekly_rate"
                        name="rates.weekly"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                        min="0"
                        value={fields.rates.weekly}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="monthly_rate" className="block text-sm font-semibold text-gray-700">
                        🗓️ Monthly Rate (Rs)
                      </label>
                      <input
                        type="number"
                        id="monthly_rate"
                        name="rates.monthly"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                        min="0"
                        value={fields.rates.monthly}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="nightly_rate" className="block text-sm font-semibold text-gray-700">
                        🌙 Nightly Rate (Rs)
                      </label>
                      <input
                        type="number"
                        id="nightly_rate"
                        name="rates.nightly"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                        min="0"
                        value={fields.rates.nightly}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="border-b border-gray-100 pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="seller_name" className="block text-sm font-semibold text-gray-700 mb-2">
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      id="seller_name"
                      name="seller_info.name"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      placeholder="Your full name"
                      value={fields.seller_info.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="seller_email" className="block text-sm font-semibold text-gray-700 mb-2">
                        📧 Email Address
                      </label>
                      <input
                        type="email"
                        id="seller_email"
                        name="seller_info.email"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                        placeholder="your.email@example.com"
                        required
                        value={fields.seller_info.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="seller_phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        📞 Phone Number
                      </label>
                      <input
                        type="tel"
                        id="seller_phone"
                        name="seller_info.phone"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                        placeholder="(555) 123-4567"
                        value={fields.seller_info.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="pb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Property Images</h2>
                </div>

                <div className="space-y-2">
                  <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-2">
                    📸 Upload Images (Select up to 4 images)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-indigo-100 cursor-pointer"
                      accept="image/*"
                      multiple
                      required
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    📝 Accepted formats: JPG, PNG, GIF. High-quality images get more views!
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  type="submit"
                >
                  🚀 Create Property Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default AddForm
