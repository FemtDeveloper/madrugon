import { AVAILABLE_SIZES } from "@/mocks/options";

export const getSizes = (gender: Gender, category: Category) => {
  if (gender === "Hombre" && category === "Jeans")
    return AVAILABLE_SIZES.menPants;
  if (
    (gender === "Hombre" || gender === "Mujer") &&
    (category === "Camisas" ||
      category === "Camisetas" ||
      category === "Blusas")
  )
    return AVAILABLE_SIZES.womenShirts;
  if (gender === "Mujer") return AVAILABLE_SIZES.womanPants;
  return AVAILABLE_SIZES.childrenPants;
};
