export type UserRole = "student" | "admin";
export type AdmissionStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  cnic: string | null;
  address: string;
  city: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  academy_name: string;
  tagline: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp: string | null;
  address: string | null;
  city: string | null;
  map_embed_url: string | null;
  admissions_open: boolean;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  duration_weeks: number | null;
  highlights: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Batch {
  id: string;
  name: string;
  course_id: string | null;
  start_date: string | null;
  max_seats: number;
  is_active: boolean;
  created_at: string;
  courses?: Course | null;
}

export interface BatchStat {
  id: string;
  name: string;
  start_date: string | null;
  max_seats: number;
  is_active: boolean;
  course_id: string | null;
  enrolled_count: number;
}

export interface Admission {
  id: string;
  user_id: string;
  batch_id: string | null;
  status: AdmissionStatus;
  admitted_at: string | null;
  class_start_date: string | null;
  notes: string | null;
  created_at: string;
  batches?: Batch | null;
  profiles?: Profile | null;
}
