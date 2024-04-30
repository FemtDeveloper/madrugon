"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { useUserStore } from "@/stores";
import { createClient } from "@/utils/supabase/server";

const setUser = useUserStore.getState().setUser;

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

export const updateUser = async (userData: userUpdateDTO, userId: string) => {
  const supabase = createClient();

  const { data: userDataUpdate, error } = await supabase
    .from("users")
    .update({
      name: `${userData.name.trim()}`,
      phone_number: userData.phone_number,
      brand: userData.brand ?? "",
      age: Number(userData.age),
      city: userData.city ?? "",
    })
    .eq("id", userId)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }
  if (userDataUpdate) {
    setUser(userDataUpdate as unknown as User);
    cookies().set("user", JSON.stringify(userDataUpdate[0]));
  }
};
