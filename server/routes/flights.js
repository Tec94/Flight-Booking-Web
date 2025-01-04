import express from 'express';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

// Get available flights
router.get('/search', async (req, res) => {
  const { from, to, date } = req.query;
  
  try {
    // In a real app, this would query flight data from Supabase
    // For now, returning mock data
    const flights = [
      {
        id: '1',
        from: 'New York (JFK)',
        to: 'London (LHR)',
        departureDate: '2024-03-20T10:00:00',
        arrivalDate: '2024-03-20T22:30:00',
        price: 599,
        airline: 'Skyways Airlines',
        seats: 42,
      },
      // ... other flights
    ];
    
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as flightRoutes };