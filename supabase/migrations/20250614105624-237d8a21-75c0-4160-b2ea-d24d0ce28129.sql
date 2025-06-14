
-- Update the waitlist table to match the new form structure
ALTER TABLE public.waitlist 
DROP COLUMN IF EXISTS company_size,
DROP COLUMN IF EXISTS first_task,
DROP COLUMN IF EXISTS current_tools,
DROP COLUMN IF EXISTS pain_points,
DROP COLUMN IF EXISTS how_did_you_hear,
DROP COLUMN IF EXISTS urgency;

-- Add the new fields we need
ALTER TABLE public.waitlist 
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'individual',
ADD COLUMN IF NOT EXISTS job_role TEXT,
ADD COLUMN IF NOT EXISTS use_case TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS budget_rupees TEXT;

-- Update the table to not require user_id since we're removing authentication
ALTER TABLE public.waitlist 
ALTER COLUMN user_id DROP NOT NULL;

-- Disable RLS since we're not using authentication
ALTER TABLE public.waitlist DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own waitlist entry" ON public.waitlist;
DROP POLICY IF EXISTS "Users can create own waitlist entry" ON public.waitlist;
DROP POLICY IF EXISTS "Users can update own waitlist entry" ON public.waitlist;

-- Create a simple policy that allows anyone to insert data
CREATE POLICY "Anyone can create waitlist entries" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- Re-enable RLS with the new policy
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
