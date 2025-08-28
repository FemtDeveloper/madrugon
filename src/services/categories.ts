import { createClient } from "@/utils";

export const getAllCategories = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select("id, name, slug");
  if (error) throw new Error(error.message);
  return data;
};
