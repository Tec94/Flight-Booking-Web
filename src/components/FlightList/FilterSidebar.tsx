import React from 'react';
import { Clock, Plane, Building } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    maxPrice: number;
    stops: number[];
    airlines: string[];
  };
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price</h3>
          <div>
            <input
              type="range"
              min={0}
              max={2000}
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>$0</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Stops
          </h3>
          <div className="space-y-2">
            {[0, 1, 2].map((stop) => (
              <label key={stop} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop)}
                  onChange={(e) => {
                    const newStops = e.target.checked
                      ? [...filters.stops, stop]
                      : filters.stops.filter((s) => s !== stop);
                    onFilterChange({ ...filters, stops: newStops });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {stop === 0 ? 'Nonstop' : `${stop} stop${stop > 1 ? 's' : ''}`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Airlines
          </h3>
          <div className="space-y-2">
            {['Skyways Airlines', 'Global Airways'].map((airline) => (
              <label key={airline} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={(e) => {
                    const newAirlines = e.target.checked
                      ? [...filters.airlines, airline]
                      : filters.airlines.filter((a) => a !== airline);
                    onFilterChange({ ...filters, airlines: newAirlines });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {airline}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Building className="h-4 w-4" />
            Airports
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Same airports
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}