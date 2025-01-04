import React from 'react';
import { Plane, Clock } from 'lucide-react';
import type { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {flight.airline}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Plane className="h-4 w-4" />
            <span>Flight #{flight.flightNumber}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${flight.price}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">per person</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">From</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {flight.from}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatTime(flight.departureDate)}
          </div>
        </div>

        <div className="flex flex-col items-center px-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            <Clock className="inline-block h-4 w-4 mr-1" />
            {flight.duration}
          </div>
          <div className="relative w-24">
            <div className="border-t-2 border-gray-300 dark:border-gray-600"></div>
            <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 rotate-90" />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">To</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {flight.to}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatTime(flight.arrivalDate)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div>
          {flight.seats} seats available
        </div>
      </div>

      <button
        onClick={() => onSelect(flight)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        Select and Continue
      </button>
    </div>
  );
}