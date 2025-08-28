/* eslint-disable unused-imports/no-unused-vars */
interface User {
  age: number | null;
  avatar: string | null;
  brand: string | null;
  city: string | null;
  created_at: string;
  id: string;
  is_seller: boolean | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface userUpdateDTO {
  name: string;
  phone_number: string;
  brand: string;
  age: number | string;
  city: string;
  is_seller: boolean;
}
/* eslint-enable unused-imports/no-unused-vars */
