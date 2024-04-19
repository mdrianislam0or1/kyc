import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createUserValidation, loginUserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(createUserValidation),
  UserControllers.UserController,
);
router.post('/login', UserControllers.userLoginController);
export const UserRouters = router;
