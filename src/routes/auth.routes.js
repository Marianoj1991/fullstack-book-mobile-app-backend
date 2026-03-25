import Router from 'express';
import {
  loginUserController,
  registerUserController
} from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validation-results.middleware.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 4 })
      .withMessage('Username must be at least 4 characters long')
  ],
  validateRequest,
  registerUserController
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
  ],
  validateRequest,
  loginUserController
);

export default router;
