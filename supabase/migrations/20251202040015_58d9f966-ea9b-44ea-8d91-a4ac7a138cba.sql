-- Fix search_path for the update function using CREATE OR REPLACE
CREATE OR REPLACE FUNCTION public.update_chat_conversation_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;