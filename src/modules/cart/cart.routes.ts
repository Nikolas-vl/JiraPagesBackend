import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from './cart.controller';
import { cartItemSchema, updateCartItemSchema } from './cart.schema';

const router = Router();

router.get('/', getCart);
router.post('/items', validate(cartItemSchema), addToCart);
router.patch('/items/:dishId', validate(updateCartItemSchema), updateCartItem);
router.delete('/items/:dishId', removeFromCart);
router.delete('/', clearCart);

export default router;
