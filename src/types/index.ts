export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  stops: number;
  price: number;
  seats: number;
}