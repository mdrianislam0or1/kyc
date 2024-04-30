import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createInstituteValidation } from './fnInstitute.validation';
import { InstituteControllers } from './fnInstitute.controller';

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

export const InstituteRoutes = router;