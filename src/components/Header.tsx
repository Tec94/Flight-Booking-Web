import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="h-8 w-8" />
            <h1 className="text-2xl font-bold">SkyBooker</h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/bookings" className="hover:text-blue-200">My Bookings</Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  <User className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/signin"
                  className="hover:text-blue-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}