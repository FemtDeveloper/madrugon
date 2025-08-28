"use server";

import { useUserStore } from "@/stores";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setUser = useUserStore.getState().setUser;

export async function login(formData: SigninParams) {
  const supabase = await createClient();

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
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(user[0]));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  const cookieStore = await cookies();
  cookieStore.delete("user");
  redirect("/");
}

export const updateUser = async (userData: userUpdateDTO, userId: string) => {
  const supabase = await createClient();

  const payload: Record<string, unknown> = {
    first_name: userData.first_name?.trim() ?? null,
    last_name: userData.last_name?.trim() ?? null,
    phone: userData.phone ?? null,
    date_of_birth: userData.date_of_birth ?? null,
    gender: userData.gender ?? null,
    is_seller: typeof userData.is_seller === "boolean" ? userData.is_seller : null,
  };

  const { data: updatedUserRows, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", userId)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  if (updatedUserRows && updatedUserRows.length > 0) {
    setUser(updatedUserRows[0] as unknown as User);
    const cookieStore2 = await cookies();
    cookieStore2.set("user", JSON.stringify(updatedUserRows[0]));
  }
};
