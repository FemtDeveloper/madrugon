import { useUserStore } from "@/stores";
import { createClient } from "@/utils/supabase/client";

export const updateUserClient = async (userData: userUpdateDTO, userId: string) => {
  const supabase = createClient();

  const payload: Record<string, unknown> = {
    first_name: userData.first_name?.trim() ?? null,
    last_name: userData.last_name?.trim() ?? null,
    phone: userData.phone ?? null,
    date_of_birth: userData.date_of_birth ?? null,
    gender: userData.gender ?? null,
    profile_image_url: userData.profile_image_url ?? null,
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
