import { connectDB } from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
    try {
        // connect to the database
        await connectDB();

        // get userId from params
        const { userId } = params;

        // Validate userId
        if (!userId) {
            return new Response(JSON.stringify("UserId is required"), { status: 400 });
        }

        const properties = await Property.find({ owner: userId });

        // Return a response with the properties
        if (!properties || properties.length === 0) {
            return new Response(JSON.stringify("No properties found"), { status: 404 });
        }

        return new Response(JSON.stringify(properties), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching user properties:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch user properties" }), {
            status: 500,
        });
    }
};
