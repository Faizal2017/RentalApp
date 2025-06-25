import { connectDB } from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request,{params}) => {
  // Connect to the database
  await connectDB();
  try {
    // Fetch all properties from the database
    const properties = await Property.findById({ _id: params.id });
    if (!properties) {
      return new Response("Property not found", {
        status: 404,
      });
    }

    // Return a response
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};
