/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
interface User {
  // Backwards compatibility fields used across the app
  age?: number | null;
  avatar?: string | null;
  brand?: string | null;
  city?: string | null;
  created_at: string;
  date_of_birth: string | null; // ISO date
  email: string | null;
  first_name: string | null;
  gender: string | null;
  id: string;
  is_active?: boolean;
  is_seller: boolean | null;
  is_verified?: boolean;
  last_login?: string | null;
  last_name: string | null;
  phone_number?: string | null;
  phone: string | null;
  profile_image_url: string | null;
  role_id?: string | null;
  updated_at: string;
  verification_date?: string | null;
}

interface userUpdateDTO {
  first_name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: string; // ISO date
  gender?: string;
  profile_image_url?: string;
  is_seller?: boolean;
}
/* eslint-enable unused-imports/no-unused-vars */
