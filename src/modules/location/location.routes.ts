import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { requireAuth } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/role.middleware';
import { createLocationSchema, updateLocationSchema } from './location.schema';
import { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } from './location.controller';

const router = Router();

router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.post('/admin', requireAuth, requireRole('ADMIN'), validate(createLocationSchema), createLocation);
router.patch('/admin/:id', requireAuth, requireRole('ADMIN'), validate(updateLocationSchema), updateLocation);
router.delete('/admin/:id', requireAuth, requireRole('ADMIN'), deleteLocation);

export default router;
