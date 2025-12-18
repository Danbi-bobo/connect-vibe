-- Create table for storing quiz results and emails
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  archetype TEXT NOT NULL,
  sub_need TEXT NOT NULL,
  preference TEXT,
  zodiac TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quiz results (public quiz)
CREATE POLICY "Anyone can insert quiz results"
  ON public.quiz_results
  FOR INSERT
  WITH CHECK (true);

-- Only allow authenticated users (admin) to read results
CREATE POLICY "Only authenticated users can read quiz results"
  ON public.quiz_results
  FOR SELECT
  TO authenticated
  USING (true);

-- Add index on email for faster lookups
CREATE INDEX idx_quiz_results_email ON public.quiz_results(email);

-- Add index on created_at for sorting
CREATE INDEX idx_quiz_results_created_at ON public.quiz_results(created_at DESC);