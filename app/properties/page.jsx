"use client";
import React from "react";
import Properties from "@/properties";
import PropertyCard from "@/components/PropertyCard";
const page = () => {
  return (
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
      </div>
    </section>
  );
};

export default page;
