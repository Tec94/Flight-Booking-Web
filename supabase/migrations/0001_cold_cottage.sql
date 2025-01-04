/*
  # Create bookings schema

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `flight_id` (text)
      - `total_price` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
    - `passengers`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `passport` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own bookings and passengers
*/

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  flight_id text NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE passengers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  passport text NOT NULL
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view passengers for their bookings"
  ON passengers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = passengers.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert passengers for their bookings"
  ON passengers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = passengers.booking_id
      AND bookings.user_id = auth.uid()
    )
  );