import { Router } from 'express';
import { validateRequest } from '../middlewares/validation-results.middleware.js';
import { body } from 'express-validator';
import { protectRoute } from '../middlewares/auth.middleware.js';
import {
  createBookController,
  deleteBookController,
  getAllBooksController,
  getRecommendedBooksController
} from '../controllers/book.controller.js';
import { validateBookOwnership } from '../middlewares/validateBookOwnership.js';

const router = Router();

router.post(
  '/',
  protectRoute,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('caption').notEmpty().withMessage('Caption is required'),
    body('rating')
      .isNumeric()
      .withMessage('Rating must be a number')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5')
  ],
  validateRequest,
  createBookController
);

router.get('/', protectRoute, getAllBooksController);

router.get('/user', protectRoute, getRecommendedBooksController);

router.delete(
  '/:id',
  protectRoute,
  validateBookOwnership,
  deleteBookController
);

export default router;
