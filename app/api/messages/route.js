import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

// POST /api/messages
export const dynamic = "force-dynamic";
export const POST = async (request) => {
  try {
    //connect to the database
    await connectDB();

    //get the session user
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "you must login to send message" }), {
        status: 401,
      });
    }

    const { user } = sessionUser;

    const { name, email, phone, message, property, recipient } =   await request.json();

    //validating from sending self message
    if(recipient === user.id) {
      return new Response(JSON.stringify({ message: "You cannot send message to yourself" }), {
        status: 400,
      });
    }

    //creating a new message
    const newMessage = new Message({
        name,
        email,
        phone,
        body:message,
        property,
        sender: user.id,
        recipient,

    })

    //save the message to the database
    await newMessage.save();

    return new Response(JSON.stringify({message: "message sent"}), {
      status: 200,
    });
    
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};


// GET api/messages
export const GEt = async (request)=>{
    //connect db
    await connectDB();

    //get the session user
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "you must login to get messages" }), {
        status: 401,
      });
    }
    const {userId}= sessionUser;

    const messages = await Message.find({recepient: userId})
      .populate("sender", "name")
      .populate("property", "title")
      .sort({ createdAt: -1 });
}