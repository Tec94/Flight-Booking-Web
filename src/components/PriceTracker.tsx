import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useCreatePriceAlert } from '../hooks/useFlightTracking';

interface PriceTrackerProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  currentPrice: number;
}

export default function PriceTracker({
  origin,
  destination,
  departureDate,
  returnDate,
  currentPrice
}: PriceTrackerProps) {
  const [targetPrice, setTargetPrice] = useState(currentPrice);
  const createAlert = useCreatePriceAlert();

  const handleCreateAlert = async () => {
    try {
      await createAlert.mutateAsync({
        origin,
        destination,
        departureDate,
        returnDate,
        targetPrice
      });
    } catch (error) {
      console.error('Failed to create price alert:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Bell className="h-5 w-5" />
        Track Price
      </h3>
      
      <div className="space-y-2">
        <label className="block text-sm text-gray-300">
          Alert me when price drops below
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            className="flex-1 bg-gray-700 text-white rounded px-3 py-2"
            min={0}
          />
          <button
            onClick={handleCreateAlert}
            disabled={createAlert.isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {createAlert.isLoading ? 'Creating...' : 'Create Alert'}
          </button>
        </div>
      </div>
    </div>
  );
}