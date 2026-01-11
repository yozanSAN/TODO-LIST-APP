import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkbXJ5aHZqdXN3ZW96enhqb3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDA1ODcsImV4cCI6MjA3ODYxNjU4N30.LpUuJmXr4xQM1BqUrH4sDCpIaSvqVijLQkGma8SH174");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
