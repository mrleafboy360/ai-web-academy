# Ai & Web Academy

Modern academy website with student registration, profiles, batch enrollment display, and a full admin panel. Built with **Next.js**, **Tailwind CSS**, and **Supabase** (auth + database).

## Features

- Public landing page with admissions status, courses, and batches
- Dark / light theme toggle
- Student sign up (name, email, phone, CNIC optional, address, city)
- Student login and profile (admission status, class start date, batch)
- Admin panel: users, admissions, batches, courses, site settings (contact, address, map, admissions open/close)

## Setup

### 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the full script: `supabase/schema.sql`.
3. Under **Authentication → Providers**, enable Email.
4. (Optional) Disable “Confirm email” for faster local testing.
5. Under **Authentication → URL Configuration**, add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/reset-password` (production: your domain)

### 2. Environment variables

Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create your first admin

After you sign up once with your email, run in SQL Editor:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
```

### 4. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin routes

| Path | Purpose |
|------|---------|
| `/admin` | Dashboard |
| `/admin/users` | All students |
| `/admin/admissions` | Admit students, assign batch |
| `/admin/batches` | Create batches |
| `/admin/courses` | Manage courses |
| `/admin/settings` | Contact, address, admissions toggle |

## Deploy

Deploy to [Vercel](https://vercel.com) and add the same env variables. Add your production URL under Supabase **Authentication → URL Configuration**.
