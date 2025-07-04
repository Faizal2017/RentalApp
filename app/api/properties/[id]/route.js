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


//Update /api/properties/:id

export const PUT = async (request,{params}) => {
  try {
    // Connect to the database
    await connectDB();

    const {id} = params;

    // Get the session user
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("UserId is required"), {
        status: 401,
      });
    }

    //geting owner id
    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    //existing propert data
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response(JSON.stringify("Property not found"), {
        status: 404,
      });
    }

    // verify if the user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response(JSON.stringify("Unauthorized"), {
        status: 403,
      });
    }
   
    const propertyData = {
      name: formData.get("name"),
      description: formData.get("description"),
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipCode: formData.get("location.zipcode"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      type: formData.get("type"),
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: amenities,
      //images: images,
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id,propertyData)
    return new Response(
      JSON.stringify(updatedProperty),
       { status: 200 }
    );
  } catch (error) {
    console.error("Error creating property:", error);
    return new Response(JSON.stringify("Failed to create property"), {
      status: 500,
    });
  }
};