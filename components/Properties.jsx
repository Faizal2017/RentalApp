"use client";
import PropertyCard from "@/components/PropertyCard";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = () => {
  const [Properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); //set how many componanents
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {Properties.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            {Properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange}/>
      </div>
    </section>
  );
};

export default Properties;
