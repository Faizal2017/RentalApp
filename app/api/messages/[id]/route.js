import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
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

    const { id } = params;

    const message = await Message.findById(id);
    if (!message) {
      return new Response(JSON.stringify({ message: "message not found" }), {
        status: 404,
      });
    }

    if (message.recipient.toString() !== userId) {
      return new Response(
        JSON.stringify({
          message: "you are not authorized to update this message",
        }),
        {
          status: 403,
        }
      );
    }
    message.read = !message.read;
    await message.save();
    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
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

    const { id } = params;

    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return new Response(JSON.stringify({ message: "message not found" }), {
        status: 404,
      });
    }

    if (message.recipient.toString() !== userId) {
      return new Response(
        JSON.stringify({
          message: "you are not authorized to update this message",
        }),
        {
          status: 403,
        }
      );
    }

    return new Response("Message deleted", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
