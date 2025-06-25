import { connectDB } from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {
  // Connect to the database
  await connectDB();

  // Fetch all properties from the database
  const properties = await Property.find({});

  // Return a response
  return new Response(
    JSON.stringify(properties),
    {
      status: 200,
    }
  );
};
