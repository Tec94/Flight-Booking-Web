import React, { useState, useRef, useEffect } from 'react';
import { Users } from 'lucide-react';

interface TravelersInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TravelersInput({ value, onChange }: TravelersInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Users className="h-5 w-5 text-gray-400" />
        <span>{value} {value === 1 ? 'traveler' : 'travelers'}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <span>Travelers</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange(Math.max(1, value - 1))}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                -
              </button>
              <span>{value}</span>
              <button
                type="button"
                onClick={() => onChange(Math.min(9, value + 1))}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}