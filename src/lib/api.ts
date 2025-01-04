const API_URL = 'http://localhost:5000/api';

export async function searchFlights(params: {
  from: string;
  to: string;
  departureDate: string;
  passengers: number;
}): Promise<Flight[]> {
  // Mock data until Skyscanner API is integrated
  return [
    {
      id: '1',
      airline: 'Skyways Airlines',
      flightNumber: 'SK123',
      from: params.from,
      to: params.to,
      departureDate: '2024-03-20T10:00:00',
      arrivalDate: '2024-03-20T22:30:00',
      duration: '2h 30m',
      stops: 0,
      price: 599,
      seats: 42
    },
    {
      id: '2',
      airline: 'Global Airways',
      flightNumber: 'GA456',
      from: params.from,
      to: params.to,
      departureDate: '2024-03-20T14:00:00',
      arrivalDate: '2024-03-21T02:30:00',
      duration: '3h 15m',
      stops: 1,
      price: 489,
      seats: 28
    }
  ];
}