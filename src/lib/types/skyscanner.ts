export interface SkyscannerFlight {
  id: string;
  price: {
    amount: number;
    currency: string;
    lastUpdated: string;
  };
  route: {
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
  };
  carrier: {
    id: string;
    name: string;
    logo: string;
  };
  priceHistory: {
    date: string;
    price: number;
  }[];
}

export interface PriceAlert {
  id: string;
  route: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
  };
  targetPrice: number;
  currentPrice: number;
  created: string;
  status: 'active' | 'triggered' | 'expired';
}