import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/message-count
export const GET = async (request) => {
  try {
    //connect to the database
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "invalid user" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;


    const unReadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unReadMessageCount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
