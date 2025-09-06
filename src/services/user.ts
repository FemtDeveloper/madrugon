import { useUserStore } from "@/stores";
import { createClient } from "@/utils/supabase/client";

export const updateUserClient = async (userData: userUpdateDTO, userId: string) => {
  const supabase = createClient();

  // Only include known columns present in the schema and only when provided
  const payload: Record<string, unknown> = {};
  if (typeof userData.first_name === "string") payload.first_name = userData.first_name.trim();
  if (typeof userData.last_name === "string") payload.last_name = userData.last_name.trim();
  if (typeof userData.phone !== "undefined") payload.phone = userData.phone ?? null;
  if (typeof userData.date_of_birth !== "undefined") payload.date_of_birth = userData.date_of_birth ?? null;
  if (typeof userData.gender !== "undefined") payload.gender = userData.gender ?? null;
  if (typeof userData.profile_image_url !== "undefined") payload.profile_image_url = userData.profile_image_url ?? null;
  if (typeof userData.is_seller !== "undefined") payload.is_seller = !!userData.is_seller;

  const { data: updatedUserRows, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", userId)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  if (updatedUserRows && updatedUserRows.length > 0) {
    // Update local store to reflect new user data
    useUserStore.getState().setUser(updatedUserRows[0] as unknown as User);
    return updatedUserRows[0];
  }

  return null;
};

export const logoutClient = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  // Clear local user store
  useUserStore.getState().setUser(null);
  useUserStore.getState().setIsAuthenticated(false);
  return true;
};
