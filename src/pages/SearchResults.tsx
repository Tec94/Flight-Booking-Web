import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FlightCard from '../components/FlightList/FlightCard';
import FilterSidebar from '../components/FlightList/FilterSidebar';
import SortOptions from '../components/FlightList/SortOptions';
import { useFlightSearch } from '../hooks/useFlightSearch';
import type { Flight } from '../types';

export default function SearchResults() {
  const location = useLocation();
  const searchParams = location.state as {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
  };

  const [sortBy, setSortBy] = useState('best');
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    stops: [],
    airlines: []
  });

  const { data: flights, isLoading } = useFlightSearch({
    ...searchParams,
    enabled: true,
  });

  const handleSelectFlight = (flight: Flight) => {
    console.log('Selected flight:', flight);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {searchParams.from} → {searchParams.to}
              </h1>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(searchParams.departureDate).toLocaleDateString()} 
                {searchParams.returnDate && (
                  <>
                    <span className="mx-2">•</span>
                    {new Date(searchParams.returnDate).toLocaleDateString()}
                  </>
                )}
                <span className="mx-2">•</span>
                {searchParams.passengers} {searchParams.passengers === 1 ? 'passenger' : 'passengers'}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <ArrowRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {flights?.length || 0} flights found
              </div>
              <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : flights?.length ? (
              <div className="space-y-4">
                {flights.map((flight, index) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={handleSelectFlight}
                    isBest={index === 0 && sortBy === 'best'}
                    isCheapest={index === 0 && sortBy === 'price'}
                    isFastest={index === 0 && sortBy === 'duration'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No flights found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}