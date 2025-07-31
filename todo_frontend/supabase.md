# Supabase Integration for React Todo App

This application is fully integrated with Supabase for backend storage, CRUD, and realtime updates of todo items.

## Supabase Table Status

- Table `todos` is present and created by automation.
- Schema:
  | Column      | Type      | Nullable | Default    |
  |-------------|-----------|----------|------------|
  | id          | bigint    | NO       |            |
  | title       | text      | NO       |            |
  | detail      | text      | NO       |            |
  | completed   | boolean   | NO       | false      |
  | created_at  | timestamp | NO       | now()      |

- Row Level Security (RLS) is ENABLED.
- Policy: All actions (SELECT, INSERT, UPDATE, DELETE) are ALLOWED for all users (demo/open prototyping policy).

## Setup

1. **Supabase Table Setup**
   - The table `todos` is already created for you (see above schema).
   - No auth is required for CRUD; this is intended for open public demo/development. For production, tighten policies via the Supabase Dashboard.

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

5. **Security Notice** (important for future production use)
   - This open RLS demo policy allows anyone with the API key to fully modify the todos!  
     Restrict policies as needed for user-based/task-based protection.
   - See Supabase docs on Row Level Security for detailed guidance.

## Additional Notes

- This app only uses Supabase and environment variables for backend connectivity.
- If you change the table schema, update `supabaseClient.js` and usages accordingly.

- You can use the Supabase Dashboard to review/edit the table, data, and RLS policies.
