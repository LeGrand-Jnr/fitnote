/**
 * FitNote - Supabase Configuration
 * 
 * To connect your Supabase project:
 * 1. Create a project at https://supabase.com
 * 2. Run the SQL script in `supabase_schema.sql` in your Supabase SQL Editor.
 * 3. Copy your Project URL and Anon/Public Key from Project Settings > API.
 * 4. Replace the placeholders below:
 */

export const supabaseConfig = {
  url: "https://YOUR_PROJECT_ID.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY"
};

export function isSupabaseConfigured() {
  return (
    supabaseConfig &&
    supabaseConfig.url &&
    supabaseConfig.url !== "https://YOUR_PROJECT_ID.supabase.co" &&
    supabaseConfig.anonKey &&
    supabaseConfig.anonKey !== "YOUR_SUPABASE_ANON_KEY"
  );
}
