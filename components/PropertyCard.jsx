import Image from "next/image"
import { Bed, Bath, Ruler, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

const PropertyCard = ({ property }) => {
  const { rates } = property

  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${property.rates.monthly}/Mo`
    } else if (rates.weekly) {
      return `${property.rates.weekly}/Wk`
    } else if (rates.nightly) {
      return `${property.rates.nightly}/night`
    }
  }

  return (
    <div className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative bg-white overflow-hidden border border-gray-100 hover:border-blue-200 max-w-sm mx-auto sm:max-w-md lg:max-w-lg transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image
          src={property.images[0] || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          width={0}
          height={0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Enhanced hover overlay with view icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="text-left mb-4">
          <div className="text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3 border border-blue-100 shadow-sm">
            {property?.type}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {property?.name}
          </h3>
        </div>

        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg backdrop-blur-sm border-2 border-white/50 hover:bg-blue-700 transition-colors duration-200">
          Rs.{getRateDisplay()}
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 text-gray-600 mb-4 sm:mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
          <div className="flex items-center gap-1 sm:gap-2 group/feature">
            <div className="bg-white rounded-full p-2 shadow-sm group-hover/feature:shadow-md group-hover/feature:scale-110 transition-all duration-200">
              <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm sm:text-base text-gray-800">{property.beds}</span>
              <span className="text-xs text-gray-500 hidden sm:inline font-medium">Beds</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 group/feature">
            <div className="bg-white rounded-full p-2 shadow-sm group-hover/feature:shadow-md group-hover/feature:scale-110 transition-all duration-200">
              <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm sm:text-base text-gray-800">{property.baths}</span>
              <span className="text-xs text-gray-500 hidden sm:inline font-medium">Baths</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 group/feature">
            <div className="bg-white rounded-full p-2 shadow-sm group-hover/feature:shadow-md group-hover/feature:scale-110 transition-all duration-200">
              <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm sm:text-base text-gray-800">{property.square_feet}</span>
              <span className="text-xs text-gray-500 hidden sm:inline font-medium">sqft</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-emerald-700 text-xs sm:text-sm mb-4 sm:mb-6">
          {rates.weekly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 hover:shadow-sm transition-all duration-200">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Weekly</span>
            </div>
          )}
          {rates.monthly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 hover:shadow-sm transition-all duration-200">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Monthly</span>
            </div>
          )}
          {rates.nightly && (
            <div className="flex items-center gap-1 sm:gap-2 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 hover:shadow-sm transition-all duration-200">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Nightly</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mb-4 sm:mb-6"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors duration-200">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            <span className="font-semibold text-sm sm:text-base text-gray-700">
              {property.location.city}, {property.location.state}
            </span>
          </div>

          <Link
            href={`/properties/${property._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 min-w-[90px] sm:min-w-[100px] text-center border-2 border-blue-600 hover:border-blue-700"
          >
            Details
          </Link>
        </div>
      </div>

      {/* Subtle decorative element */}
    </div>
  )
}

export default PropertyCard
