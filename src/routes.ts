import { Router } from 'express';
import dishRoutes from './modules/dish/dish.routes';
import ingredientRoutes from './modules/ingredient/ingredient.routes';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import addressRoutes from './modules/address/address.routes';
import paymentRoutes from './modules/payment/payment.routes';
import cartRoutes from './modules/cart/cart.routes';
import { requireAuth } from './middlewares/auth';

const router = Router();

router.use('/dishes', dishRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/auth', authRoutes);
router.use('/users', requireAuth, userRoutes);
router.use('/addresses', requireAuth, addressRoutes);
router.use('/payment', requireAuth, paymentRoutes);
router.use('/cart', requireAuth, cartRoutes);

export default router;
