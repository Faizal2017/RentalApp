"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";

const Searchpage = () => {
  const searchparams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchparams.get("location");
  const propertyType = searchparams.get("propertyType");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (response.status == 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location, propertyType]);

  return loading ? (
    <Spinner loading={loading} />):(
         <section className="px-4 py-6">
              <div className="container-xl lg:container m-auto px-4 py-6">
                <Link
                  href="/properties"
                  className="flex items-center text-blue-500 mb-3 hover:underline"
                >
                  <FaArrowAltCircleLeft className="mr-2 mb-1" />
                  Back to Properties
                </Link>
              <h1 className="text-2xl font-bold mb-4">search results</h1>
                {properties.length === 0 ? (
                  <div>No search results found</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {" "}
                    {properties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            </section>
    )
};

export default Searchpage;
