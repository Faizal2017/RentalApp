import { connectDB } from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import Property from "@/models/Property";

// This route handles checking if a property is bookmarked by the user


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
    const {userId} = sessionUser;

    const user = await User.findById({ _id: userId });

    //check if the user already bookmarked the property
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};


// GET api/bookmark/check      to get saved properties of the user
export const GET = async () => {
  try {
    //connect to the database
    await connectDB();

    //get the session user
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }));
    }

    //
    const { userId } = sessionUser;
    const user = await User.findById({ _id: userId });

    const properties = await Property.find({ _id: {$in: user.bookmarks } });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};