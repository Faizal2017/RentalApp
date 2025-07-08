import Property from "@/models/Property";
import { connectDB } from "@/config/database";

export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    //match location patterb against databse fields
    let query = {
      $or: [
        {
          name: locationPattern,
        },
        { description: locationPattern },
        {
          "location.street": locationPattern,
        },
        {
          "location.city": locationPattern,
        },
        {
          "location.state": locationPattern,
        },
        {
          "location.zipcode": locationPattern,
        },
      ],
    };

    // only check for propert if its not 'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = propertyType;
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error("Error search properties:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
