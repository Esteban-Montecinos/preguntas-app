import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  'https://jttjrzbzzecrulatjnku.supabase.co',
  process.env.SUPABASE_KEY,
);
