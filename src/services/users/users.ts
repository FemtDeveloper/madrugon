import { createClient } from "@/utils";

export const getUserInfo = async (userId: string) => {
const supabase = createClient();

const { data, error } = await supabase.from(
    "users"
    ).select("*").eq("id", userId).single(
);

if(error){
    throw new Error(error.message);
}

return data;
}
