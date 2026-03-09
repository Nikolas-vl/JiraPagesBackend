import { z } from 'zod';

export const createLocationSchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1).max(255),
  phone: z.string().min(1).max(20),
  email: z.string().email(),
  openingHours: z.string().min(1).max(50),
});

export const updateLocationSchema = createLocationSchema
  .extend({
    isActive: z.boolean().optional(),
  })
  .partial();

export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
