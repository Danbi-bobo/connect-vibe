-- Add column to store detailed answers as JSON
ALTER TABLE public.quiz_results 
ADD COLUMN answers JSONB;

-- Add comment to describe the structure
COMMENT ON COLUMN public.quiz_results.answers IS 'JSON array containing question_id, question_text, answer_id, answer_text for each answer';