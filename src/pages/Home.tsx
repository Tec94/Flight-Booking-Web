import React from 'react';
import { useQuery } from 'react-query';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import { searchFlights } from '../lib/api';
import type { Flight } from '../types';

export default function Home() {
  const [searchParams, setSearchParams] = React.useState<null | {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
  }>(null);

  const { data: flights, isLoading } = useQuery(
    ['flights', searchParams],
    () => searchParams && searchFlights(searchParams),
    { enabled: !!searchParams }
  );

  const handleSearch = (params: {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
  }) => {
    setSearchParams(params);
  };

  const handleSelectFlight = (flight: Flight) => {
    console.log('Selected flight:', flight);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative pt-16 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e"
            alt="Mountains"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white text-center mb-12">Flights</h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-400">Searching for flights...</p>
          </div>
        ) : flights?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={handleSelectFlight}
              />
            ))}
          </div>
        ) : searchParams ? (
          <p className="text-center text-gray-400 py-12">No flights found for your search criteria.</p>
        ) : null}
      </div>
    </main>
  );
}