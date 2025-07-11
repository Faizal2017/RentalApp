"use client"
import ProfileDefault from "@/assets/images/profile.png"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState, useEffect } from "react"
import Spinner from "@/components/Spinner"
import Link from "next/link"
import { toast } from "react-toastify"

const ProfilePage = () => {
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const { data: session } = useSession()

  const profileImage = session?.user?.image
  const name = session?.user?.name
  const email = session?.user?.email
  const userId = session?.user?.id

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) return
      try {
        const response = await fetch(`/api/properties/user/${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const data = await response.json()
        setProperties(data)
        setLoading(false)
      } catch (error) {
        console.log("Error fetching user properties:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user?.id) {
      fetchUserProperties(session.user.id)
    }
  }, [session])

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this property? .")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      })

      if (response.status === 200) {
        const updatedProperties = properties.filter((property) => property._id !== propertyId)
        setProperties(updatedProperties)
        toast.success("Property deleted successfully!")
      } else {
        alert("Failed to delete property. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting property:", error)
      toast.error("Failed to delete property. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Profile Section */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="relative inline-block mb-8">
                      <div className="relative">
                        <Image
                          className="h-44 w-44 rounded-full object-cover border-4 border-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-3xl"
                          src={profileImage || ProfileDefault}
                          alt="User"
                          width={176}
                          height={176}
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</span>
                        </div>
                        <p className="text-xl font-bold text-gray-800">{name || "Not provided"}</p>
                      </div>

                      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3-pool8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Email Address
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 break-all">{email || "Not provided"}</p>
                      </div>

                      <div className="bg-blue-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-bold uppercase tracking-wider">Total Properties</span>
                        </div>
                        <p className="text-4xl font-bold">{properties.length}</p>
                        <p className="text-blue-100 text-sm mt-2">Active Listings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties Section */}
              <div className="lg:w-2/3">
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                          Your Property Portfolio
                        </h2>
                        <p className="text-gray-600 mt-1">Manage and monitor your real estate investments</p>
                      </div>
                    </div>
                    {properties.length > 0 && (
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold shadow-md border border-blue-200">
                        {properties.length} {properties.length === 1 ? "Property" : "Properties"}
                      </div>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="text-center">
                      <div className="mb-6">
                        <Spinner loading={loading} />
                      </div>
                      <p className="text-gray-600 text-lg">Loading your amazing properties...</p>
                    </div>
                  </div>
                ) : properties.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-700 mb-4">No Properties Listed Yet</h3>
                    <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                      Start building your real estate empire by adding your first property listing today!
                    </p>
                    <Link
                      href="/properties/add"
                      className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Your First Property
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {properties.map((property) => (
                      <div
                        key={property._id}
                        className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden"
                      >
                        <Link href={`/property/${property._id}`}>
                          <div className="relative overflow-hidden">
                            <Image
                              className="h-56 w-full object-cover transition-all duration-700 group-hover:scale-110"
                              src={property.images[0] || "/placeholder.svg"}
                              alt={property.name}
                              width={0}
                              height={0}
                              sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <svg
                                className="w-5 h-5 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                          </div>
                        </Link>

                        <div className="p-6">
                          <Link href={`/property/${property._id}`}>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                              {property.name}
                            </h3>
                          </Link>

                          <div className="flex items-start mb-6">
                            <svg
                              className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
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
                            <p className="text-gray-600 leading-relaxed">
                              {property.location.street} {property.location.city}, {property.location.state}{" "}
                              {property.location.zipcode}
                            </p>
                          </div>

                          <div className="flex gap-4">
                            <Link
                              href={`/properties/${property._id}/edit`}
                              className="flex-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white text-center py-3 rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </Link>
                            <button
                              className="flex-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-3 rounded-xl hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center"
                              type="button"
                              onClick={() => handleDeleteProperty(property._id)}
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage