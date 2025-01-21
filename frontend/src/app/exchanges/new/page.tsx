'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Property, PropertyCreate } from '@/services/property';
import { propertyService } from '@/services/property';
import { exchangeService } from '@/services/exchange';
import { ExchangeStatus } from '@/services/exchange';
import PropertyCard from '@/components/PropertyCard';
import { formatCurrency, formatPropertyType } from '@/utils/format';

export default function NewExchangePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedRelinquishedProperty, setSelectedRelinquishedProperty] = useState<Property | null>(null);
  const [selectedReplacementProperty, setSelectedReplacementProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    relinquished_property_id: '',
    replacement_property_ids: [] as number[],
    status: 'pending' as ExchangeStatus,
    exchange_period_days: 45,
    identification_period_days: 45
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getProperties();
        setProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to load properties. Please try again later.');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'relinquished_property_id') {
      const property = properties.find((p) => p.id === Number(value));
      setSelectedRelinquishedProperty(property || null);
    } else if (name === 'replacement_property_ids') {
      const property = properties.find((p) => p.id === Number(value));
      setSelectedReplacementProperty(property || null);
      setFormData(prev => ({
        ...prev,
        replacement_property_ids: [Number(value)]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await exchangeService.createExchange({
        title: formData.title || 'New Exchange',
        description: formData.description,
        relinquished_property_id: Number(formData.relinquished_property_id),
        replacement_property_ids: formData.replacement_property_ids,
        status: formData.status,
        exchange_period_days: formData.exchange_period_days,
        identification_period_days: formData.identification_period_days
      });
      router.push('/exchanges');
    } catch (err) {
      setError('Failed to create exchange. Please try again.');
      console.error('Error creating exchange:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/exchanges"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Exchanges
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Start New Exchange</h1>

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

        <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Exchange Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter a title for this exchange"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Add details about this exchange..."
              />
            </div>

            <div>
              <label htmlFor="relinquished_property_id" className="block text-sm font-medium text-gray-700">
                Select Property to Exchange (Relinquished Property)
              </label>
              <select
                id="relinquished_property_id"
                name="relinquished_property_id"
                value={formData.relinquished_property_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.address} - {formatPropertyType(property.property_type)} - {formatCurrency(property.price)}
                  </option>
                ))}
              </select>

              {selectedRelinquishedProperty && (
                <div className="mt-4">
                  <PropertyCard property={selectedRelinquishedProperty} />
                </div>
              )}
            </div>

            {selectedRelinquishedProperty && (
              <div>
                <label htmlFor="replacement_property_ids" className="block text-sm font-medium text-gray-700">
                  Select Replacement Property
                </label>
                <select
                  id="replacement_property_ids"
                  name="replacement_property_ids"
                  value={formData.replacement_property_ids[0] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select a property</option>
                  {properties
                    .filter((p) => p.id !== Number(formData.relinquished_property_id))
                    .map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.address} - {formatPropertyType(property.property_type)} - {formatCurrency(property.price)}
                      </option>
                    ))}
                </select>

                {selectedReplacementProperty && (
                  <div className="mt-4">
                    <PropertyCard 
                      property={selectedReplacementProperty}
                      priceDifference={selectedReplacementProperty.price - selectedRelinquishedProperty.price}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="exchange_period_days" className="block text-sm font-medium text-gray-700">
                  Exchange Period (Days)
                </label>
                <input
                  type="number"
                  id="exchange_period_days"
                  name="exchange_period_days"
                  value={formData.exchange_period_days}
                  onChange={handleChange}
                  min="1"
                  max="180"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="identification_period_days" className="block text-sm font-medium text-gray-700">
                  Identification Period (Days)
                </label>
                <input
                  type="number"
                  id="identification_period_days"
                  name="identification_period_days"
                  value={formData.identification_period_days}
                  onChange={handleChange}
                  min="1"
                  max="45"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Link
              href="/exchanges"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating...' : 'Create Exchange'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 