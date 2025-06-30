"use client";
import React from "react";
import Properties from "@/properties";
import PropertyCard from "@/components/PropertyCard";
import AddForm from "@/components/AddForm";
const Addpage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
         <AddForm/>
        </div>
      </div>
    </section>
  );
};

export default Addpage;
