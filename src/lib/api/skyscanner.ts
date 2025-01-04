import { SkyscannerFlight, PriceAlert } from '../types/skyscanner';

const SKYSCANNER_API_KEY = import.meta.env.VITE_SKYSCANNER_API_KEY;
const API_BASE_URL = 'https://partners.api.skyscanner.net/apiservices/v3';

const headers = {
  'x-api-key': SKYSCANNER_API_KEY,
  'Content-Type': 'application/json',
};

export async function searchLiveFlights(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
}): Promise<SkyscannerFlight[]> {
  const response = await fetch(`${API_BASE_URL}/flights/live/search/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: {
        market: 'US',
        locale: 'en-US',
        currency: 'USD',
        queryLegs: [
          {
            originPlaceId: { iata: params.origin },
            destinationPlaceId: { iata: params.destination },
            date: { year: parseInt(params.departureDate.split('-')[0]), 
                   month: parseInt(params.departureDate.split('-')[1]), 
                   day: parseInt(params.departureDate.split('-')[2]) }
          },
          ...(params.returnDate ? [{
            originPlaceId: { iata: params.destination },
            destinationPlaceId: { iata: params.origin },
            date: { year: parseInt(params.returnDate.split('-')[0]), 
                   month: parseInt(params.returnDate.split('-')[1]), 
                   day: parseInt(params.returnDate.split('-')[2]) }
          }] : [])
        ],
        adults: params.adults,
        cabinClass: 'CABIN_CLASS_ECONOMY'
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch flights');
  }

  const data = await response.json();
  return transformFlightData(data);
}

export async function createPriceAlert(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  targetPrice: number;
}): Promise<PriceAlert> {
  const response = await fetch(`${API_BASE_URL}/flights/live/price-alerts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      route: {
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
        returnDate: params.returnDate
      },
      targetPrice: params.targetPrice,
      email: true
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create price alert');
  }

  return response.json();
}

function transformFlightData(data: any): SkyscannerFlight[] {
  return data.content.results.map((result: any) => ({
    id: result.id,
    price: {
      amount: result.price.amount,
      currency: result.price.currency,
      lastUpdated: result.price.lastUpdated
    },
    route: {
      origin: result.legs[0].origin.name,
      destination: result.legs[0].destination.name,
      departureTime: result.legs[0].departure,
      arrivalTime: result.legs[0].arrival,
      duration: result.legs[0].duration,
      stops: result.legs[0].stopCount
    },
    carrier: {
      id: result.legs[0].carriers[0].id,
      name: result.legs[0].carriers[0].name,
      logo: result.legs[0].carriers[0].imageUrl
    },
    priceHistory: result.priceHistory || []
  }));
}