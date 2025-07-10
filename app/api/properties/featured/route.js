import { connectDB } from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all properties from the database
    const properties = await Property.find({ is_featured: true });

    // Return a response
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch featured properties" }),
      {}
    );
  }
};
