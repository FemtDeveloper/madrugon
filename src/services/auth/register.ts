import { createSupabaseClient } from "@/lib/supabase/client";

/**
 * Complete user registration process - both auth signup and user profile creation
 */
export const signUpNewUser = async ({
  email,
  password,
  name,
  lastName,
  phoneNumber,
}: {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phoneNumber: string;
}) => {
  const supabase = createSupabaseClient();
  
  // Step 1: Auth signup
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (signUpError || !data.user) {
    return { user: null, error: signUpError };
  }   
  const { error: dbError } = await supabase.from("users").insert({
    id: data.user.id,
    email,
    first_name: name,
    last_name: lastName,
    phone: phoneNumber,
    created_at: new Date().toISOString()
  });

  return { 
    user: data.user, 
    error: dbError || signUpError 
  };
};
