'use client';

import Link from 'next/link';
import { Property } from '@/services/property';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  showAddButton?: boolean;
}

export default function PropertyList({ properties, showAddButton = true }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
        {showAddButton && (
          <p className="text-gray-500 mb-6">
            Get started by adding your first property
          </p>
        )}
        {showAddButton && (
          <Link
            href="/properties/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Property
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <Link key={property.id} href={`/properties/${property.id}`} className="block h-full">
          <div className="h-full transform hover:scale-[1.02] transition-all duration-200">
            <PropertyCard property={property} />
          </div>
        </Link>
      ))}
      {showAddButton && (
        <Link href="/properties/new" className="block h-full">
          <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Add Property
              </span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
} 