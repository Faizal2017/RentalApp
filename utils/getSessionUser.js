import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null; // User is not authenticated
    }

    console.log("Session User:", session.user.id);
    return {
      user: session.user,
      userId: session.user.id,
    }; // Return the authenticated user
  } catch (error) {
    console.error("Error getting session user:", error);
    return null; // Return null in case of an error
  }
};
