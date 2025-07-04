"use client";

import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const UserId = session?.user?.id;
  const [isbookmarked, setisBookmarked] = useState(false);

  const handleClick = async () => {
    if (!UserId) {
      toast.error("You need to be logged in to bookmark a property.");
      return;
    }

    try {
      const res = await fetch(`/api/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setisBookmarked(data.isBookmarked);
        toast.success(data.message || "Property bookmarked successfully!");
      }
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error("Failed to bookmark property. Please try again later.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;