"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const notificationCount = () => {
  const {count, setCount} = useGlobalContext(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const res = await fetch(`/api/messages/message-count`, {
          method: "GET",
        });

        if (res.status === 200) {
          const data = await res.json();
          setCount(data.count);
        } else {
          console.error("Failed to fetch notification count");
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };
    fetchNotificationCount();
  }, []);

  // If count is 0, don't render the badge
  if (count === 0) {
    return null;
  }
  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {count}
    </span>
  );
};

export default notificationCount;
