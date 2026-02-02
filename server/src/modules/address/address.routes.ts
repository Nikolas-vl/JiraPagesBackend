import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth';
import { createMyAddress, deleteMyAddress, getMyAddresses } from './address.controller';

const router = Router();

router.post('/', requireAuth, createMyAddress);
router.get('/', requireAuth, getMyAddresses);
router.delete('/:id', requireAuth, deleteMyAddress);

export default router;
