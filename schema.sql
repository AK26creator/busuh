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
