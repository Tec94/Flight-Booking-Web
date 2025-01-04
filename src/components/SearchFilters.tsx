import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface Filters {
  maxPrice: number;
  stops: number[];
  airlines: string[];
}

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters?: Filters;
  onFilterChange?: (filters: Filters) => void;
}

const defaultFilters: Filters = {
  maxPrice: 2000,
  stops: [],
  airlines: []
};

export default function SearchFilters({ 
  isOpen, 
  onClose, 
  filters = defaultFilters,
  onFilterChange = () => {}
}: SearchFiltersProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Maximum Price</label>
          <input
            type="range"
            min={0}
            max={2000}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full"
          />
          <div className="text-right text-gray-600 dark:text-gray-400">${filters.maxPrice}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Stops</label>
          <div className="space-y-2">
            {[0, 1, 2].map((stop) => (
              <label key={stop} className="flex items-center text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop)}
                  onChange={(e) => {
                    const newStops = e.target.checked
                      ? [...filters.stops, stop]
                      : filters.stops.filter((s) => s !== stop);
                    onFilterChange({ ...filters, stops: newStops });
                  }}
                  className="mr-2"
                />
                {stop === 0 ? 'Nonstop' : `${stop} stop${stop > 1 ? 's' : ''}`}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Airlines</label>
          <div className="space-y-2">
            {['Skyways Airlines', 'Global Airways'].map((airline) => (
              <label key={airline} className="flex items-center text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={(e) => {
                    const newAirlines = e.target.checked
                      ? [...filters.airlines, airline]
                      : filters.airlines.filter((a) => a !== airline);
                    onFilterChange({ ...filters, airlines: newAirlines });
                  }}
                  className="mr-2"
                />
                {airline}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}