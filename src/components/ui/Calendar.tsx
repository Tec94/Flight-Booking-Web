import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
}

export default function Calendar({ label, value, onChange, minDate }: CalendarProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>
      <div className="relative">
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate || today}
          className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
}