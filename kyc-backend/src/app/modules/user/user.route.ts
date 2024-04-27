import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createUserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(createUserValidation),
  UserControllers.UserController,
);
router.post('/login', UserControllers.userLoginController);

router.get('/users', auth('superAdmin'), UserControllers.getAllUsersController);

export const UserRouters = router;
