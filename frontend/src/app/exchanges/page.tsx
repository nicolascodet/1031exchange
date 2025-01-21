'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Exchange } from '@/services/exchange';
import { exchangeService } from '@/services/exchange';
import { formatCurrency, formatDate } from '@/utils/format';
import PropertyCard from '@/components/PropertyCard';

export default function ExchangesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const data = await exchangeService.getExchanges();
        setExchanges(data);
        setError(null);
      } catch (err) {
        setError('Failed to load exchanges. Please try again later.');
        console.error('Error fetching exchanges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exchanges</h1>
          <p className="text-gray-600 mt-1">Manage your 1031 property exchanges</p>
        </div>
        <Link
          href="/exchanges/new"
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
          New Exchange
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {exchanges.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No exchanges found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first exchange</p>
          <div className="mt-6">
            <Link
              href="/exchanges/new"
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
              Start Exchange
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{exchange.title || 'Untitled Exchange'}</h2>
                  <p className="text-sm text-gray-500 mt-1">Created {formatDate(exchange.created_at)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${exchange.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      exchange.status === 'active' ? 'bg-green-100 text-green-800' :
                      exchange.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {exchange.status}
                  </span>
                  <Link
                    href={`/exchanges/${exchange.id}`}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exchange.relinquished_property && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Relinquished Property</h3>
                    <PropertyCard property={exchange.relinquished_property} />
                  </div>
                )}
                {exchange.replacement_property && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Replacement Property</h3>
                    <PropertyCard 
                      property={exchange.replacement_property}
                      priceDifference={
                        exchange.replacement_property.price - (exchange.relinquished_property?.price || 0)
                      }
                    />
                  </div>
                )}
              </div>

              {exchange.description && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>{exchange.description}</p>
                </div>
              )}

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <span>Exchange Period: {exchange.exchange_period_days} days</span>
                    <span className="mx-2">•</span>
                    <span>Identification Period: {exchange.identification_period_days} days</span>
                  </div>
                  <div>
                    ID: #{exchange.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 