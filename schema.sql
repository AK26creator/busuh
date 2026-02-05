create table public.profiles (
  id uuid not null,
  email text not null,
  full_name text null,
  role public.user_role not null default 'student'::user_role,
  institution_id text null,
  status text null default 'active'::text,
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  date_of_birth date null,
  phone text null,
  staff_id text null,
  department text null,
  image_url text null,
  is_active boolean null default true,
  constraint profiles_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists idx_profiles_is_active on public.profiles using btree (is_active) TABLESPACE pg_default;

create index IF not exists idx_profiles_staff_id on public.profiles using btree (staff_id) TABLESPACE pg_default;

create index IF not exists idx_profiles_institution_id on public.profiles using btree (institution_id) TABLESPACE pg_default;

create trigger on_profile_created
after INSERT on profiles for EACH row
execute FUNCTION tr_log_new_profile ();

-- Add pickup location fields to profiles table (Run this separately in Supabase if profiles already exists)
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pickup_latitude DECIMAL(10, 8);
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pickup_longitude DECIMAL(11, 8);
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pickup_address TEXT;

-- Create bus routes table
create table IF NOT EXISTS public.bus_routes (
  id uuid not null default gen_random_uuid(),
  bus_number text not null,
  route_name text not null,
  institution_id text not null,
  start_lat decimal(10, 8) null,
  start_lng decimal(11, 8) null,
  end_lat decimal(10, 8) null,
  end_lng decimal(11, 8) null,
  created_at timestamp with time zone null default timezone('utc'::text, now()),
  constraint bus_routes_pkey primary key (id)
) TABLESPACE pg_default;

create index IF NOT exists idx_bus_routes_institution on public.bus_routes using btree (institution_id) TABLESPACE pg_default;

-- Create bus stops table
create table IF NOT EXISTS public.bus_stops (
  id uuid not null default gen_random_uuid(),
  route_id uuid null,
  stop_name text not null,
  latitude decimal(10, 8) not null,
  longitude decimal(11, 8) not null,
  stop_order integer not null,
  estimated_time time null,
  constraint bus_stops_pkey primary key (id),
  constraint bus_stops_route_id_fkey foreign key (route_id) references public.bus_routes(id) on delete cascade
) TABLESPACE pg_default;

create index IF NOT exists idx_bus_stops_route on public.bus_stops using btree (route_id) TABLESPACE pg_default;

-- Create bus locations table for real-time tracking
create table IF NOT EXISTS public.bus_locations (
  id uuid not null default gen_random_uuid(),
  bus_number text not null,
  institution_id text not null,
  latitude decimal(10, 8) not null,
  longitude decimal(11, 8) not null,
  heading decimal(5, 2) null,
  speed decimal(5, 2) null,
  updated_at timestamp with time zone null default timezone('utc'::text, now()),
  constraint bus_locations_pkey primary key (id)
) TABLESPACE pg_default;

create index IF NOT exists idx_bus_locations_bus on public.bus_locations using btree (bus_number, institution_id) TABLESPACE pg_default;
create index IF NOT exists idx_bus_locations_updated on public.bus_locations using btree (updated_at) TABLESPACE pg_default;

