interface User {
  age: number | null;
  avatar: string | null;
  brand: string | null;
  city: string | null;
  created_at: string;
  id: string;
  isSeller: boolean | null;
  name: string | null;
  email: string | null;
  phone_number: string | null;
}

interface userUpdateDTO {
  name: string;
  phone_number: string;
  brand: string;
  age: number;
  city: string;
}
