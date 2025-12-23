-- Create policy to allow anonymous users to read quiz results
CREATE POLICY "Anon can read quiz results"
ON public.quiz_results
FOR SELECT
TO anon
USING (true);