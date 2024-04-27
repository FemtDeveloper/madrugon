import { createClient } from "@supabase/supabase-js";

import { Database } from "@/interfaces/supabase";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabaseRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY

export const supabase = createClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!,
  {}
);
// export const supabaseAdmin = createClient<Database>(supabaseUrl!, supabaseRoleKey!)
