'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Property, PropertyMatch, ExchangeChain } from '@/services/property';
import { propertyService } from '@/services/property';
import PropertyCard from '@/components/PropertyCard';
import { formatCurrency, formatDate, formatSquareFootage, formatPropertyType } from '@/utils/format';

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [matches, setMatches] = useState<PropertyMatch[]>([]);
  const [chains, setChains] = useState<ExchangeChain[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'matches' | 'chains'>('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const [propertyData, matchesData, chainsData] = await Promise.all([
          propertyService.getProperty(id),
          propertyService.getMatches(id, 0.5),
          propertyService.getExchangeChains(id, 0.5, 3)
        ]);
        
        setProperty(propertyData);
        setMatches(matchesData);
        setChains(chainsData);
        setError(null);
      } catch (err) {
        setError('Failed to load property details. Please try again later.');
        console.error('Error fetching property details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[400px] bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error || 'Property not found'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/properties"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Properties
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.address}</h1>
        <p className="text-lg text-gray-600">{property.location}</p>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'details'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'matches'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('chains')}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'chains'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Exchange Chains ({chains.length})
          </button>
        </div>
      </div>

      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatPropertyType(property.property_type)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatCurrency(property.price)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Square Footage</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatSquareFootage(property.square_footage)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Year Built</dt>
                <dd className="mt-1 text-sm text-gray-900">{property.year_built}</dd>
              </div>
              {property.property_type === 'residential' && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Bedrooms</dt>
                    <dd className="mt-1 text-sm text-gray-900">{property.bedrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Bathrooms</dt>
                    <dd className="mt-1 text-sm text-gray-900">{property.bathrooms}</dd>
                  </div>
                </>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Listed Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(property.created_at)}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{property.description || 'No description available.'}</p>
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div>
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-500">
                We couldn't find any properties that match your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <Link key={match.property.id} href={`/properties/${match.property.id}`}>
                  <div className="h-full transition-transform hover:scale-[1.02]">
                    <PropertyCard 
                      property={match.property} 
                      matchScore={match.score}
                      priceDifference={match.property.price - property.price}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'chains' && (
        <div>
          {chains.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exchange chains found</h3>
              <p className="text-gray-500">
                We couldn't find any viable exchange chains for this property.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {chains.map((chain, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Exchange Chain #{index + 1}
                      </h3>
                      <span className="text-sm text-gray-500">
                        Average Score: {(chain.average_score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {chain.properties.map((chainProperty, propIndex) => (
                        <Link key={chainProperty.property.id} href={`/properties/${chainProperty.property.id}`}>
                          <div className="h-full transition-transform hover:scale-[1.02]">
                            <PropertyCard 
                              property={chainProperty.property}
                              matchScore={chainProperty.score}
                              priceDifference={
                                propIndex === 0 
                                  ? chainProperty.property.price - property.price
                                  : chainProperty.property.price - chain.properties[propIndex - 1].property.price
                              }
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 