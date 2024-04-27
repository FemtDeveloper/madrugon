"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: SigninParams) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error, data: loginData } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    throw new Error("Usuario no existe");
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", loginData.user!.id);

  if (user) {
    cookies().set("user", JSON.stringify(user[0]));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  cookies().delete("user");
  redirect("/");
}
