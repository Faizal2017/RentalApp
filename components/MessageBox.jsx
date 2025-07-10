"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { useGlobalContext } from "@/context/GlobalContext"

const MessageBox = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read)
  const [isdeleted, setisDeleted] = useState(false)
  const { setCount } = useGlobalContext()

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      })
      if (res.status === 200) {
        const { read } = await res.json()
        setIsRead(read)
        setCount((prevCount) => (read ? prevCount - 1 : prevCount + 1))
        if (read) {
          toast.success("Message marked as read")
        } else {
          toast.success("Message marked as new")
        }
      } else {
        console.error("Failed to update message read status")
      }
    } catch (error) {
      console.error("Error updating message read status:", error)
      toast.error("Failed to update message status. Please try again later.")
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      })
      if (res.status === 200) {
        setisDeleted(true)
        setCount((prevCount) => prevCount - 1)
        toast.success("Message deleted successfully")
      } else {
        toast.error("Failed to delete message")
      }
    } catch (error) {
      toast.error("Error deleting message. Please try again later.")
      console.error("Error deleting message:", error)
    }
  }

  if (isdeleted) {
    return null // Don't render anything if the message is deleted
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header Section */}
      <div
        className={`p-6 ${isRead ? "bg-gradient-to-r from-gray-50 to-gray-100" : "bg-gradient-to-r from-blue-50 to-indigo-50"} border-b border-gray-100`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${isRead ? "bg-gray-400" : "bg-blue-500 animate-pulse"}`}
              ></div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Property Inquiry</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{message.property.name}</h2>
          </div>

          {!isRead && (
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                NEW
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">{message.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</span>
              </div>
              <p className="font-semibold text-gray-800">{message.sender.username}</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Received</span>
              </div>
              <p className="font-semibold text-gray-800">{new Date(message.createdAt).toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</span>
              </div>
              <a
                href={`mailto:${message.email}`}
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                {message.email}
              </a>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</span>
              </div>
              <a
                href={`tel:${message.phone}`}
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                {message.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReadClick}
            className={`flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
              isRead
                ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isRead ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            {isRead ? "Mark as New" : "Mark as Read"}
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
