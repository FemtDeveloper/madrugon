import { createClient } from "@/utils/supabase/client";

export const uploadImages = async (files: File[]) => {
  const supabase = createClient();
  const uploadedUrls: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${file.name
      .split(".")
      .shift()}-${Math.random()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file, {
        cacheControl: "3600",
      });

    if (error) {
      console.error(error.message);

      throw new Error("Error uploading image: " + error.message);
    }
    const { data } = supabase.storage.from("products").getPublicUrl(fileName);

    uploadedUrls.push(data.publicUrl);
  });

  await Promise.all(uploadPromises);

  return uploadedUrls;
};

export const uploadImage = async (file: File, userId: string) => {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${file.name
    .split(".")
    .shift()}-${Math.random()}.${fileExt}`;
  await supabase.storage.from("avatars").upload(fileName, file, {
    cacheControl: "3600",
  });

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  await supabase
    .from("users")
    .update({ avatar: data.publicUrl })
    .eq("id", userId);

  return data.publicUrl;
};

export const deleteImages = async (
  images: string[],
  bucket: "avatars" | "products"
) => {
  const supabase = createClient();

  const imagesPath = images.map((image) => `${image.split("/").slice(-1)}`);

  const { data, error } = await supabase.storage
    .from(bucket)
    .remove(imagesPath);

  if (error) throw new Error(error.message);
  return data;
};
