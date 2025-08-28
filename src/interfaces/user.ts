/* eslint-disable unused-imports/no-unused-vars */
interface User {
  id: string;
  role_id?: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  date_of_birth: string | null; // ISO date
  gender: string | null;
  profile_image_url: string | null;
  is_active?: boolean;
  is_verified?: boolean;
  verification_date?: string | null;
  last_login?: string | null;
  created_at: string;
  updated_at: string;
  is_seller: boolean | null;
  // Backwards compatibility fields used across the app
  name?: string | null;
  avatar?: string | null;
  brand?: string | null;
  age?: number | null;
  city?: string | null;
  phone_number?: string | null;
}

interface userUpdateDTO {
  first_name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: string; // ISO date
  gender?: string;
  is_seller?: boolean;
}
/* eslint-enable unused-imports/no-unused-vars */
