import { connectDB } from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import Property from "@/models/Property";

// This route handles bookmarking properties for the user
export const dynamic = "force-dynamic";
export const POST = async (request) => {
  try {
    //connect to the database
    await connectDB();

    //get the session user
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }));
    }

    //get user id
    const { propertyId } = await request.json();

    //
    const { userId } = sessionUser;

    const user = await User.findById({ _id: userId });

    //check if the user already bookmarked the property
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      //if already bookmared remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      //if not bookmarked add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
