import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(6, "El nombre debe contener al menos 5 carácteres"),
  description: z
    .string()
    .min(6, "La descripción debe contener al menos 5 carácteres"),
  brand: z.string().min(6, "La marca debe contener al menos 1 carácter"),
  category: z.string(),
  sizes: z.string().array().nonempty(),
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  regular_price: z.coerce.number().min(0, "El precio no puede ser negativo"),
});
