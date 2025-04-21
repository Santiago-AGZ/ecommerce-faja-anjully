import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase';
const supabasekey= import.meta.env.VITE_SUPABASE_KEY;
const supabaseurl= import.meta.env.VITE_SUPABASE_API_URL;



export const supabase = createClient<Database>(supabaseurl, supabasekey)

