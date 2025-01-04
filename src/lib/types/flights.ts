export interface FlightOffer {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  itineraries: Array<{
    duration: string;
    segments: Array<{
      departure: {
        airport: string;
        time: string;
      };
      arrival: {
        airport: string;
        time: string;
      };
      carrier: {
        code: string;
        name: string;
      };
      flightNumber: string;
    }>;
  }>;
  numberOfBookableSeats: number;
  lastTicketingDate: string;
  validatingAirlineCodes: string[];
}