import React from "react";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendar,
  FaMapMarker,
} from "react-icons/fa";
import Image from "next/image";

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `${property.rates.monthly}/Mo`;
    } else if (rates.weekly) {
      return `${property.rates.weekly}/Wk`;
    } else if (rates.nightly) {
      return `${property.rates.nightly}/night`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={property.images[0]}
        alt={property.name}
        className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          Rs.{getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-2"></FaBed> {property.beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2"></FaBath> {property.baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2"></FaRulerCombined>
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.weekly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <FaCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Weekly</span>
            </div>
          )}
          {property.rates.monthly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <FaCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Monthly</span>
            </div>
          )}
          {property.rates.nightly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <FaCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Nightly</span>
            </div>
          )}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="inline-block mr-1" />
            <span className="text-orange-700">
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
