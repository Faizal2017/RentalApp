"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchProperty } from "@/utils/requests";
import PropertyImage from "@/components/PropertyImage";
import PropertyDeatils from "@/components/PropertyDeatils";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertImages from "@/components/PropertImages";
import Spinner from "@/components/Spinner";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import ContactForm from "@/components/ContactForm";

const page = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!loading && !property) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-gray-600">
          The property you are looking for does not exist.
        </p>
        <Link
          href="/properties"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowAltCircleLeft className="mr-2" />
                Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid-70-30 w-full gap-6">
                {" "}
                <PropertyDeatils property={property} />
                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButton property={property} />
                  <ContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>

          <PropertImages images={property.images} />
        </>
      )}
    </>
  );
};

export default page;
