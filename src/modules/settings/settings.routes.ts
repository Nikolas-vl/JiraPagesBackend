import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { requireAuth } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/role.middleware';
import { updateSettingsSchema } from './settings.schema';
import { getSettings, updateSettings } from './settings.controller';

const router = Router();

router.get('/', getSettings);
router.patch('/admin', requireAuth, requireRole('ADMIN'), validate(updateSettingsSchema), updateSettings);

export default router;
