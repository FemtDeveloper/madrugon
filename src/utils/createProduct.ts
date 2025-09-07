import { AVAILABLE_SIZES } from "@/mocks/options";

const isUuid = (s?: string) => {
  if (!s) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    s
  );
};

const normalize = (s?: string) => (s ?? "").toString().trim().toLowerCase();

export const getSizes = (gender: Gender, category?: Category | string) => {
  const cat = normalize(category as string);
  


  if (isUuid(cat)) return AVAILABLE_SIZES.childrenPants;

  const isJeans =
    cat === "jeans" || cat.includes("pant") || cat.includes("pants");
  const isCamisas =
    cat === "camisas" || cat === "camisetas" || cat === "shirts" ||
    cat === "camiseta" || cat === "camisetas";
  const isBlusas = cat === "blusas" || cat === "blusa";

  if (gender === "Hombre" && isJeans) return AVAILABLE_SIZES.menPants;

  if (
    (gender === "Hombre" || gender === "Mujer") &&
    (isCamisas || isBlusas)
  )
    return AVAILABLE_SIZES.womenShirts;

  if (gender === "Mujer") return AVAILABLE_SIZES.womanPants;

  return AVAILABLE_SIZES.childrenPants;
};
