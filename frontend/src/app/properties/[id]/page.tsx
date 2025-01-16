'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Building2, 
  MapPin, 
  Calendar,
  FileText,
  Users,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const PropertyDetailView = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-100 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {/* Property Image */}
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                <Building2 className="h-16 w-16 text-gray-400" />
              </div>
              
              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold mb-2">Luxury Office Space</h1>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      Financial District, NYC
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-blue-600">$2,500,000</div>
                    <div className="text-sm text-gray-500">$833/sq ft</div>
                  </div>
                </div>

                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Property Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Property Type</h3>
                        <p className="text-gray-600">Class A Office</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Year Built</h3>
                        <p className="text-gray-600">2018</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Square Footage</h3>
                        <p className="text-gray-600">3,000 sq ft</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Occupancy</h3>
                        <p className="text-gray-600">100%</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exchange Actions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Exchange Actions</h2>
                <div className="space-y-4">
                  <Button className="w-full">Initiate Exchange</Button>
                  <Button variant="outline" className="w-full">Contact Agent</Button>
                </div>
              </CardContent>
            </Card>

            {/* Key Dates */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Key Dates</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Identification Period Ends</p>
                      <p className="text-sm text-gray-500">March 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Exchange Period Ends</p>
                      <p className="text-sm text-gray-500">April 29, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Exchange Team</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Qualified Intermediary</p>
                      <p className="text-sm text-gray-500">Exchange Trust Co.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetailView; 