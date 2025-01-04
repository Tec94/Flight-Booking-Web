import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Bookings() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h2>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">No bookings found.</p>
      </div>
    </div>
  );
}