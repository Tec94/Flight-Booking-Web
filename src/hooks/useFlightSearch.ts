import { useQuery } from 'react-query';
import { searchFlights } from '../lib/api/flights';

export function useFlightSearch({
  from,
  to,
  departureDate,
  returnDate,
  passengers,
  enabled = false,
}: {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  enabled?: boolean;
}) {
  return useQuery(
    ['flights', from, to, departureDate, returnDate, passengers],
    () =>
      searchFlights({
        origin: from,
        destination: to,
        departureDate,
        returnDate,
        passengers,
      }),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
    }
  );
}