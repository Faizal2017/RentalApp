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

  //handle delete property
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
        //remove the deleted property from the state
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
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || ProfileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p className="text-gray-600">You have no properties listed.</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/property/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt={property.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address:{" "}
                        {property.location.street +
                          " " +
                          property.location.city +
                          ", " +
                          property.location.state +
                          " " +
                          property.location.zipcode}
                      </p>
                    </div>
                    <div className="mt-2">
                      <a
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </a>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => {
                          handleDeleteProperty(property._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
