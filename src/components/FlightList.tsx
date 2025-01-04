import React from 'react';
import FlightCard from './FlightCard';
import { FlightOffer } from '../lib/types/flights';

interface FlightListProps {
  flights: FlightOffer[];
  onSelect: (flight: FlightOffer) => void;
}

export default function FlightList({ flights, onSelect }: FlightListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} onSelect={onSelect} />
      ))}
    </div>
  );
}