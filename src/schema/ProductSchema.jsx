import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
  stock: z.number(),
});
