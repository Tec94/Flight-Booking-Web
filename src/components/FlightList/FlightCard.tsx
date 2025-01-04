import React from 'react';
import { Heart, Plane, Info } from 'lucide-react';
import type { Flight } from '../../types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
  isBest?: boolean;
  isCheapest?: boolean;
  isFastest?: boolean;
}

export default function FlightCard({ 
  flight, 
  onSelect,
  isBest,
  isCheapest,
  isFastest 
}: FlightCardProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getBadgeText = () => {
    if (isBest) return 'Best';
    if (isCheapest) return 'Cheapest';
    if (isFastest) return 'Fastest';
    return null;
  };

  const badgeText = getBadgeText();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      {badgeText && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            {badgeText}
          </span>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={`/airlines/${flight.airline.toLowerCase().replace(' ', '-')}.png`} 
              alt={flight.airline}
              className="h-8 w-8 object-contain"
              onError={(e) => {
                e.currentTarget.src = '/airlines/default.png';
              }}
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {flight.airline}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Flight {flight.flightNumber}
              </div>
            </div>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            aria-label="Save flight"
          >
            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatTime(flight.departureDate)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{flight.from}</div>
          </div>

          <div className="flex-1 px-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {flight.duration}
                  </span>
                  <Plane className="h-4 w-4 text-blue-500 rotate-90" />
                </div>
              </div>
            </div>
            <div className="text-center mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatTime(flight.arrivalDate)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{flight.to}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${flight.price}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              per person
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Info className="h-4 w-4" />
              {flight.seats} seats left
            </div>
            <button
              onClick={() => onSelect(flight)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}