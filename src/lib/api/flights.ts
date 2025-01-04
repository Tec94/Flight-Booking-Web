import { FlightOffer } from '../types/flights';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_BASE_URL = 'https://www.googleapis.com/travel/v1';

export async function searchFlights({
  origin,
  destination,
  departureDate,
  returnDate,
  passengers,
}: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}): Promise<FlightOffer[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/flights/search?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slice: [
            {
              origin,
              destination,
              date: departureDate,
            },
            ...(returnDate
              ? [
                  {
                    origin: destination,
                    destination: origin,
                    date: returnDate,
                  },
                ]
              : []),
          ],
          passengers: {
            adultCount: passengers,
          },
          solutions: 20,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }

    const data = await response.json();
    return transformFlightData(data);
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
}

function transformFlightData(data: any): FlightOffer[] {
  return data.trips[0].tripOption.map((option: any) => ({
    id: option.id,
    price: {
      amount: parseFloat(option.saleTotal.substring(3)),
      currency: option.saleTotal.substring(0, 3),
    },
    itineraries: option.slice.map((slice: any) => ({
      duration: slice.duration,
      segments: slice.segment.map((segment: any) => ({
        departure: {
          airport: segment.leg[0].origin,
          time: segment.leg[0].departureTime,
        },
        arrival: {
          airport: segment.leg[0].destination,
          time: segment.leg[0].arrivalTime,
        },
        carrier: {
          code: segment.flight.carrier,
          name: getAirlineName(segment.flight.carrier),
        },
        flightNumber: segment.flight.number,
      })),
    })),
    numberOfBookableSeats: option.pricing[0].seats?.[0]?.count || 0,
    lastTicketingDate: option.pricing[0].latestTicketingTime,
    validatingAirlineCodes: [option.pricing[0].validatingCarrier],
  }));
}

// This would ideally come from an API or database
function getAirlineName(code: string): string {
  const airlines: Record<string, string> = {
    AA: 'American Airlines',
    UA: 'United Airlines',
    DL: 'Delta Air Lines',
    // Add more airlines as needed
  };
  return airlines[code] || code;
}