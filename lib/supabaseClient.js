import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://foqhnqktdtdonprqvzbf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcWhucWt0ZHRkb25wcnF2emJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNzQxNzgsImV4cCI6MTk5NDY1MDE3OH0.5dRSDPYfEa9QjORYi3FeHDRKcs3FC6NssB1Vp33PhZQ"
);
