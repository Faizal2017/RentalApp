"use client";
import ProfileDefault from "@/assets/images/profile.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) return;
      try {
        const response = await fetch(`/api/properties/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property? ."
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);
        toast.success("Property deleted successfully!");
      } else {
        alert("Failed to delete property. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property. Please try again.");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Profile</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
              <div className="mb-6">
                <Image
                  className="h-40 w-40 rounded-full object-cover border-4 border-blue-100 shadow-sm"
                  src={profileImage || ProfileDefault}
                  alt="User"
                  width={160}
                  height={160}
                />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-semibold text-gray-700">
                  <span className="block text-sm font-medium text-gray-500">Name</span>
                  {name || "Not provided"}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-700 mt-4">
                  <span className="block text-sm font-medium text-gray-500">Email</span>
                  {email || "Not provided"}
                </h2>
              </div>
            </div>

            <div className="lg:w-2/3">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Listings</h2>
              {loading ? (
                <div className="flex justify-center">
                  <Spinner loading={loading} />
                </div>
              ) : properties.length === 0 ? (
                <p className="text-gray-500 text-center italic">You have no properties listed.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <div
                      key={property._id}
                      className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                    >
                      <Link href={`/property/${property._id}`}>
                        <Image
                          className="h-48 w-full rounded-lg object-cover mb-4"
                          src={property.images[0]}
                          alt={property.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                        />
                      </Link>
                      <div className="mb-4">
                        <p className="text-lg font-semibold text-gray-800">{property.name}</p>
                        <p className="text-gray-600 text-sm">
                          {property.location.street} {property.location.city}, {property.location.state} {property.location.zipcode}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-600/90 transition-colors duration-200"
                          type="button"
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;