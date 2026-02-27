import { prisma } from '../../prisma';
import { CartItemInput } from './cart.schema';

const cartInclude = {
  items: {
    include: {
      dish: true,
    },
  },
};

export const getCartByUserId = async (userId: number) => {
  return prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
    include: cartInclude,
  });
};

export const addItemToCart = async (userId: number, input: CartItemInput) => {
  const dish = await prisma.dish.findUnique({ where: { id: input.dishId } });
  if (!dish) {
    throw new Error('Dish not found');
  }

  const cart = await getCartByUserId(userId);

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, dishId: input.dishId },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + input.quantity },
      include: { dish: true },
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, dishId: input.dishId, quantity: input.quantity },
    include: { dish: true },
  });
};

export const updateCartItemQuantity = async (userId: number, dishId: number, quantity: number) => {
  const cart = await getCartByUserId(userId);

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, dishId },
  });

  if (!existingItem) {
    throw new Error('Item not found in cart');
  }

  if (quantity === 0) {
    await prisma.cartItem.delete({ where: { id: existingItem.id } });
    return null;
  }

  return prisma.cartItem.update({
    where: { id: existingItem.id },
    data: { quantity },
    include: { dish: true },
  });
};

export const removeItemFromCart = async (userId: number, dishId: number) => {
  const cart = await getCartByUserId(userId);

  return prisma.cartItem.deleteMany({
    where: { cartId: cart.id, dishId },
  });
};

export const clearCart = async (userId: number) => {
  const cart = await getCartByUserId(userId);

  return prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });
};
