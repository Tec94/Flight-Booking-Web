import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortOptionsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-gray-500" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-transparent text-sm text-gray-700 dark:text-gray-300 border-none focus:ring-0"
      >
        <option value="best">Best</option>
        <option value="price">Price</option>
        <option value="duration">Duration</option>
        <option value="departure">Departure</option>
        <option value="arrival">Arrival</option>
      </select>
    </div>
  );
}