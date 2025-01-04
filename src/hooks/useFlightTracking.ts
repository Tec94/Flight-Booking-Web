import { useMutation, useQuery } from 'react-query';
import { createPriceAlert } from '../lib/api/skyscanner';

export function useCreatePriceAlert() {
  return useMutation(createPriceAlert);
}

export function usePriceHistory(flightId: string) {
  return useQuery(['priceHistory', flightId], 
    () => fetch(`/api/prices/${flightId}/history`).then(res => res.json()),
    { enabled: !!flightId }
  );
}