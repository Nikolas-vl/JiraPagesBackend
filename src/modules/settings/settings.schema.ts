import { z } from 'zod';

export const updateSettingsSchema = z
  .object({
    restaurantName: z.string().min(1).max(100).optional(),
    taxRate: z.number().min(0).max(1).optional(),
    deliveryFee: z.number().min(0).optional(),
    serviceFee: z.number().min(0).optional(),
    freeDeliveryThreshold: z.number().min(0).optional(),
  })
  .strict()
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
