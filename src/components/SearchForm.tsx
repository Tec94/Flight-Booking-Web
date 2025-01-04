import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Users, Search, SlidersHorizontal, Globe } from 'lucide-react';
import { airports } from '../data/airports';
import SearchFilters from './SearchFilters';
import AirportInput from './ui/AirportInput';
import DateInput from './ui/DateInput';
import TravelersInput from './ui/TravelersInput';

interface SearchFormProps {
  onSearch?: (searchParams: {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
  }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState('round');
  const [showFilters, setShowFilters] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    stops: [],
    airlines: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = { from, to, departureDate, returnDate, passengers };
    
    if (onSearch) {
      onSearch(searchParams);
    } else {
      navigate('/search', { state: searchParams });
    }
  };

  const handleSwapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-full ${
                tripType === 'round' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setTripType('round')}
            >
              Round trip
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                tripType === 'one' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setTripType('one')}
            >
              One way
            </button>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-7 gap-4 items-center">
            <div className="col-span-3">
              <AirportInput
                value={from}
                onChange={setFrom}
                placeholder="Where from?"
                suggestions={airports}
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapLocations}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeftRight className="h-5 w-5" />
              </button>
            </div>

            <div className="col-span-3">
              <AirportInput
                value={to}
                onChange={setTo}
                placeholder="Where to?"
                suggestions={airports}
              />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-3">
              <DateInput
                value={departureDate}
                onChange={setDepartureDate}
                label="Depart"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="flex justify-center">
              <TravelersInput
                value={passengers}
                onChange={setPassengers}
              />
            </div>

            <div className="col-span-3">
              <DateInput
                value={returnDate}
                onChange={setReturnDate}
                label="Return"
                min={departureDate}
                disabled={tripType === 'one'}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => setShowExplore(!showExplore)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Globe className="h-5 w-5" />
              Explore destinations
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <SearchFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
    </div>
  );
}