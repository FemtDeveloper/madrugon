"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function login(formData: SigninParams) {
  const supabase = createClient();
  console.log("login again");

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error, data: userData } = await supabase.auth.signInWithPassword(
    data
  );

  // console.log({ userData });
  if (error) {
    redirect("/error");
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userData.user.id);

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
