'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Building2, ArrowRightLeft, Clock, Bell, User } from 'lucide-react';

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const ExchangeCard = ({ title, location, price, type }: {
    title: string;
    location: string;
    price: number;
    type: string;
  }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-2">{location}</p>
            <p className="text-gray-700 font-medium">${price.toLocaleString()}</p>
          </div>
          <Building2 className="text-gray-400" size={24} />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{type}</span>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ArrowRightLeft className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">PropSwap</span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-400 cursor-pointer" />
              <User className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="mb-8">
          <TabsList>
            <TabsTrigger value="available">Available Properties</TabsTrigger>
            <TabsTrigger value="active">Active Exchanges</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ExchangeCard
                title="Luxury Office Space"
                location="Financial District, NYC"
                price={2500000}
                type="Commercial"
              />
              <ExchangeCard
                title="Retail Complex"
                location="Downtown Miami, FL"
                price={1800000}
                type="Retail"
              />
              <ExchangeCard
                title="Industrial Warehouse"
                location="Houston, TX"
                price={3200000}
                type="Industrial"
              />
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Exchange #1031-A</h3>
                      <p className="text-sm text-gray-500">45-day identification period</p>
                    </div>
                    <Clock className="text-blue-600" size={24} />
                  </div>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Days Remaining:</span>
                      <span className="font-medium">32</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '29%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardScreen; 