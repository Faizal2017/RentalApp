import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
// GET /api/properties/:id
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

// DELETE /api/properties/:id
export const DELETE = async (request,{params}) => {
   const sessionUser = await getSessionUser();
try{

   const propertyId = params.id;
    // Validate propertyId
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("UserId is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    // Connect to the database
    await connectDB();

    // Fetch all properties from the database
    const property = await Property.findById(propertyId);
    if (!property) {
      return new Response("Property not found", {
        status: 404,
      });
    }

    // verify if the user is the owner of the property
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", {
        status: 403,
      });
    }
    await property.deleteOne();

    return new Response(JSON.stringify("deleted success"), {
      status: 200,
    });
    
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};
