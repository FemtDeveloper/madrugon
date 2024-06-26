import { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

type SignupResponse = {
  user: User | null;
  session: Session | null;
};

export const signUpNewUser = async ({
  email,
  password,
}: SigninParams): Promise<SignupResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log({ data, error: error?.message });

  return data;
};
