import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import  cloudinary  from "@/config/Cloudinary";

// GET /api/properties
export const GET = async (request) => {
  // Connect to the database
  await connectDB();

  // Fetch all properties from the database
  const properties = await Property.find({});

  // Return a response
  return new Response(JSON.stringify(properties), {
    status: 200,
  });
};

export const POST = async (request) => {
  try {
    // Connect to the database
    await connectDB();

    // Get the session user
    const sessionUser = await getSessionUser();
    console.log("Session User:", sessionUser);
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("UserId is required"), {
        status: 401,
      });
    }

    //geting owner id
    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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

    //uploading images to cloudinary
    const imageUploadPromisies = [];

    // Loop through each image and upload it to Cloudinary
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer(); // Convert to ArrayBuffer
      const imageArray = Array.from(new Uint8Array(imageBuffer)); // Convert to Uint8Array
      const imageData = Buffer.from(imageArray); // Convert to Buffer

      //convert the image to base64
      const imageBase64 = imageData.toString("base64");

      //make the upload request to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertyPulse",
        }
      );

      // Push the upload promise to the array
      imageUploadPromisies.push(result.secure_url);

      //wait for all uploads to complete
      const uploadedImages = await Promise.all(imageUploadPromisies);

      //adding the uploaded images to the property data
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
      303
    );
    // return new Response(
    //   JSON.stringify("Property created successfully"),
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Error creating property:", error);
    return new Response(JSON.stringify("Failed to create property"), {
      status: 500,
    });
  }
};
