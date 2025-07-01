import Image from "next/image"
import { Bed, Bath, Ruler, MapPin, Calendar } from "lucide-react"
import Link from "next/link";

const PropertyCard = ({ property }) => {
  const { rates } = property;

  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${property.rates.monthly}/Mo`;
    } else if (rates.weekly) {
      return `${property.rates.weekly}/Wk`; 
    } else if (rates.nightly) {
      return `${property.rates.nightly}/night`;
    }
  }

  return (
    <div className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative bg-white overflow-hidden border border-gray-100 hover:border-gray-200 max-w-sm mx-auto sm:max-w-md lg:max-w-lg">
      <div className="relative overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.name}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          width={0}
          height={0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="text-left mb-4">
          <div className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full inline-block mb-2">
            {property?.type}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight line-clamp-2">{property?.name}</h3>
        </div>

        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-md backdrop-blur-sm">
          $ {getRateDisplay()}
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 text-gray-600 mb-4 sm:mb-6 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            <span className="font-medium text-sm sm:text-base">{property.beds}</span>
            <span className="text-xs sm:text-sm hidden sm:inline">Beds</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            <span className="font-medium text-sm sm:text-base">{property.baths}</span>
            <span className="text-xs sm:text-sm hidden sm:inline">Baths</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            <span className="font-medium text-sm sm:text-base">{property.square_feet}</span>
            <span className="text-xs sm:text-sm hidden sm:inline">sqft</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-emerald-700 text-xs sm:text-sm mb-4 sm:mb-6">
          {rates.weekly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Weekly</span>
            </div>
          )}
          {rates.monthly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Monthly</span>
            </div>
          )}
          {rates.nightly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Nightly</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mb-4 sm:mb-6"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-orange-600">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base text-gray-700">{property.location.city}, {property.location.state}</span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 min-w-[90px] sm:min-w-[100px] text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard