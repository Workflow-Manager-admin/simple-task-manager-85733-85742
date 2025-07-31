# Supabase Integration for React Todo App

This application integrates with Supabase for backend storage and realtime updates of todo items.

## Setup

1. **Make sure your Supabase project has a table: `todos`**  
   Example columns:
   - `id` (bigint, primary key, auto increment)
   - `title` (text)
   - `detail` (text)
   - `completed` (boolean)
   - `created_at` (timestamp, default now())

2. **Environment Variables Required:**  
   - `REACT_APP_SUPABASE_URL` (Supabase project URL)
   - `REACT_APP_SUPABASE_KEY` (Supabase anon/public API key)

   These must be set in a `.env` file at the project root for development (see `.env.example`).  
   On deployment, configure these as environment variables in the host system.

3. **How it works:**
   - The frontend imports and initializes Supabase using:
     ```js
     import { supabase } from './src/supabaseClient';
     ```
   - All `CRUD` operations for todos are performed against the `todos` table via Supabase.

4. **Realtime:**
   - The app subscribes to Supabase's realtime channel for `todos` and auto-refreshes list UI on changes.

## Additional Notes

- This app only uses Supabase and environment variables for backend connectivity.
- If you change the table schema, update `supabaseClient.js` and usages accordingly.

