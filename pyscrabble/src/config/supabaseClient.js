import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    "https://mxydcpisbporjtgpxcfe.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14eWRjcGlzYnBvcmp0Z3B4Y2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4ODI0MTQsImV4cCI6MjAzNzQ1ODQxNH0.SZumTd4UOt3aLQvT5phYQ6lyOlAHKRgaGhqysvhXjpo",
);

export default supabase;