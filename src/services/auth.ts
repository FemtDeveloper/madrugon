import { supabase } from "@/lib/supabase/client";
import { Session, User } from "@supabase/supabase-js";

type SignupResponse = {
  user: User | null;
  session: Session | null;
};

export const signUpNewUser = async ({
  email,
  //   captchaToken,
  password,
}: SigninParams): Promise<SignupResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options: { captchaToken },
  });
  console.log({ data, error: error?.message });

  return data;
};

export const login = async ({
  email,
  password,
}: SigninParams): Promise<SignupResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return data;
};