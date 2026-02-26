import { Router } from 'express';
import {
  getDishes,
  getDish,
  createDish,
  updateDish,
  deleteDish,
  addIngredientToDish,
  removeIngredientFromDish,
  updateDishIngredient,
} from './dish.controller';
import { createDishSchema, updateDishSchema, addIngredientToDishSchema, updateDishIngredientSchema, dishQuerySchema } from './dish.schema';
import { validate } from '../../middlewares/validate';
import { requireAuth } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/role.middleware';

const router = Router();

// Public routes
router.get('/', validate(dishQuerySchema, 'query'), getDishes);
router.get('/:id', getDish);

// Admin routes - Dish CRUD
router.post('/', requireAuth, requireRole('ADMIN'), validate(createDishSchema), createDish);
router.patch('/:id', requireAuth, requireRole('ADMIN'), validate(updateDishSchema), updateDish);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteDish);

// Admin routes - Ingredient Management
router.post('/:id/ingredients', requireAuth, requireRole('ADMIN'), validate(addIngredientToDishSchema), addIngredientToDish);

router.patch('/:id/ingredients/:ingredientId', requireAuth, requireRole('ADMIN'), validate(updateDishIngredientSchema), updateDishIngredient);

router.delete('/:id/ingredients/:ingredientId', requireAuth, requireRole('ADMIN'), removeIngredientFromDish);

export default router;
