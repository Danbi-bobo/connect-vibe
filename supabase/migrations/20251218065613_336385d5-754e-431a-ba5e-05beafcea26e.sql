-- Drop the insecure SELECT policy
DROP POLICY IF EXISTS "Only authenticated users can read quiz results" ON public.quiz_results;

-- Create a more secure policy - only service role can read (for admin dashboard via edge function)
-- Regular authenticated users cannot read quiz results
CREATE POLICY "Only service role can read quiz results"
  ON public.quiz_results
  FOR SELECT
  TO service_role
  USING (true);