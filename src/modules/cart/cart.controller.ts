import { Request, Response } from 'express';
import { getCartByUserId, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart as clearCartService } from './cart.service';

export const getCart = async (req: Request, res: Response) => {
  const userId = req.userId!;
  req.log.info({ userId }, 'Fetching cart');

  const cart = await getCartByUserId(userId);
  res.json(cart);
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.userId!;
  req.log.info({ userId, body: req.body }, 'Adding item to cart');

  try {
    const cartItem = await addItemToCart(userId, req.body);
    res.status(201).json(cartItem);
  } catch (error) {
    if (error instanceof Error && error.message === 'Dish not found') {
      return res.status(404).json({ message: error.message });
    }
    throw error;
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const userId = req.userId!;
  const dishId = Number(req.params.dishId);
  const { quantity } = req.body;

  req.log.info({ userId, dishId, quantity }, 'Updating cart item quantity');

  try {
    const updated = await updateCartItemQuantity(userId, dishId, quantity);
    res.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Item not found in cart') {
      return res.status(404).json({ message: error.message });
    }
    throw error;
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = req.userId!;
  const dishId = Number(req.params.dishId);

  req.log.info({ userId, dishId }, 'Removing item from cart');

  await removeItemFromCart(userId, dishId);
  res.status(204).end();
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = req.userId!;
  req.log.info({ userId }, 'Clearing cart');

  await clearCartService(userId);
  res.status(204).end();
};
