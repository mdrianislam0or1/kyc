import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createInstituteValidation } from './fnInstitute.validation';
import { InstituteControllers } from './fnInstitute.controller';
import fnAuth from '../../middleware/fnAuth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(createInstituteValidation),
  InstituteControllers.instituteRegisterController,
);
router.post('/login', InstituteControllers.instituteLoginController);

router.get('/all', InstituteControllers.getAllInstitutesController);
router.post(
  '/add-users-request',
  InstituteControllers.addUsersToInstituteController,
);

router.post(
  '/verify-otp',
  InstituteControllers.verifyAndaddUsersToInstituteController,
);

router.get(
  '/profile',
  fnAuth('manager'),
  InstituteControllers.getSingleInstituteWithUsersController,
);

export const InstituteRoutes = router;
