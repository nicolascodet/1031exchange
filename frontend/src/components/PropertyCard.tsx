'use client';

import { Property } from '@/services/property';
import { formatCurrency, formatDate, formatPropertyType, formatSquareFootage, formatPercentage } from '@/utils/format';

interface PropertyCardProps {
  property: Property;
  matchScore?: number;
  priceDifference?: number;
}

const PropertyCard = ({ property, matchScore, priceDifference }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200 h-full">
      <div className="p-6">
        {/* Property Type Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {formatPropertyType(property.property_type)}
          </span>
          {matchScore !== undefined && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Match: {Math.round(matchScore * 100)}%
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(property.price)}
          </div>
          {priceDifference !== undefined && (
            <div className={`text-sm ${priceDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceDifference >= 0 ? '+' : ''}{formatCurrency(priceDifference)} difference
            </div>
          )}
        </div>

        {/* Address & Location */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{property.address}</h3>
          <p className="text-gray-600 line-clamp-1">{property.location}</p>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Square Footage</span>
            <p className="font-medium text-gray-900">{formatSquareFootage(property.square_footage)}</p>
          </div>
          <div>
            <span className="text-gray-500">Year Built</span>
            <p className="font-medium text-gray-900">{property.year_built}</p>
          </div>
          {property.property_type === 'residential' && (
            <>
              <div>
                <span className="text-gray-500">Bedrooms</span>
                <p className="font-medium text-gray-900">{property.bedrooms}</p>
              </div>
              <div>
                <span className="text-gray-500">Bathrooms</span>
                <p className="font-medium text-gray-900">{property.bathrooms}</p>
              </div>
            </>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Details
            <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export { PropertyCard };
export type { PropertyCardProps };
export default PropertyCard; 