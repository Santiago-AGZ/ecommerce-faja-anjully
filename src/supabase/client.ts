import { Database } from "./supabase";
import { createClient } from '@supabase/supabase-js'
const supabasekey= import.meta.env.VITE_PROJECT_SUPABASE_API_KEY;
const supabaseurl= import.meta.env.VITE_PROJECT_URL_SUPABASE;



export const supabase = createClient<Database>(supabaseurl, supabasekey)

