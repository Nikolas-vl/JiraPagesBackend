import { z } from 'zod';

export const cartItemSchema = z.object({
  dishId: z.number().int().positive(),
  quantity: z.number().int().min(1).default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
